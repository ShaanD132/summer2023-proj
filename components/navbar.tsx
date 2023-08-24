import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import { redirect, useRouter } from "next/navigation"
import { ModeToggle } from "./theme-toggle"
import { myFont } from "@/app/layout"
import { Button } from "@/components/ui/button"
import { ShoppingBasket } from "lucide-react"
import { Router } from "next/router"
import { CartNav } from "./cart-button"

export const Navbar = () => {
  const {userId} = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return(
    <div className = "border-b">
      <div className = "flex h-16 items-center px-4">
        <div className = "ml-2">
          <div className = "text-2xl font-bold tracking-tight">
            <h2 className = {myFont.className}>myStore</h2>
          </div>
        </div>

        <MainNav className = "mx-6"/>

        <div className = "ml-auto flex items-center space-x-5">
          <div>
            <ModeToggle />
          </div>

          <CartNav />

          <div>
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
      </div>
    </div>
  )
}