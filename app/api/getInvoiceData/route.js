import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function GET(request) {
  try {
    const invoiceSerieId = request.nextUrl.searchParams.get("invoiceSerieId");
    const oldInvoiceNumber = request.nextUrl.searchParams.get("oldInvoiceNumber");

    const invoiceData = await prisma.invoice.findMany({
      where: {
        invoiceSeriesId: invoiceSerieId,
        number: Number(oldInvoiceNumber),
        companyId: companyIdData,
      },
    });

    if (invoiceData.length > 0) {
        
      const invoiceProducts = await prisma.invoiceProduct.findMany({
        where: { id: { in: invoiceData[0].invoiceProductsId } },
      });

      return NextResponse.json(
        {
          message: "Success",
          dbData: { invoice: invoiceData[0], products: invoiceProducts },
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      { error: `Could not get invoice data ${err}` },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `GET_INVOICE_DETAILS_API_ERROR ${err}` },
      { status: 500 }
    );
  }
}
