import { prisma } from "@/lib/prismaDbClient";

// GET DB Invoice products
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

type getInvoiceProductsProp = { productsId: string[] };

export async function getInvoiceProducts({
  productsId,
}: getInvoiceProductsProp) {
  try {
    const invoiceProducts = await prisma.invoiceProduct.findMany({
      where: { id: { in: productsId }, companyId: companyIdData },
    });

    if (invoiceProducts) {
      return invoiceProducts;
    }

    return [];
  } catch (err) {
    return `There was an error while getting invoice products! ${err}`;
  }
}
