"use client"

import { cn } from "@/lib/utils"
import {useParams, usePathname} from "next/navigation"
import Link from "next/link"

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/`,
      label: "Home",
      active: pathname === `/`
    },
    {
      href: `/products`,
      label: "Products",
      active: pathname === `/products`
    },
  ]

  return(
    <nav className= {cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key = {route.href}
          href = {route.href}
          className = {cn("text-sm font-medium transition-colors text-primary",
          route.active? "text-black dark:text-white" : "text-muted-foreground")}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}