import { prisma } from "@/lib/prismaDbClient";

// GET DB POST
const sellerIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getCompanyClients() {
  try {
    const companyClients = await prisma.companyClient.findMany({
      where: {
        sellerId: sellerIdData,
      },
    });

    if (companyClients) {
      return companyClients;
    }

    return [];
  } catch (err) {
    return `There was an error while getting Company Clients! ${err}`;
  }
}
