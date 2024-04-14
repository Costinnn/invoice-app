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

type DashElementProps = { title: string; dbData: any[] };

const IncomeChart = ({ title, dbData }: DashElementProps) => {
  const dbMmonths: string[] = [];
  const incomeValues: number[] = [];
  const tvaValues: number[] = [];

  dbData.map((item): void => {
    dbMmonths.push(item.monthName);
    incomeValues.push(item.incomeValue);
    tvaValues.push(item.tvaValue);
  });

  const dbDataset: any[] = [
    {
      label: "Income",
      data: incomeValues,
      backgroundColor: "rgba(255, 99, 132, 0.7)",
    },
    {
      label: "Tva",
      data: tvaValues,
      backgroundColor: "rgba(102, 99, 255, 0.7)",
    },
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  const data = {
    labels: dbMmonths,
    datasets: dbDataset,
  };

  return (
    <div className="chartelement">
      <h2>{title}</h2>
      <Bar options={options} data={data} />
    </div>
  );
};

export default IncomeChart;
