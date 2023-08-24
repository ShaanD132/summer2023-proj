"use client"

import { ShoppingBasket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const CartNav = () => {
  const router = useRouter()
  return(
    <div>
      <Button className = "px-3" variant = "ghost" onClick = {() => router.push("/cart")}>
        <ShoppingBasket className = "h-5 w-5" />
      </Button>
    </div>
  )
}