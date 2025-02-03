"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Product } from "@/service/flyfood-api/types"
import { formatCurrency } from "@/utils/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Edit, MoreHorizontal } from "lucide-react"

type SortableProductKey = keyof Pick<
  Product,
  "id" | "name" | "SKU" | "type" | "stock_quantity" | "active" | "price" | "promo_active" | "promotional_price"
>

type SortConfig = {
  key: SortableProductKey
  direction: "asc" | "desc"
} | null

type ProductsTableProps = {
  products: Product[]
  onEdit: (product: Product) => void
}

export default function ProductsTable({ products, onEdit }: ProductsTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.SKU.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [products, searchTerm])

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...filteredProducts]
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue == null && bValue == null) return 0
        if (aValue == null) return 1
        if (bValue == null) return -1

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
        }

        if (typeof aValue === "boolean" && typeof bValue === "boolean") {
          return sortConfig.direction === "asc"
            ? aValue === bValue
              ? 0
              : aValue
                ? -1
                : 1
            : aValue === bValue
              ? 0
              : aValue
                ? 1
                : -1
        }

        return 0
      })
    }
    return sortableProducts
  }, [filteredProducts, sortConfig])

  const requestSort = (key: SortableProductKey) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar por nome ou SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline">Exportar</Button>
      </div>
      <Table>
        <TableCaption>Lista de produtos do seu restaurante.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => requestSort("name")} className="cursor-pointer">
              Nome {sortConfig?.key === "name" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("SKU")} className="cursor-pointer">
              SKU {sortConfig?.key === "SKU" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("type")} className="cursor-pointer">
              Tipo {sortConfig?.key === "type" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("stock_quantity")} className="cursor-pointer">
              Estoque {sortConfig?.key === "stock_quantity" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("active")} className="cursor-pointer">
              Ativo para venda {sortConfig?.key === "active" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("price")} className="cursor-pointer">
              Preço {sortConfig?.key === "price" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("promo_active")} className="cursor-pointer">
              Preço Promocional Ativo {sortConfig?.key === "promo_active" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead onClick={() => requestSort("promotional_price")} className="cursor-pointer">
              Preço Promocional {sortConfig?.key === "promotional_price" && <ChevronDown className="inline" />}
            </TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{p.SKU}</TableCell>
              <TableCell>{p.type}</TableCell>
              <TableCell>{p.stock_quantity}</TableCell>
              <TableCell>{p.active ? "Sim" : "Não"}</TableCell>
              <TableCell>{formatCurrency(p.price)}</TableCell>
              <TableCell>{p.promo_active ? "Sim" : "Não"}</TableCell>
              <TableCell>{formatCurrency(p.promotional_price)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(p)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

