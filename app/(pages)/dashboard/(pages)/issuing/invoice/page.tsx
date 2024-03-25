import React from "react";

import { getCompanyClients } from "@/lib/invoiceData/getCompanyClients";

import { CompanyClientType } from "@/types/prismaSchemaTypes";

import InvoiceForm from "./_components/InvoiceForm";

const page = async () => {
  const companyClients: [CompanyClientType] = await getCompanyClients();

  return (
    <section className="dash-page">
      <InvoiceForm companyClients={companyClients} />
    </section>
  );
};

export default page;
