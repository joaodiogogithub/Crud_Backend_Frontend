import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { formatToBRL } from '@/utils/formatToBRL'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels } from '../data/data'
import { Task } from '../data/schema'

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nome' />
    ),
    cell: ({ row }) => <div className='w-[220px]'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'desc',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Descrição' />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.desc)

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('desc')}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Preço' />
    ),
    cell: ({ row }) => <div className='flex w-[100px] items-center'>{
    
      formatToBRL(
      row.getValue('price')
      )
    }</div>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',

    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
