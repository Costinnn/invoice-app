import { prisma } from "@/lib/prismaDbClient";
import { NextResponse } from "next/server";

const companyIdData = "65fbd41cdccb0b09a7eca9d0";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];

export async function POST(request) {
  try {
    const reqData = await request.json();
    const invoiceDate = new Date(reqData.date);
    const invoiceMonthNum = invoiceDate.getMonth() + 1;
    const invoiceMonthName = MONTHS[invoiceMonthNum - 1];
    // console.log(reqData);

    // CREATE INVOICE RETURNED PRODUCTS
    const newDbReturnedInvProd = [];

    for (let item of reqData.products) {
      const newReturnedInvProd = await prisma.returnedInvoiceProduct.create({
        data: {
          name: item.name,
          um: item.um,
          quantity: item.quantity,
          price: item.price,
          tva: -item.tva,
          totalValue: -item.totalValue,
          returnedInvoiceProducts: { connect: { id: item.returnedInvoiceProductId } },
          product: { connect: { id: item.productId } },
          company: { connect: { id: companyIdData } },
        },
      });

      if (newReturnedInvProd) {
        newDbReturnedInvProd.push(newReturnedInvProd);
      } else {
        return NextResponse.json({ error: "Could not add returned invoice products!" }, { status: 500 });
      }
    }

    // CREATE INVOICE
    const newCanceledInvoice = await prisma.canceledInvoice.create({
      data: {
        clientId: reqData.clientId,
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
        returnedInvoiceProducts: {
          connect: newDbReturnedInvProd.map((item) => ({
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
        subtotal: -reqData.subtotal,
        tva: -reqData.tva,
        total: -reqData.total,
        company: { connect: { id: companyIdData } },
      },
    });

    // CREATE/UPDATE MONTHLY INCOME
    const dbMonthlyIncome = await prisma.monthlyIncome.findMany({
      where: {
        AND: [{ month: invoiceMonthNum }, { year: invoiceDate.getFullYear() }],
      },
    });

    if (dbMonthlyIncome.length > 0) {
      const monthlyIncome = await prisma.monthlyIncome.update({
        where: {
          id: dbMonthlyIncome[0].id,
        },
        data: {
          incomeValue: { increment: -reqData.total },
          tvaValue: { increment: -reqData.tva },
        },
      });
      if (!monthlyIncome) {
        return NextResponse.json({ error: "Could not update monthly income!" }, { status: 500 });
      }
    } else {
      const monthlyIncome = await prisma.monthlyIncome.create({
        data: {
          month: invoiceMonthNum,
          monthName: invoiceMonthName,
          year: invoiceDate.getFullYear(),
          incomeValue: -reqData.total,
          tvaValue: -reqData.tva,
          company: { connect: { id: companyIdData } },
        },
      });
      if (!monthlyIncome) {
        return NextResponse.json({ error: "Could not create monthly income!" }, { status: 500 });
      }
    }

    // CREATE/UPDATE MONTHLY TOP CLIENTS
    const dbMonthlyTopClients = await prisma.monthlyTopClients.findMany({
      where: {
        AND: [{ clientId: String(reqData.clientId) }, { month: invoiceMonthNum }, { year: invoiceDate.getFullYear() }],
      },
    });

    if (dbMonthlyTopClients.length > 0) {
      const monthlyTopClients = await prisma.monthlyTopClients.update({
        where: {
          id: dbMonthlyTopClients[0].id,
        },
        data: {
          value: { increment: -reqData.total },
          transactions: { increment: 1 },
        },
      });
      if (!monthlyTopClients) {
        return NextResponse.json({ error: "Could not update monthly top clients!" }, { status: 500 });
      }
    } else {
      const monthlyTopClients = await prisma.monthlyTopClients.create({
        data: {
          client: { connect: { id: reqData.clientId } },
          clientName: reqData.clientName,
          month: invoiceMonthNum,
          monthName: invoiceMonthName,
          year: invoiceDate.getFullYear(),
          value: -reqData.total,
          transactions: 1,
          company: { connect: { id: companyIdData } },
        },
      });
      if (!monthlyTopClients) {
        return NextResponse.json({ error: "Could not create monthly top clients!" }, { status: 500 });
      }
    }

    // UPDATE SERIE NUMBER + RESPONSE
    if (newCanceledInvoice) {
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
      return NextResponse.json({ error: "Could not update canceled invoice series number!" }, { status: 500 });
    }

    return NextResponse.json({ error: "Could not add canceled invoice!" }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: `CANCELED_INVOICE_API_ERROR ${err}` }, { status: 500 });
  }
}
