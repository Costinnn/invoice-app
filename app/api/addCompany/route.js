import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const reqData = await request.json();

    const newCompany = await prisma.company.create({
      data: {
        ...reqData,
      },
    });

    if (newCompany) {
      return NextResponse.json({ message: "Success" }, { status: 201 });
    }

    return NextResponse.json(
      { error: "Could not add company!" },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `ADD_COMPANY_API_ERROR ${err}` },
      { status: 500 }
    );
  }
}
