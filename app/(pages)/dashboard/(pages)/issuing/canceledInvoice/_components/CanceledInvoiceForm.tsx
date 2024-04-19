"use client";

import React, { useEffect, useState } from "react";

import InvoiceSeriesModal from "@/app/(pages)/dashboard/(pages)/issuing/invoice/_modals/InvoiceSeriesModal";

import SuccessSvg from "@/components/svg/SuccessSvg";
import ErrorSvg from "@/components/svg/ErrorSvg";
import LoadingSvg from "@/components/svg/LoadingSvg";

import { InvoiceSeriesType, InvoiceType, ReturnedInvoiceProductType, InvoiceProductType } from "@/types/prismaSchemaTypes";

import "../../invoice/_components/InvoiceForm.scss";
import "./CanceledInvoiceForm.scss";
import axios from "axios";

type CanceledInvoiceFormProps = {
  dbData: any;
};

const CanceledInvoiceForm = ({ dbData }: CanceledInvoiceFormProps) => {
  const { dbInvoiceSeries } = dbData;

  // DB DATA
  const [dbInvoiceSeriesState, setDbInvoiceSeriesState] = useState<InvoiceSeriesType[]>(dbInvoiceSeries);
  const [invoiceDbData, setInvoiceDbData] = useState<InvoiceType | "none">("none");
  const [invoiceProductsDbData, setInvoiceProductsDbData] = useState<ReturnedInvoiceProductType[]>([]);

  // MODALS
  const [isOpenSeriesModal, setIsOpenSeriesModal] = useState<boolean>(false);

  // COMPONENT STATE
  const [isActionInputOpen, setIsActionInputOpen] = useState<string>("none");
  const [oldInvoiceNumber, setOldInvoiceNumber] = useState("");
  const [oldInvoiceSerie, setOldInvoiceSerie] = useState<InvoiceSeriesType>({
    id: "",
    name: "",
    lastNumber: -1,
    numbers: [],
  });
  const [selectedInvoiceSerie, setSelectedInvoiceSerie] = useState<InvoiceSeriesType>({
    id: "",
    name: "",
    lastNumber: 0,
    numbers: [],
  });
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<number | string>("");
  const [date, setDate] = useState<string>("");

  const [returnedProducts, setReturnedProducts] = useState<ReturnedInvoiceProductType[]>([]);
  const [returnedProductQty, setReturnedProductQty] = useState<number | string>("");

  const [subtotalReturnedValue, setSubtotalReturnedValue] = useState<number>(0);
  const [totalReturnedValue, setTotalReturnedValue] = useState<number>(0);
  const [TVAReturnedValue, setTVAReturnedValue] = useState<number>(0);

  const [issuedByName, setIssuedByName] = useState<string>("");
  const [issuedByCnp, setIssuedByCnp] = useState<string>("");
  const [accompanyNotice, setAccompanyNotice] = useState<string>("");
  const [delegateName, setDelegateName] = useState<string>("");
  const [delegateCnp, setDelegateCnp] = useState<string>("");
  const [delegateAuto, setDelegateAuto] = useState<string>("");
  const [termsValue, setTermsValue] = useState<string>("");
  const [terms, setTerms] = useState<string[]>([]);
  const [remarksValue, setRemarksValue] = useState<string>("");
  const [remarks, setRemarks] = useState<string[]>([]);
  const [invoiceSaveStatus, setInvoiceSaveStatus] = useState<"error" | "success" | "loading" | "">("");

  // HANDLERS

  const handleSelectedSerie = (serieId: string, serieType: "oldInv" | "returnInv") => {
    if (serieType === "oldInv") {
      if (serieId === "none") {
        setOldInvoiceSerie({
          id: "",
          name: "",
          lastNumber: -1,
          numbers: [],
        });
        setOldInvoiceNumber("");
        setInvoiceDbData("none");
      } else {
        const serie = dbInvoiceSeries.filter((item: InvoiceSeriesType) => item.id === serieId)[0];
        setOldInvoiceSerie({
          id: serie.id,
          name: serie.name,
          lastNumber: serie.lastNumber,
          numbers: serie.numbers,
        });
      }
    } else if (serieType === "returnInv") {
      if (serieId !== "none") {
        const invoiceSerieData = dbInvoiceSeriesState.filter((item) => item.id === serieId)[0];
        setSelectedInvoiceSerie(invoiceSerieData);
        setSelectedInvoiceNumber(invoiceSerieData.lastNumber! + 1);
      } else {
        setSelectedInvoiceSerie({
          id: "",
          name: "",
          lastNumber: 0,
          numbers: [],
        });
        setSelectedInvoiceNumber("");
      }
    }
  };

  const handleTermsRemarks = (field: "terms" | "remarks", value: string) => {
    if (field === "terms") {
      setTerms((prev) => [...prev, value]);
      setTermsValue("");
    } else if (field === "remarks") {
      setRemarks((prev) => [...prev, value]);
      setRemarksValue("");
    }
  };

  const handleProductReturn = (productId: string) => {
    // open input
    if (isActionInputOpen === "none") {
      setIsActionInputOpen(productId);
    }
    // close input if input has no value
    else if (isActionInputOpen === productId && Number(returnedProductQty) === 0) {
      setIsActionInputOpen("none");
    }
    // ADD RETURNED PRODUCT
    else if (isActionInputOpen === productId && Number(returnedProductQty) !== 0) {
      const dbProductToReturn = invoiceProductsDbData.filter((item) => item.id === productId)[0];

      let TVAValuePTR = 0;
      let totalValuePTR = 0;

      if (invoiceDbData !== "none" && invoiceDbData.discount > 0) {
        const initialTVAValue = Number(returnedProductQty) * dbProductToReturn.price * (dbProductToReturn.tva / 100);
        const initialTotalValue = Number(returnedProductQty) * dbProductToReturn.price + TVAValuePTR;

        TVAValuePTR = initialTVAValue - initialTVAValue * (invoiceDbData.discount / 100);
        totalValuePTR = initialTotalValue - initialTotalValue * (invoiceDbData.discount / 100);
      } else {
        TVAValuePTR = Number(returnedProductQty) * dbProductToReturn.price * (dbProductToReturn.tva / 100);
        totalValuePTR = Number(returnedProductQty) * dbProductToReturn.price + TVAValuePTR;
      }

      setSubtotalReturnedValue((prev) => prev + totalValuePTR);
      setTVAReturnedValue((prev) => prev + TVAValuePTR);
      setTotalReturnedValue((prev) => prev + TVAValuePTR + totalValuePTR);

      const newReturnedProduct = {
        id: "",
        returnedInvoiceProductId: dbProductToReturn.id,
        name: dbProductToReturn.name,
        um: dbProductToReturn.um,
        price: dbProductToReturn.price,
        quantity: Number(returnedProductQty),
        tva: TVAValuePTR,
        totalValue: totalValuePTR,
        productId: dbProductToReturn.productId,
        companyId: dbProductToReturn.companyId,
        invoiceId: dbProductToReturn.invoiceId[0],
      };

      setReturnedProducts((prev) => [...prev, newReturnedProduct]);
      setIsActionInputOpen("none");
      setReturnedProductQty("");
    }
    // open current input and close the other opened
    else {
      setIsActionInputOpen(productId);
      setReturnedProductQty("");
    }
  };

  const handleStateReset = (invSeriesId: string | undefined) => {
    // clear fields

    setInvoiceDbData("none");
    setInvoiceProductsDbData([]);
    setOldInvoiceSerie({
      id: "",
      name: "",
      lastNumber: -1,
      numbers: [],
    });
    setOldInvoiceNumber("");
    setSelectedInvoiceSerie({
      id: "",
      name: "",
      lastNumber: 0,
      numbers: [],
    });
    setSelectedInvoiceNumber("");
    const updatedDbInvoiceSeriesState = dbInvoiceSeriesState.map((item) => {
      if (item.id === invSeriesId) {
        item.lastNumber += 1;
        item.numbers.push(item.lastNumber);
      }
      return item;
    });
    setDbInvoiceSeriesState(updatedDbInvoiceSeriesState);
    setDate("");

    setReturnedProducts([]);
    setReturnedProductQty("");

    setSubtotalReturnedValue(0);
    setTotalReturnedValue(0);
    setTVAReturnedValue(0);

    setIssuedByName("");
    setIssuedByCnp("");
    setAccompanyNotice("");
    setDelegateName("");
    setDelegateCnp("");
    setDelegateAuto("");
    setTermsValue("");
    setTerms([]);
    setRemarksValue("");
    setRemarks([]);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInvoiceSaveStatus("loading");

    if (invoiceDbData !== "none") {
      const newReturnInvoice = {
        clientId: invoiceDbData.clientId,
        clientName: invoiceDbData.clientName,
        clientCui: invoiceDbData.clientCui,
        clientAddress: invoiceDbData.clientAddress,
        clientRc: invoiceDbData.clientRc,
        clientIban: invoiceDbData.clientIban,
        clientEmail: invoiceDbData.clientEmail,
        invoiceSeriesId: selectedInvoiceSerie?.id,
        invoiceSerie: selectedInvoiceSerie?.name,
        number: Number(selectedInvoiceNumber),
        date: date,
        products: returnedProducts,
        issuedByName: issuedByName,
        issuedByCnp: issuedByCnp,
        accompanyNotice: accompanyNotice,
        delegateName: delegateName,
        delegateCnp: delegateCnp,
        delegateAuto: delegateAuto,
        terms: terms,
        remarks: remarks,
        currency: invoiceDbData.currency,
        subtotal: subtotalReturnedValue,
        tva: TVAReturnedValue,
        total: totalReturnedValue,
      };

      try {
        const res = await axios.post("/api/addCanceledInvoice", newReturnInvoice);
        if (res.status === 201) {
          setInvoiceSaveStatus("success");
          handleStateReset(selectedInvoiceSerie?.id);
          setTimeout(() => {
            setInvoiceSaveStatus("");
          }, 2000);
        } else {
          console.log({ res });
          setInvoiceSaveStatus("error");
          setTimeout(() => {
            setInvoiceSaveStatus("");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
        setInvoiceSaveStatus("error");
        setTimeout(() => {
          setInvoiceSaveStatus("");
        }, 2000);
      }
    }
  };

  // GET INVOICE DATA
  useEffect(() => {
    if (oldInvoiceSerie.id.length > 0 && Number(oldInvoiceNumber) > 0) {
      fetch(`/api/getInvoiceData?invoiceSerieId=${oldInvoiceSerie.id}&oldInvoiceNumber=${oldInvoiceNumber}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setInvoiceDbData(data.dbData.invoice);
          setInvoiceProductsDbData(data.dbData.products);
        })
        .catch((error) => console.log(error));
    }
  }, [oldInvoiceSerie, oldInvoiceNumber]);

  // useEffect(() => {
  //   console.log(returnedProducts);
  // }, [returnedProducts]);

  return (
    <>
      {/* START MODALS */}
      {isOpenSeriesModal && (
        <InvoiceSeriesModal
          setIsOpenSeriesModal={setIsOpenSeriesModal}
          setDbInvoiceSeriesState={setDbInvoiceSeriesState}
          setSelectedInvoiceSerie={setSelectedInvoiceSerie}
          setSelectedInvoiceNumber={setSelectedInvoiceNumber}
        />
      )}
      <form className="invoice-form cif section-narrow">
        <div className="organize-box">
          {/* OLD INVOICE SERIE */}
          <div className="box bg-2">
            <h2>Issued invoice</h2>
            <label>
              Series{!oldInvoiceSerie?.id && "*"}
              <select required onChange={(e) => handleSelectedSerie(e.target.value, "oldInv")} value={oldInvoiceSerie?.id}>
                <option value={"none"}>Add series</option>
                {dbInvoiceSeries.length > 0 &&
                  dbInvoiceSeries.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
            {/* NUMBER */}
            <label>
              Invoice number{!oldInvoiceNumber && "*"}
              <select required onChange={(e) => setOldInvoiceNumber(e.target.value)} value={oldInvoiceNumber ? oldInvoiceNumber : "none"}>
                <option value={"none"}>{!oldInvoiceSerie.id ? "Add invoice serie" : "Select invoice number"}</option>
                {oldInvoiceSerie.id &&
                  oldInvoiceSerie.numbers.map((item: any) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          {/*OLD INVOICE DATA */}
          {invoiceDbData !== "none" && (
            <div className="box cif-box bg-2">
              <ul className="invoice-datalist">
                <li>
                  <b>Client: </b> {invoiceDbData.clientName}
                </li>
                <li>
                  <b>CUI: </b> {invoiceDbData.clientCui}
                </li>
                <li>
                  <b>RC: </b> {invoiceDbData.clientRc}
                </li>
                <li>
                  <b>Address: </b> {invoiceDbData.clientAddress}
                </li>
                <li>
                  <b>Contact: </b> {invoiceDbData?.clientEmail}
                </li>
                <li>
                  <b>IBAN: </b> {invoiceDbData.clientIban}
                </li>
              </ul>
              <ul className="invoice-datalist">
                <li>
                  <b>Document: </b>Factura
                </li>
                <li>
                  <b>Serie: </b> {invoiceDbData.invoiceSerie}
                </li>
                <li>
                  <b>Number: </b> {invoiceDbData.number}
                </li>
                <li>
                  <b>Date: </b> {invoiceDbData.date}
                </li>
                <li>
                  <b>Deadline: </b> {invoiceDbData.deadline}
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="organize-box">
          {/*OLD INVOICE PRODUCTS */}
          {invoiceDbData !== "none" && (
            <div className="box invoice cif-box bg-2">
              <h2>Available products</h2>
              <ul className="products-datalist">
                {invoiceProductsDbData.length > 0 &&
                  invoiceProductsDbData.map((item: InvoiceProductType) => (
                    <li key={item.id}>
                      <div className="container">
                        <div className="box1">
                          <b>{item.name}</b>
                          <span>
                            <b>Total:</b> {item.totalValue} {invoiceDbData.currency}
                          </span>
                        </div>

                        <div className="box1">
                          {item.quantity} {item.um} x {item.price} {invoiceDbData.currency}
                          <span>{item.tva}% TVA</span>
                        </div>
                      </div>
                      <div className="actions">
                        {isActionInputOpen === item.id && (
                          <input
                            className={Number(returnedProductQty) > item.quantity && isActionInputOpen === item.id ? "input-error" : ""}
                            type="number"
                            min={0}
                            max={item.quantity}
                            onChange={(e) => setReturnedProductQty(Number(e.target.value))}
                            value={returnedProductQty}
                          />
                        )}

                        <button
                          type="button"
                          className="btn-violet"
                          disabled={Number(returnedProductQty) > item.quantity && isActionInputOpen === item.id}
                          onClick={() => handleProductReturn(item.id)}
                        >
                          {isActionInputOpen === item.id ? "Return" : "Return product"}
                        </button>
                      </div>
                    </li>
                  ))}
                <li className="totals" id="first-total">
                  <b>Subtotal: </b>
                  {invoiceDbData.subtotal} {invoiceDbData.currency}
                </li>
                <li className="totals">
                  <b>TVA: </b>
                  {invoiceDbData.tva} {invoiceDbData.currency}
                </li>
                <li className="totals">
                  <b>Discount: </b>
                  {invoiceDbData.discount} %
                </li>
                <li className="totals">
                  <b>Total value: </b>
                  {invoiceDbData.total} {invoiceDbData.currency}
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="organize-box">
          {/*NEW INVOICE SERIES */}
          <div className="box bg-1">
            <h2>Return invoice</h2>
            <label>
              Series{!selectedInvoiceSerie?.id && "*"}
              <select required onChange={(e) => handleSelectedSerie(e.target.value, "returnInv")} value={selectedInvoiceSerie?.id}>
                <option value={"none"}>Add series</option>
                {dbInvoiceSeriesState.length > 0 &&
                  dbInvoiceSeriesState.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>

            {/* SERIES NUMBER */}
            <label>
              Number{!selectedInvoiceNumber && "*"}
              <input
                type="number"
                required
                min={selectedInvoiceSerie?.lastNumber}
                value={selectedInvoiceNumber}
                onChange={(e) => setSelectedInvoiceNumber(Number(e.target.value))}
              />
            </label>
            <button type="button" className="btn-violet" onClick={() => setIsOpenSeriesModal(true)}>
              Add new series
            </button>
            {/* DATE */}
            <label>
              Issuing date{!date && "*"}
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>

          {/*NEW RETURNED PRODUCTS */}
          {returnedProducts.length > 0 && (
            <div className="box invoice cif-box bg-1">
              <h2>Selected products</h2>
              <ul className="products-datalist">
                {returnedProducts.map((item) => (
                  <li key={item.returnedInvoiceProductId}>
                    <div className="container">
                      <div className="box1">
                        <b>{item.name}</b>
                        <span>
                          <b>Total:</b> -{item.totalValue}
                        </span>
                      </div>

                      <div className="box1">
                        {item.quantity} {item.um} x {item.price}
                        <span>{item.tva} TVA</span>
                      </div>
                    </div>
                  </li>
                ))}
                <li className="totals" id="first-total">
                  <b>Subtotal: </b>-{subtotalReturnedValue}
                </li>
                <li className="totals">
                  <b>TVA: </b>-{TVAReturnedValue}
                </li>
                <li className="totals">
                  <b>Total: </b>({invoiceDbData !== "none" && invoiceDbData.currency}) -{totalReturnedValue}
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* ISSUED BY */}
        <div className="organize-box">
          <div className="box bg-4">
            <label>
              Issued by
              <input type="text" value={issuedByName} onChange={(e) => setIssuedByName(e.target.value)} />
            </label>
            <label>
              CNP
              <input type="text" value={issuedByCnp} onChange={(e) => setIssuedByCnp(e.target.value)} />
            </label>
            <label>
              Accompany notice
              <input type="text" value={accompanyNotice} onChange={(e) => setAccompanyNotice(e.target.value)} />
            </label>
          </div>

          <div className="box bg-5">
            <label>
              Delegate
              <input type="text" value={delegateName} onChange={(e) => setDelegateName(e.target.value)} />
            </label>
            <label>
              ID
              <input type="text" value={delegateCnp} onChange={(e) => setDelegateCnp(e.target.value)} />
            </label>
            <label>
              Auto
              <input type="text" value={delegateAuto} onChange={(e) => setDelegateAuto(e.target.value)} />
            </label>
          </div>
        </div>

        {/* TERMS & REMARKS */}
        <div className="organize-box">
          <div className="box">
            <label className="textarea-label">
              Terms & Conditions
              <textarea cols={30} rows={5} value={termsValue} onChange={(e) => setTermsValue(e.target.value)}></textarea>
              {terms && (
                <ul>
                  {terms.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              )}
              <button type="button" className="btn-empty" onClick={() => handleTermsRemarks("terms", termsValue)}>
                Add
              </button>
            </label>{" "}
          </div>
          <div className="box">
            <label className="textarea-label">
              Remarks
              <textarea cols={30} rows={5} value={remarksValue} onChange={(e) => setRemarksValue(e.target.value)}></textarea>
              {remarks && (
                <ul>
                  {remarks.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              )}
              <button type="button" className="btn-empty" onClick={() => handleTermsRemarks("remarks", remarksValue)}>
                Add
              </button>
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="button"
          className="btn-violet"
          onClick={(e) => handleSubmit(e)}
          disabled={invoiceSaveStatus === "error" || invoiceSaveStatus === "success" || invoiceSaveStatus === "loading"}
        >
          {invoiceSaveStatus === "error" ? (
            <ErrorSvg color="red" size={15} />
          ) : invoiceSaveStatus === "success" ? (
            <SuccessSvg color="green" size={15} />
          ) : invoiceSaveStatus === "loading" ? (
            <LoadingSvg color="white" size={15} />
          ) : (
            "Save invoice"
          )}
        </button>
      </form>{" "}
    </>
  );
};

export default CanceledInvoiceForm;
