import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { taskSchema } from '../data/schema'
import api from "@/api/instance"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const product = taskSchema.parse(row.original)

  const navigate = useNavigate()


  const deleteItem = async(id: number) => {
    await api.delete(`/products/${id}`)
    location.reload()
  }

  const goToEdit = (id: number) => {
    navigate(`/edit/${id}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={() => goToEdit(product.id)}>Editar</DropdownMenuItem>
        <DropdownMenuItem onClick={async() => {await deleteItem(product.id)}}>
          Apagar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
