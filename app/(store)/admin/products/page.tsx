import {format} from "date-fns"

import prismadb from "@/lib/prismadb"

import { ProductsClient} from "./components/client"
import { ProductColumn } from "./components/columns"

const AdminProductsPage = async () => {

  //fetch products
  const products = await prismadb.product.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    updatedAt: format(item.updatedAt, "MMMM do, yyyy")
  }))

  return(
    <div className = "flex-col">
      <div className = "flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts}/>
      </div>
    </div>
  )
}

export default AdminProductsPage