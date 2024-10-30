"use memo"

import * as React from "react"
import type { SearchParams } from "@/types"

import { Skeleton } from "@/components/ui/skeleton"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { Shell } from "@/components/shell"

import { ProductsTable } from "./_components/products-table"
import { ProductsTableProvider } from "./_components/products-table-provider"
import { searchParamsSchema } from "@/lib/validations"
import { productService } from "@/services/productService"

export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams)

  const productsPromise = productService.getProducts(search)

  // console.log("productsPromise-", productsPromise)
  if (!productsPromise) {
    return <div>Loading ... </div>
  }
  return (
    <Shell className="gap-2">
      {/* <SearchTitle searchData={searchData} /> */}
      {/**
       * The `ProductsTableProvider` is use to enable some feature flags for the `ProductsTable` component.
       * Feel free to remove this, as it's not required for the `ProductsTable` component to work.
       */}
      <ProductsTableProvider>
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the products based on the selected date range it was created at.
         * The business logic for filtering the products based on the selected date range is handled inside the component.
         */}
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <DateRangePicker
            triggerSize="sm"
            triggerClassName="ml-auto w-56 sm:w-60"
            align="end"
          />
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
              shrinkZero
            />
          }
        >
          {/**
           * Passing promises and consuming them using React.use for triggering the suspense fallback.
           * @see https://react.dev/reference/react/use
           */}
          <ProductsTable productsPromise={productsPromise} />
        </React.Suspense>
      </ProductsTableProvider>
    </Shell>
  )
}