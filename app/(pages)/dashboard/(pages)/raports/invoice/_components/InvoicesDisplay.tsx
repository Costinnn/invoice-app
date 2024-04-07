import React from "react";

import Invoice from "./Invoice";
import { getInvoices } from "@/lib/invoiceData/getInvoices";

import { DbInvoiceType } from "@/types/prismaSchemaTypes";

import "./InvoicesDisplay.scss";

const InvoicesDisplay = async () => {
  const dbInvoices = await getInvoices();

  return (
    <div className="invoices-display">
      {dbInvoices.length > 0 &&
        dbInvoices.map((item: DbInvoiceType) => (
          <Invoice invoiceData={item} key={item.id} />
        ))}
    </div>
  );
};

export default InvoicesDisplay;
