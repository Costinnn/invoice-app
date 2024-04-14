import IncomeChart from "./_components/IncomeChart";
import { getIncome } from "@/lib/dashboardData/getIncome";
import { getTopClients } from "@/lib/dashboardData/getTopClients";
import ClientsChart from "./_components/ClientsChart";

const page = async () => {
  const incomeData = await getIncome();
  const topClients = await getTopClients();

  return (
    <main className="dash-page">
      <IncomeChart title={"Venituri totale"} dbData={incomeData} />
      <ClientsChart title={"Clienti"} dbData={topClients} />
    </main>
  );
};

export default page;
