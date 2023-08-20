"use client"

import { Heading } from "@/components/ui/heading"
import {Button} from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/ui/data-table"
import {ProductColumn, columns } from "./columns"

interface ProductsClientProps {
  data: ProductColumn[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({data}) => {
  const router = useRouter()

  return(
    <>
      <div className = "flex items-center justify-between">
        <Heading
          title = {`Products (${data.length})`}
          description = "Manage products for the store"
        />
        <Button onClick = {() => router.push(`/admin/products/new`)}>
          <Plus className = "mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns = {columns} data = {data} />
    </>
  )
}