"use client"
import ProductsTable from "@/components/table/products-table"
import { useQueryOwnerStore, useStore } from "@/hooks/use-api"
import * as React from "react"

export default function ProductPage() {

  // Agora session está garantidamente carregada
  const { selectedStore } = useStore()
  const { store } = useQueryOwnerStore(selectedStore?.id as string)

  return (
    <div className="m-8">
      <ProductsTable products={store?.ok ? store.value.products : []} />
      {/* <ProductsTable products={[]} /> */}
    </div>
  )
}
