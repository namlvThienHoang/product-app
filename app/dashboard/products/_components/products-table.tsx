"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "@/types"

import { useDataTable } from "@/hooks/use-data-table"
import { DataTableAdvancedToolbar } from "@/components/data-table/advanced/data-table-advanced-toolbar"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

import { getColumns } from "./products-table-columns"
import { ProductsTableFloatingBar } from "./products-table-floating-bar"
import { useProductsTable } from "./products-table-provider"
import { ProductsTableToolbarActions } from "./products-table-toolbar-actions"
import { productService } from "@/services/productService"
import { Product } from "@/types/product"
import { enumCategories } from "../_lib/enums"

interface ProductsTableProps {
  productsPromise: ReturnType<typeof productService.getProducts>
}

export function ProductsTable({ productsPromise }: ProductsTableProps) {
  // Feature flags for showcasing some additional features. Feel free to remove them.
  const { featureFlags } = useProductsTable()
  const { products: data, total, skip, limit } = React.use(productsPromise)
  const totalRows = total;
  const pageCount = Math.ceil(total / limit);
  console.log("data-", data)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), [])

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<Product>[] = [
    {
      label: "Title",
      value: "title",
      placeholder: "Filter titles...",
    },
    {
      label: "Category",
      value: "category",
      options: enumCategories.map((item) => ({
        label: item[0]?.toUpperCase() + item.slice(1),
        value: item,
        withCount: true,
      })),
    },
  ]

  if (!data) {
    return <div>Loading ... </div>
  }

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    /* optional props */
    filterFields,
    enableAdvancedFilter: featureFlags.includes("advancedFilter"),
    state: {
      sorting: [{ id: "title", desc: true }],
      pagination: { pageIndex: 0, pageSize: 10 },
      columnPinning: { right: ["actions"] },
    },

    /* */
  })
  console.log('table', table);
  return (
    <DataTable
      totalRows={totalRows}
      table={table}
      floatingBar={
        featureFlags.includes("floatingBar") ? (
          <ProductsTableFloatingBar table={table} />
        ) : null
      }
    >
      {featureFlags.includes("advancedFilter") ? (
        <DataTableAdvancedToolbar table={table} filterFields={filterFields}>
          <ProductsTableToolbarActions table={table} />
        </DataTableAdvancedToolbar>
      ) : (
        <DataTableToolbar table={table} filterFields={filterFields}>
          <ProductsTableToolbarActions table={table} />
        </DataTableToolbar>
      )}
    </DataTable>
  )
}