"use client"

import { cn } from "@/lib/utils"
import {useParams, usePathname} from "next/navigation"
import Link from "next/link"

export const AdminNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    {
      href: `/admin`,
      label: "Dashboard",
      active: pathname === `/admin`
    },
    {
      href: `/admin/products`,
      label: "Products",
      active: pathname === `/admin/products`
    },
    {
      href: `/admin/orders`,
      label: "Orders",
      active: pathname === `/admin/orders`
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