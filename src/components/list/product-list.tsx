"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus, ShoppingBasketIcon } from "lucide-react"
import Image from "next/image"
import type { ProductDTO } from "@/service/flyfood-api/types"
import { formatCurrency } from "@/utils/utils"

export function ProductList({ products }: { products: ProductDTO[] }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchTerm] = useState("")

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }))
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const allTags = useMemo(
    () => Array.from(new Set(products.flatMap((p) => (typeof p.tag === "string" ? p.tag : [])))),
    [products],
  )

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        (selectedTags.length === 0 || selectedTags.includes(product.tag)) &&
        (searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [products, selectedTags, searchTerm])

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-background z-10 p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-0">
              <div className="relative h-48 w-full">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <ShoppingBasketIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-primary">{formatCurrency(product.price)}</p>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-gray-50 p-4">
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, -1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantities[product.id] || 0}
                  onChange={(e) =>
                    setQuantities((prev) => ({ ...prev, [product.id]: Number.parseInt(e.target.value) || 0 }))
                  }
                  className="w-16 text-center"
                />
                <Button size="icon" variant="outline" onClick={() => updateQuantity(product.id, 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="default"
                onClick={() => console.log(`Added ${quantities[product.id] || 1} of ${product.name} to cart`)}
                disabled={quantities[product.id] === 0}
              >
                {quantities[product.id] ? "Update Cart" : "Add to Cart"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

