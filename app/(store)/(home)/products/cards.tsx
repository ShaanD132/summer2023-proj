import {format} from "date-fns"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import prismadb from "@/lib/prismadb"
import { Button } from "@/components/ui/button"
import {ShoppingCart} from "lucide-react"


export const ProductCards = async () => {

  const products = await prismadb.product.findMany({
    orderBy: {
      updatedAt: "asc"
    }
  }
  )
  const formattedProducts= products.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    quantity: item.quantity,
    deliveredAt: format(item.deliveredAt, "MMMM do, yyyy")
  }))

  return(
    <div>
      <div className = "grid grid-cols-3 gap-y-16 w-full justify-items-center justify-center">

      {formattedProducts.map((item) => (
        <Card className={cn("w-[380px]")}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              {item.description}
              </CardDescription>
            {item.quantity < 10 ? <div className = "text-destructive text-md">Only {item.quantity} remaining!</div> : <></>}
          </CardHeader>
          <CardContent>
            <div className = "flex justify-between items-center -mt-3">
              <p>Price (HKD): ${item.price}</p>
              <Button>
                <ShoppingCart className = "w-4 h-4 mr-2"/>
                Add to Cart
              </Button>
            </div>
          </CardContent>
          <CardFooter className = "text-muted-foreground text-sm">
            Delivered on: {item.deliveredAt}
          </CardFooter>
        </Card>
      ))}
      </div>
    </div>
  )
}