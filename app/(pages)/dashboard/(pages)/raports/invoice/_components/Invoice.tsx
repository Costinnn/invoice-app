"use client";

import React from "react";
import Image from "next/image";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import PdfTemplate from "@/lib/pdfTemplate/PdfTemplate";

import { CompanyType, DbInvoiceType } from "@/types/prismaSchemaTypes";

import invoiceImg from "@/public/images/invoice.png";

import "./Invoice.scss";

type InvoiceComponentType = {
  invoiceData: DbInvoiceType;
  company: CompanyType;
};

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Invoice = ({ invoiceData, company }: InvoiceComponentType) => {
  const invoiceProducts = JSON.parse(invoiceData.productsData);

  const pdfTemplate = PdfTemplate(company, invoiceData, invoiceProducts);

  const openPdf = () => {
    const generatedPdf = pdfMake.createPdf(pdfTemplate);
    generatedPdf.open();
  };

  const downloadPdf = () => {
    const generatedPdf = pdfMake.createPdf(pdfTemplate);
    generatedPdf.download();
  };

  return (
    <div className="invoice-component">
      <div className="info">
        <div className="img-box">
          <Image src={invoiceImg} alt="invoice" width={50} height={50} />
          <span>{invoiceData.date}</span>
        </div>
        <div className="text">
          <div className="row1">
            <span>
              <b>Serie:</b> {invoiceData.invoiceSerie}
            </span>
            <span>
              <b>Nr:</b> {invoiceData.number}
            </span>
          </div>
          <span className="row2">
            <b>Client:</b> {invoiceData.clientName}
          </span>
          <div className="row3">
            <span>
              <b>Total:</b> {invoiceData.total}
            </span>
            <span>
              <b>TVA:</b> {invoiceData.tva}
            </span>
          </div>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-yellow" onClick={openPdf}>
          Vezi PDF
        </button>
        <button type="button" className="btn-violet" onClick={downloadPdf}>
          Descarca PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
