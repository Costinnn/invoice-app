import { prisma } from "@/lib/prismaDbClient";

// GET DB POST

export async function getCompanyClients() {
  try {
    const companyClients = await prisma.companyClient.findMany();
    if (companyClients) {
      return companyClients;
    }
    return null;
  } catch (err) {
    return `There was an error while getting Company Clients! ${err}`;
  }
}
