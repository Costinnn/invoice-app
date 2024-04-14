import { prisma } from "@/lib/prismaDbClient";

// GET 3 months total Income
const companyIdData = "65fbd41cdccb0b09a7eca9d0";

export async function getIncome() {
  const todayDate = new Date();
  const currentMonth = todayDate.getMonth() + 1;

  try {
    const threeMonthsIncome = await prisma.monthlyIncome.findMany({
      where: {
        AND: [
          {
            OR: [
              { month: currentMonth },
              { month: currentMonth - 1 },
              { month: currentMonth - 2 },
            ],
          },
          { year: todayDate.getFullYear() },
          { companyId: companyIdData },
        ],
      },
      orderBy: [{ month: "asc" }],
    });

    if (threeMonthsIncome) {
      return threeMonthsIncome;
    }

    return { error: "No monthly income found !" };
  } catch (err) {
    console.log(err);
  }
}
