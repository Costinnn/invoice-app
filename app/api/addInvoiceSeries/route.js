import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function POST(request) {
  try {
    const reqData = await request.json();

    const newInvoiceSeries = await prisma.invoiceSeries.create({
      data: {
        ...reqData,
        numbers: [],
        company: { connect: { id: companyIdData } },
      },
    });

    if (newInvoiceSeries) {
      return NextResponse.json(
        { message: "Success", dbData: newInvoiceSeries },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: "Could not add invoice serie!" },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `INVOICE_SERIE_API_ERROR ${err}` },
      { status: 500 }
    );
  }
}
