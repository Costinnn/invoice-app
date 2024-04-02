import React from "react";

import { getCompanyClients } from "@/lib/invoiceData/getCompanyClients";
import { getInvoiceSeries } from "@/lib/invoiceData/getInvoiceSeries";
import { getProducts } from "@/lib/invoiceData/getProducts";

import {
  CompanyClientType,
  InvoiceSeriesType,
  ProductType,
} from "@/types/prismaSchemaTypes";

import InvoiceForm from "./_components/InvoiceForm";

const page = async () => {
  const dbCompanyClients: CompanyClientType[] = await getCompanyClients();
  const dbInvoiceSeries: InvoiceSeriesType[] = await getInvoiceSeries();
  const dbProducts: ProductType[] = await getProducts();

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
