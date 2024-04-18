import React from "react";

import CanceledInvoiceForm from "./_components/CanceledInvoiceForm";

import { getInvoiceSeries } from "@/lib/invoiceData/getInvoiceSeries";

import { InvoiceSeriesType } from "@/types/prismaSchemaTypes";

const page = async () => {
  const dbInvoiceSeries: InvoiceSeriesType[] = await getInvoiceSeries();

  const dbData = { dbInvoiceSeries };
  return (
    <section className="dash-page">
      <CanceledInvoiceForm dbData={dbData} />
    </section>
  );
};

export default page;
