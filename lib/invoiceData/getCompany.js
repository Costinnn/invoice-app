import { prisma } from "@/lib/prismaDbClient";

// GET DB company
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getCompany() {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: companyIdData,
      },
    });

    if (company) {
      return company;
    }

    return { error: "No company found" };
  } catch (err) {
    return `There was an error while getting company! ${err}`;
  }
}
