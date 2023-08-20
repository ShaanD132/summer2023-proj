import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    const {userId} = auth()
    const body = await req.json()

    const {name, quantity} = body

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401})
    }

    if (!name) {
      return new NextResponse("Product Name Required", {status: 400})
    }

    if (!quantity) {
      return new NextResponse("Quantity Required", {status: 400})
    }

    if (userId !== "user_2UCVGbjTJN0VPcYp7dRuiGAZ1Mb") {
      return new NextResponse("Unauthorized", {status: 403})
    }

    const product = await prismadb.product.create({
      data: {
        name,
        quantity
      }
    })

    return NextResponse.json(product)
  } catch(error) {
    console.log("[PRODUCT_POST]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}