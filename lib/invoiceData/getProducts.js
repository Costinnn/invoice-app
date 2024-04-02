import { prisma } from "@/lib/prismaDbClient";

// GET DB Invoice series
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        companyId: companyIdData,
      },
    });

    if (products) {
      return products;
    }

    return [];
  } catch (err) {
    return `There was an error while getting products! ${err}`;
  }
}
