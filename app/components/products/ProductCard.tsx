import Image from "next/image"
import { ShoppingCart, Loader2 } from "lucide-react"

import { Button } from "@/app/components/Button"
import { Card, CardContent, CardFooter } from "@/app/components/Card"
import { Badge } from "@/app/components/Badge"
import Link from "next/link"
// fix errors
interface Product {
  _id: string
  image: string
  name: string
  description: string
  price: string
  category: string
}

interface ProductCardProps {
  product: Product
  addToCart: (id: string) => void
  isLoading: boolean
}

export default function ProductCard({ product, addToCart, isLoading }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <Card className="h-full cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-secondary text-white">{product.category}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2 h-[40px]">{product.description}</p>
          <p className="text-primary font-bold text-lg mt-2">${product.price}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={() => addToCart(product._id)} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ემატება
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                კალათაში დამატება
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>

  )
}
