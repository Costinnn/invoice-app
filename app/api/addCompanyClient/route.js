import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const sellerIdData = "65fbd41cdccb0b09a7eca9d0";

export async function POST(request) {
  try {
    const reqData = await request.json();

    const newClientCompany = await prisma.companyClient.create({
      data: {
        ...reqData,
        seller: { connect: { id: sellerIdData } },
      },
    });

    if (newClientCompany) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Could not add company client!" },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `ADD_COMPANY_CLIENT_API_ERROR ${err}` },
      { status: 500 }
    );
  }
}
