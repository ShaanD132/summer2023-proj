"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProductDropdown } from "./dropdown"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string
  name: string
  description: string
  quantity: number
  price: number
  deliveredAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "deliveredAt",
    header: "Delivered",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
 
      return (
        <ProductDropdown data = {product} />
      )
    },
  },
]
