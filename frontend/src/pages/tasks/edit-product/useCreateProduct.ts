import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createProductSchema } from '@/utils/schemas/create-product-schema'
import api from '@/api/instance'
import { useNavigate, useParams } from 'react-router-dom'

type CreateProductFormValues = z.infer<typeof createProductSchema>

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
}

export function useCreateProduct() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(!!id)

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      desc: '',
      price: '0',
    } as CreateProductFormValues,
  })

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        try {
          setInitialLoading(true)
          const response = await api.get<Product>(`/products/${id}`)
          const product = response.data
          form.reset({
            name: product.name,
            desc: product.desc,
            price: product.price.toString(),
          })
        } catch (error) {
          console.error('Error fetching product:', error)
          // You might want to handle this error, e.g., redirect to a 404 page
        } finally {
          setInitialLoading(false)
        }
      }
    }

    fetchProduct()
  }, [id, form])

  async function onSubmit(data: CreateProductFormValues) {
    try {
      setLoading(true)
      if (id) {
        await api.put(`/products/${id}`, data)
      } else {
        await api.post('/products', data)
      }
      navigate('/')
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading, initialLoading }
}