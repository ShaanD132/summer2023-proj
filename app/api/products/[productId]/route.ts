import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import {NextResponse} from "next/server"

/*export async function PATCH (
  req: Request,
  //params always available here
  {params}: {params: { productId: string}}
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    //const {name, quantity} = body

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401})
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", {status: 400})
    }

    const product = await prismadb.product.findFirst({
      where: {
        id: params.productId,
      }
    })

    return NextResponse.json(product)

  } catch(error) {
    console.log("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}*/

export async function PATCH (
  //request always needed, why?
  req: Request,
  //params always available here
  {params}: {params: {productId: string}}
) {
  try {
    const { userId } = auth()
    const body = await req.json()

    const {name, description, price, quantity, deliveredAt} = body

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401})
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", {status: 400})
    }

    if (!name) {
      return new NextResponse("Name is required", {status: 403})
    }

    if (!description) {
      return new NextResponse("Description is required", {status: 403})
    }

    if (!price) {
      return new NextResponse("Name is required", {status: 403})
    }

    if (!quantity) {
      return new NextResponse("Name is required", {status: 403})
    }

    if (!deliveredAt) {
      return new NextResponse("Delivery Date is required", {status: 403})
    }

    //deleteMany needed rather than delete as userId is NOT unique
    const product = await prismadb.product.updateMany({
      where: {
        id: params.productId,
      },
      data: {
        name,
        description,
        price,
        quantity,
        deliveredAt
      }
    })

    return NextResponse.json(product)

  } catch(error) {
    console.log("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}
export async function DELETE (
  //request always needed, why?
  req: Request,
  //params always available here
  {params}: {params: {productId: string}}
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401})
    }

    if (!params.productId) {
      return new NextResponse("Product ID is required", {status: 400})
    }

    //deleteMany needed rather than delete as userId is NOT unique
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      }
    })

    return NextResponse.json(product)

  } catch(error) {
    console.log("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal error", {status: 500})
  }
}

export async function GET (
  req: Request,
  {params}: {params: {productId: string}}
) {
  try {
    if(!params.productId) {
      return new NextResponse("Product ID is required", {status: 400})
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      }
    })

    return NextResponse.json(product)

  } catch(error) {
    console.log("[PRODUCT_GET]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}