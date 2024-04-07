import { prisma } from "@/lib/prismaDbClient";

// GET DB Invoice series
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getInvoices() {
  try {
    let invoices = await prisma.invoice.findMany({
      where: {
        companyId: companyIdData,
      },
    });

    if (invoices) {
      for (const item of invoices) {
        const invoiceProducts = await prisma.invoiceProduct.findMany({
          where: {
            invoiceId: { has: item.id },
            companyId: companyIdData,
          },
        });
        item.productsData = JSON.stringify(invoiceProducts);
      }

      return invoices;
    }

    return [];
  } catch (err) {
    return `There was an error while getting invoices! ${err}`;
  }
}
