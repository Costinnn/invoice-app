import React from "react";

import { getCompanyClients } from "@/lib/invoiceData/getCompanyClients";

import {
  CompanyClientType,
  InvoiceSeriesType,
  ProductType,
} from "@/types/prismaSchemaTypes";

import InvoiceForm from "./_components/InvoiceForm";

const page = async () => {
  const dbCompanyClients: [CompanyClientType] = await getCompanyClients();
  const dbInvoiceSeries: InvoiceSeriesType[] = [
    { id: "1", name: "series 1", lastNumber: 1, numbers: [1] },
    { id: "2", name: "series 2", lastNumber: 2, numbers: [1, 2] },
  ];
  const dbProducts: ProductType[] = [
    { id: "1", name: "prod1", um: "BUC" },
    { id: "2", name: "prod2", um: "KG" },
  ];

  return (
    <section className="dash-page">
      <InvoiceForm
        dbCompanyClients={dbCompanyClients}
        dbInvoiceSeries={dbInvoiceSeries}
        dbProducts={dbProducts}
      />
    </section>
  );
};

export default page;
