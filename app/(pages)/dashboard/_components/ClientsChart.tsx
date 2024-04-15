"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import "./ChartElement.scss";

type DashElementProps = { title: string; dbData: any };

const ClientsChart = ({ title, dbData }: DashElementProps) => {
  // THIS MONTH DATA
  const thisMonthLabels: string[] = [
    dbData.thisMonthTopClients[0].clientName,
    dbData.thisMonthTopClients[1].clientName,
    dbData.thisMonthTopClients[2].clientName,
  ];
  let thisMonthDatasetData: any[] = [];
  dbData.thisMonthTopClients.map((item: any) =>
    thisMonthDatasetData.push(item.value)
  );
  const thisMonthDataset: any = [
    {
      label: `${dbData.thisMonthTopClients[0].monthName} Sales`,
      data: [...thisMonthDatasetData],
      backgroundColor: "rgba(255, 99, 99, 0.7)",
    },
  ];
  const thisMonthData = {
    labels: [...thisMonthLabels],
    datasets: [...thisMonthDataset],
  };

  // Last MONTH DATA
  const lastMonthLabels: string[] = [
    dbData.lastMonthTopClients[0].clientName,
    dbData.lastMonthTopClients[1].clientName,
    dbData.lastMonthTopClients[2].clientName,
  ];
  let lastMonthDatasetData: any[] = [];
  dbData.lastMonthTopClients.map((item: any) =>
    lastMonthDatasetData.push(item.value)
  );
  const lastMonthDataset: any = [
    {
      label: `${dbData.lastMonthTopClients[0].monthName} Sales`,
      data: [...lastMonthDatasetData],
      backgroundColor: "rgba(99, 224, 255, 0.7)",
    },
  ];
  const lastMonthData = {
    labels: [...lastMonthLabels],
    datasets: [...lastMonthDataset],
  };

  // AnteLast MONTH DATA
  const anteLastMonthLabels: string[] = [
    dbData.anteLastMonthTopClients[0].clientName,
    dbData.anteLastMonthTopClients[1].clientName,
    dbData.anteLastMonthTopClients[2].clientName,
  ];
  let anteLastMonthDatasetData: any[] = [];
  dbData.anteLastMonthTopClients.map((item: any) =>
    anteLastMonthDatasetData.push(item.value)
  );
  const anteLastMonthDataset: any = [
    {
      label: `${dbData.anteLastMonthTopClients[0].monthName} Sales`,
      data: [...anteLastMonthDatasetData],
      backgroundColor: "rgba(255, 193, 99, 0.7)",
    },
  ];
  const anteLastMonthData = {
    labels: [...anteLastMonthLabels],
    datasets: [...anteLastMonthDataset],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="chartelement">
      <h2>{title}</h2>

      <Bar options={options} data={thisMonthData} />
      <Bar options={options} data={lastMonthData} />
      <Bar options={options} data={anteLastMonthData} />
    </div>
  );
};

export default ClientsChart;
