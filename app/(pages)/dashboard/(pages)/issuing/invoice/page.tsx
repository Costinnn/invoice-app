import React from "react";

import { getCompanyClients } from "@/lib/invoiceData/getCompanyClients";

import {
  CompanyClientType,
  InvoiceSeriesType,
} from "@/types/prismaSchemaTypes";

import InvoiceForm from "./_components/InvoiceForm";

const page = async () => {
  const companyClients: [CompanyClientType] = await getCompanyClients();
  const invoiceSeries: [InvoiceSeriesType] = [
    { id: "32", name: "test", lastNumber: 2, numbers: [1, 2] },
  ];

  return (
    <section className="dash-page">
      <InvoiceForm
        companyClients={companyClients}
        invoiceSeries={invoiceSeries}
      />
    </section>
  );
};

export default page;
