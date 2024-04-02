import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function POST(request) {
  try {
    const reqData = await request.json();

    const newProduct = await prisma.product.create({
      data: {
        ...reqData,
        company: { connect: { id: companyIdData } },
      },
    });

    if (newProduct) {
      return NextResponse.json(
        { message: "Success", dbData: newProduct },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Could not add product!" },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `ADD_PRODUCT_API_ERROR ${err}` },
      { status: 500 }
    );
  }
}
