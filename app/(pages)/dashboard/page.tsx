import IncomeChart from "./_components/IncomeChart";
import { getIncome } from "@/lib/dashboardData/getIncome";
import { getTopClients } from "@/lib/dashboardData/getTopClients";
import ClientsChart from "./_components/ClientsChart";

const page = async () => {
  const incomeData = await getIncome();
  const topClients = await getTopClients();

  return (
    <main className="dash-page">
      <IncomeChart title={"Total monthly income"} dbData={incomeData} />
      <ClientsChart title={"Top monthly clients"} dbData={topClients} />
    </main>
  );
};

export default page;
