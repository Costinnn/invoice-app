import React from "react";

import { getCompanyClients } from "@/lib/invoiceData/getCompanyClients";
import { getInvoiceSeries } from "@/lib/invoiceData/getInvoiceSeries";

import {
  CompanyClientType,
  InvoiceSeriesType,
  ProductType,
} from "@/types/prismaSchemaTypes";

import InvoiceForm from "./_components/InvoiceForm";

const page = async () => {
  const dbCompanyClients: CompanyClientType[] = await getCompanyClients();

  const dbInvoiceSeries: InvoiceSeriesType[] = await getInvoiceSeries();

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
