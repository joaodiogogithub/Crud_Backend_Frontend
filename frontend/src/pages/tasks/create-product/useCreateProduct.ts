import { useForm } from 'react-hook-form'
import {useState} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createProductSchema } from '@/utils/schemas/create-product-schema'
import api from '@/api/instance'
import { useNavigate } from 'react-router-dom'

type CreateProductFormValues = z.infer<typeof createProductSchema>

export function useCreateProduct() {
  const navigate = useNavigate()
  const [loading, setLoading ] = useState(false)

  const form = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      desc: '',
      price: '0',
    } as CreateProductFormValues,
  })
  async function onSubmit(data: CreateProductFormValues) {
    try {
      setLoading(true)
      await api.post('/products', data).then(() => {
        navigate('/')
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { form, onSubmit, loading }
}
