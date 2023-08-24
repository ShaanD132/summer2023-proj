import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
) {
  try {
    const {userId} = auth()
    const body = await req.json()

    const {name, description, quantity, price, deliveredAt} = body

    if (!userId) {
      return new NextResponse("Unauthenticated", {status: 401})
    }

    if (!name) {
      return new NextResponse("Product Name Required", {status: 400})
    }

    if (!description) {
      return new NextResponse("Description Required", {status: 400})
    }

    if (!quantity) {
      return new NextResponse("Quantity Required", {status: 400})
    }

    if (!deliveredAt) {
      return new NextResponse("Delivery Date Required", {status: 400})
    }

    if (userId !== "user_2UCVGbjTJN0VPcYp7dRuiGAZ1Mb") {
      return new NextResponse("Unauthorized", {status: 403})
    }

    const product = await prismadb.product.create({
      data: {
        name,
        description,
        quantity,
        price,
        deliveredAt
      }
    })

    return NextResponse.json(product)
  } catch(error) {
    console.log("[PRODUCT_POST]", error)
    return new NextResponse("Internal Error", {status: 500})
  }
}