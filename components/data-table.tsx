import {
  ColumnDef,
  flexRender,
  RowData,
  useReactTable
} from '@tanstack/react-table'

import { cn } from '@/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface DataTableProps<TData extends RowData> {
  table: ReturnType<typeof useReactTable<TData>>
  columns: ColumnDef<TData>[]
  viewRow: (id: string) => void
}

const DataTable = <TData extends RowData>({
  table,
  columns,
  viewRow
}: DataTableProps<TData>) => {
  return (
    <Table className='table-auto'>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id} className='h-14 hover:bg-white'>
            {headerGroup.headers.map(header => (
              <TableHead
                key={header.id}
                className={cn(
                  'text-sm font-bold text-foreground first:pl-6 first:text-left last:pr-6 last:text-right',
                  header.column.columnDef.meta?.headerClasses
                )}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className='group h-14 cursor-pointer text-sm leading-tight text-foreground/80 hover:bg-primary/10'
              onClick={() => viewRow(row.id)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className={cn(
                    'first:pl-6 first:text-left last:pr-6 last:text-right',
                    cell.column.columnDef.meta?.cellClasses
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable
