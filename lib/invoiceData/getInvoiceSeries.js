import { prisma } from "@/lib/prismaDbClient";

// GET DB Invoice series
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getInvoiceSeries() {
  try {
    const invoiceSeries = await prisma.invoiceSeries.findMany({
      where: {
        companyId: companyIdData,
      },
    });

    if (invoiceSeries) {
      return invoiceSeries;
    }

    return [];
  } catch (err) {
    return `There was an error while getting invoice series! ${err}`;
  }
}
