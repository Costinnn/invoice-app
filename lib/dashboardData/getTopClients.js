import { prisma } from "@/lib/prismaDbClient";

// GET 3 months of top clients
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getTopClients() {
  const todayDate = new Date();
  const currentMonth = todayDate.getMonth() + 1;

  try {
    const thisMonthTopClients = await prisma.monthlyTopClients.findMany({
      where: {
        AND: [
          { month: currentMonth },
          { year: todayDate.getFullYear() },
          { companyId: companyIdData },
        ],
      },
      orderBy: [{ month: "asc" }, { value: "desc" }],
      take: 3,
    });

    const lastMonthTopClients = await prisma.monthlyTopClients.findMany({
      where: {
        AND: [
          { month: currentMonth - 1 },
          { year: todayDate.getFullYear() },
          { companyId: companyIdData },
        ],
      },
      orderBy: [{ month: "asc" }, { value: "desc" }],
      take: 3,
    });

    const anteLastMonthTopClients = await prisma.monthlyTopClients.findMany({
      where: {
        AND: [
          { month: currentMonth - 2 },
          { year: todayDate.getFullYear() },
          { companyId: companyIdData },
        ],
      },
      orderBy: [{ month: "asc" }, { value: "desc" }],
      take: 3,
    });

    const topClients = {
      anteLastMonthTopClients,
      lastMonthTopClients,
      thisMonthTopClients,
    };

    if (topClients) {
      return topClients;
    }

    return { error: "No top clients found !" };
  } catch (err) {
    console.log(err);
  }
}
