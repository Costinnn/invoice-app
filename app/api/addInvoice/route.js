import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function POST(request) {
  try {
    const reqData = await request.json();

    // CREATE INVOICE PRODUCTS
    const newDbInvoiceProducts = [];

    for (let item of reqData.products) {
      const newInvoiceProduct = await prisma.invoiceProduct.create({
        data: {
          name: item.name,
          um: item.um,
          quantity: item.quantity,
          price: item.price,
          tva: item.tva,
          totalValue: item.totalValue,
          product: { connect: { id: item.id } },
          company: { connect: { id: companyIdData } },
        },
      });

      if (newInvoiceProduct) {
        newDbInvoiceProducts.push(newInvoiceProduct);
      } else {
        return NextResponse.json(
          { error: "Could not add invoice products!" },
          { status: 500 }
        );
      }
    }

    // CREATE INVOICE
    const newInvoice = await prisma.invoice.create({
      data: {
        clientName: reqData.clientName,
        clientCui: reqData.clientCui,
        clientAddress: reqData.clientAddress,
        clientRc: reqData.clientRc,
        clientIban: reqData.clientIban,
        clientEmail: reqData.clientEmail,
        serie: { connect: { id: reqData.invoiceSeriesId } },
        invoiceSerie: reqData.invoiceSerie,
        number: reqData.number,
        date: reqData.date,
        deadline: reqData.deadline,
        invoiceProducts: {
          connect: newDbInvoiceProducts.map((item) => ({
            id: item.id,
          })),
        },
        issuedByName: reqData.issuedByName,
        issuedByCnp: reqData.issuedByCnp,
        accompanyNotice: reqData.accompanyNotice,
        delegateName: reqData.delegateName,
        delegateCnp: reqData.delegateCnp,
        delegateAuto: reqData.delegateAuto,
        terms: reqData.terms,
        remarks: reqData.remarks,
        currency: reqData.currency,
        subtotal: reqData.subtotal,
        discount: reqData.discount,
        tva: reqData.tva,
        total: reqData.total,
        company: { connect: { id: companyIdData } },
      },
    });

    if (newInvoice) {
      // UPDATE SERIE NUMBER
      const updatedSerieNumber = await prisma.invoiceSeries.update({
        where: { id: reqData.invoiceSeriesId },
        data: {
          lastNumber: {
            increment: 1,
          },
          numbers: { push: reqData.number },
        },
      });
      if (updatedSerieNumber) {
        return NextResponse.json({ message: "Success" }, { status: 201 });
      }
      return NextResponse.json(
        { error: "Could not update invoice series number!" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Could not add invoice!" },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `INVOICE_API_ERROR ${err}` },
      { status: 500 }
    );
  }
}
