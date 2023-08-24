import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export const CartButton = () => {
  return(
    <Button>
      <ShoppingCart className = "w-4 h-4 mr-2"/>
      Add to Cart
    </Button>
  )
}