"use client"

import type { Table } from "@tanstack/react-table"
import { XIcon } from "lucide-react"
import * as React from "react"
import type { ComponentProps } from "react"
import { DataTableFacetedFilter } from "~/components/admin/data-table/data-table-faceted-filter"
import { DataTableViewOptions } from "~/components/admin/data-table/data-table-view-options"
import { Button } from "~/components/common/button"
import { Input } from "~/components/common/input"
import type { DataTableFilterField } from "~/types"
import { cx } from "~/utils/cva"

type DataTableToolbarProps<TData> = ComponentProps<"div"> & {
  table: Table<TData>
  filterFields?: DataTableFilterField<TData>[]
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // Memoize computation of searchableColumns and filterableColumns
  const { searchableColumns, filterableColumns } = React.useMemo(() => {
    return {
      searchableColumns: filterFields.filter(field => !field.options),
      filterableColumns: filterFields.filter(field => field.options),
    }
  }, [filterFields])

  return (
    <div
      className={cx("flex w-full items-center justify-between gap-2 overflow-auto", className)}
      {...props}
    >
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            column =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  key={String(column.id)}
                  className="min-w-40"
                  placeholder={column.placeholder}
                  value={(table.getColumn(String(column.id))?.getFilterValue() as string) ?? ""}
                  onChange={e => table.getColumn(String(column.id))?.setFilterValue(e.target.value)}
                />
              ),
          )}

        {filterableColumns.length > 0 &&
          filterableColumns.map(
            column =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  title={column.label}
                  options={column.options ?? []}
                />
              ),
          )}

        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            size="md"
            onClick={() => table.resetColumnFilters()}
            suffix={<XIcon />}
          >
            Reset
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {children}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
