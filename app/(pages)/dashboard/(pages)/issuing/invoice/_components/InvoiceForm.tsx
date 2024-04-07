"use client";

import React, { Key, useEffect, useState } from "react";
import axios from "axios";

import CompanyClientModal from "../_modals/CompanyClientModal";
import InvoiceSeriesModal from "../_modals/InvoiceSeriesModal";
import ProductModal from "../_modals/ProductModal";
import UpdateSvg from "@/components/svg/UpdateSvg";
import DeleteSvg from "@/components/svg/DeleteSvg";
import SuccessSvg from "@/components/svg/SuccessSvg";
import ErrorSvg from "@/components/svg/ErrorSvg";
import LoadingSvg from "@/components/svg/LoadingSvg";

import {
  CompanyClientType,
  InvoiceProductType,
  InvoiceSeriesType,
  ProductType,
  ProductStateType,
  InvoiceType,
} from "@/types/prismaSchemaTypes";

import "./InvoiceForm.scss";

type InvoiceFormType = {
  dbCompanyClients: CompanyClientType[];
  dbInvoiceSeries: InvoiceSeriesType[];
  dbProducts: ProductType[];
};

const InvoiceForm = ({
  dbCompanyClients,
  dbInvoiceSeries,
  dbProducts,
}: InvoiceFormType) => {
  // MODALS
  const [isOpenClientModal, setIsOpenClientModal] = useState<boolean>(false);
  const [isOpenSeriesModal, setIsOpenSeriesModal] = useState<boolean>(false);
  const [isProductModal, setIsProductModal] = useState<boolean>(false);

  // DB STATE
  const [dbCompanyClientsState, setDbCompanyClientsState] =
    useState<CompanyClientType[]>(dbCompanyClients);
  const [dbInvoiceSeriesState, setDbInvoiceSeriesState] =
    useState<InvoiceSeriesType[]>(dbInvoiceSeries);
  const [dbProductsState, setDbProductsState] =
    useState<ProductType[]>(dbProducts);

  // COMPONENT STATE
  const [selectedClient, setSelectedClient] = useState<
    CompanyClientType | undefined
  >();
  const [selectedInvoiceSerie, setSelectedInvoiceSerie] = useState<
    InvoiceSeriesType | undefined
  >({ id: "", name: "", lastNumber: 0, numbers: [] });
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<
    number | string
  >("");
  const [currency, setCurrency] = useState<string>("RON");
  const [date, setDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
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
  const [invoiceSaveStatus, setInvoiceSaveStatus] = useState<
    "error" | "success" | "loading" | ""
  >("");

  // INVOICE TOTALS
  const [invoiceDiscount, setInvoiceDiscount] = useState<number>(0);
  const [invoiceAppliedDiscount, setInvoiceAppliedDiscount] =
    useState<number>(0);
  const [invoiceTvaValue, setInvoiceTvaValue] = useState<number>(0);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState<number>(0);
  const [invoiceTotal, setInvoiceTotal] = useState<number>(0);

  //  INVOICE PRODUCTS
  const [productNameId, setProductNameId] = useState<ProductStateType>({
    id: "",
    name: "",
  });
  const [productUm, setProductUm] = useState<string>("");
  const [productQty, setProductQty] = useState<number | string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productTva, setProductTva] = useState<number | string>("0");
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductType[]>(
    []
  );
  const [allProductFieldsFilled, setAllProductFieldsFilled] =
    useState<boolean>(false);

  // HANDLERS
  const handleSelectedClient = (clientId: string) => {
    const clientData = dbCompanyClients.filter(
      (item) => item.id === clientId
    )[0];
    setSelectedClient(clientData);
  };

  const handleSelectedSerie = (seriesId: string) => {
    const invoiceSerieData = dbInvoiceSeries.filter(
      (item) => item.id === seriesId
    )[0];
    setSelectedInvoiceSerie(invoiceSerieData);
    setSelectedInvoiceNumber(invoiceSerieData.lastNumber! + 1);
  };

  const handleTypedProduct = (newNameValue: string) => {
    setProductNameId({ id: "new", name: newNameValue });
  };

  const handleAddInvoiceProduct = async () => {
    const totalValueOfAddedProduct =
      Number(productQty) * Number(productPrice) +
      Number(productQty) * Number(productPrice) * (Number(productTva) / 100);

    if (productNameId.id === "new") {
      const newDbProduct = { name: productNameId.name, um: productUm };

      try {
        const res = await axios.post("/api/addProduct", newDbProduct);

        if (res.status === 201) {
          setInvoiceProducts([
            ...invoiceProducts,
            {
              id: res.data.dbData.id,
              name: res.data.dbData.name,
              um: res.data.dbData.um,
              quantity: Number(productQty),
              price: Number(productPrice),
              tva: Number(productTva),
              totalValue: totalValueOfAddedProduct,
            },
          ]);
          setDbProductsState((prev) => [
            ...prev,
            {
              id: res.data.dbData.id,
              name: res.data.dbData.name,
              um: res.data.dbData.um,
            },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setInvoiceProducts([
        ...invoiceProducts,
        {
          id: productNameId.id,
          name: productNameId.name,
          um: productUm,
          quantity: Number(productQty),
          price: Number(productPrice),
          tva: Number(productTva),
          totalValue: totalValueOfAddedProduct,
        },
      ]);
    }

    setProductNameId({
      id: "",
      name: "",
    });
    setProductUm("");
    setProductPrice("");
    setProductQty("");
    setProductTva("0");
  };

  const handleInvoiceDiscount = () => {
    if (
      invoiceDiscount >= 0 &&
      invoiceDiscount <= 100 &&
      invoiceSubtotal > 0 &&
      invoiceDiscount !== invoiceAppliedDiscount
    ) {
      setInvoiceAppliedDiscount(invoiceDiscount);
    }
  };

  const handleDeleteInvoiceItem = (itemId: string) => {
    setInvoiceProducts((prev) => prev.filter((item) => item.id !== itemId));
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

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setInvoiceSaveStatus("loading");
    const newInvoice = {
      clientName: selectedClient?.name,
      clientCui: selectedClient?.cui,
      clientAddress: selectedClient?.address,
      clientRc: selectedClient?.rc,
      clientIban: selectedClient?.iban,
      clientEmail: selectedClient?.email,
      invoiceSeriesId: selectedInvoiceSerie?.id,
      invoiceSerie: selectedInvoiceSerie?.name,
      number: Number(selectedInvoiceNumber),
      date: date,
      deadline: deadline,
      products: invoiceProducts,
      issuedByName: issuedByName,
      issuedByCnp: issuedByCnp,
      accompanyNotice: accompanyNotice,
      delegateName: delegateName,
      delegateCnp: delegateCnp,
      delegateAuto: delegateAuto,
      terms: terms,
      remarks: remarks,
      currency: currency,
      subtotal: invoiceSubtotal,
      discount: invoiceAppliedDiscount,
      tva: invoiceTvaValue,
      total: invoiceTotal,
    };

    try {
      const res = await axios.post("/api/addInvoice", newInvoice);

      if (res.status === 201) {
        console.log("SUCCESS", { res });
        setInvoiceSaveStatus("success");
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
  };

  // FUNCTIONS
  useEffect(() => {
    setInvoiceSubtotal(0);
    setInvoiceTvaValue(0);
    setInvoiceTotal(0);

    invoiceProducts.map((item) => {
      const itemSubtotal = item.price * item.quantity;
      const itemTva = itemSubtotal * (item.tva / 100);

      setInvoiceSubtotal((prev) => prev + itemSubtotal);
      setInvoiceTvaValue(
        (prev) => prev + itemTva - itemTva * (invoiceAppliedDiscount / 100)
      );
      setInvoiceTotal(
        (prev) =>
          prev +
          (itemSubtotal - itemSubtotal * (invoiceAppliedDiscount / 100)) +
          (itemTva - itemTva * (invoiceAppliedDiscount / 100))
      );
    });
  }, [invoiceProducts, invoiceAppliedDiscount]);

  useEffect(() => {
    if (
      productNameId.name &&
      productPrice &&
      productQty &&
      productTva &&
      productUm
    ) {
      setAllProductFieldsFilled(true);
    } else {
      setAllProductFieldsFilled(false);
    }
  }, [productNameId.name, productPrice, productQty, productTva, productUm]);

  return (
    <>
      {/* START MODALS */}
      {isOpenClientModal && (
        <CompanyClientModal
          setIsOpenClientModal={setIsOpenClientModal}
          setSelectedClient={setSelectedClient}
          setDbCompanyClientsState={setDbCompanyClientsState}
        />
      )}
      {isOpenSeriesModal && (
        <InvoiceSeriesModal
          setIsOpenSeriesModal={setIsOpenSeriesModal}
          setDbInvoiceSeriesState={setDbInvoiceSeriesState}
          setSelectedInvoiceSerie={setSelectedInvoiceSerie}
          setSelectedInvoiceNumber={setSelectedInvoiceNumber}
        />
      )}
      {/* END MODALS */}

      <form className="invoice-form section-narrow">
        <div className="organize-box">
          <div className="box bg-2">
            {/* CLIENT */}
            <label>
              Selecteaza client{!selectedClient?.id && "*"}
              <select
                required
                onChange={(e) => handleSelectedClient(e.target.value)}
                value={selectedClient?.id}
              >
                <option value={undefined}>Adauga client</option>
                {dbCompanyClientsState.length > 0 &&
                  dbCompanyClientsState.map((item) => (
                    <option key={item.id as Key} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
            <button
              type="button"
              className="btn-violet"
              onClick={() => setIsOpenClientModal(true)}
            >
              Adauga client nou
            </button>
            {selectedClient && (
              <ul className="selected-option-data">
                <li>
                  <b>Client:</b> {selectedClient.name}
                </li>
                <li>
                  <b>CUI:</b> {selectedClient.cui}
                </li>
                <li>
                  <b>Adresa:</b> {selectedClient.address}
                </li>
              </ul>
            )}
          </div>

          <div className="box bg-1">
            {/* SERIES */}
            <label>
              Serie{!selectedInvoiceSerie?.id && "*"}
              <select
                required
                onChange={(e) => handleSelectedSerie(e.target.value)}
                value={selectedInvoiceSerie?.id}
              >
                <option value={undefined}>Adauga serie</option>
                {dbInvoiceSeriesState.length > 0 &&
                  dbInvoiceSeriesState.map((item: any) => (
                    <option key={item.id as Key} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>

            {/* SERIES NUMBER */}
            <label>
              Numar{!selectedInvoiceNumber && "*"}
              <input
                type="number"
                required
                min={selectedInvoiceSerie?.lastNumber}
                value={selectedInvoiceNumber}
                onChange={(e) =>
                  setSelectedInvoiceNumber(Number(e.target.value))
                }
              />
            </label>
            <button
              type="button"
              className="btn-violet"
              onClick={() => setIsOpenSeriesModal(true)}
            >
              Adauga o serie noua
            </button>

            <label>
              Moneda{!currency && "*"}
              <select
                required
                onChange={(e) => setCurrency(e.target.value)}
                value={currency}
              >
                <option value="RON">RON</option>
                <option value="EUR">EUR</option>
              </select>
            </label>

            {/* DATE */}
            <label>
              Data emiterii{!date && "*"}
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </label>

            {/* DEADLINE */}
            <label>
              Termen de plata
              <input
                type="date"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="container-products">
          {/* PRODUCTS INPUT */}
          <div className="box bg-3" id="product-name-box">
            {/* PRODUCT NAME */}
            <label>
              Denumire produs{!productNameId.name && "*"}
              <input
                type="text"
                value={productNameId.name}
                required
                onChange={(e) => handleTypedProduct(e.target.value)}
                onFocus={() => setIsProductModal(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsProductModal(false);
                  }, 200)
                }
              />
            </label>
            {isProductModal && dbProducts.length > 0 && (
              <ProductModal
                setProductNameId={setProductNameId}
                setIsProductModal={setIsProductModal}
                setProductUm={setProductUm}
                dbProductsState={dbProductsState}
              />
            )}

            {/* UM */}
            <label>
              UM{!productUm && "*"}
              <input
                type="text"
                value={productUm}
                required
                onChange={(e) => setProductUm(e.target.value)}
              />
            </label>

            {/* Quantity */}
            <label>
              Cantitate{!productQty && "*"}
              <input
                type="number"
                required
                value={productQty}
                onChange={(e) => setProductQty(Number(e.target.value))}
              />
            </label>

            {/* PRICE */}
            <label>
              Pret{!productPrice && "*"}
              <input
                type="number"
                required
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </label>

            {/* TVA */}
            <label>
              TVA{!productTva && "*"}
              <select
                required
                value={productTva}
                onChange={(e) => setProductTva(Number(e.target.value))}
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="9">9%</option>
                <option value="19">19%</option>
              </select>
            </label>

            <button
              type="button"
              className="btn-yellow"
              onClick={handleAddInvoiceProduct}
              disabled={!allProductFieldsFilled}
            >
              {!allProductFieldsFilled && "Completeaza &"} Adauga la factura
            </button>
          </div>

          {/* PRODUCTS DISPLAY */}
          <table>
            <thead>
              <tr className="desk-row">
                <th>Nr.crt.</th>
                <th>Denumire</th>
                <th>Cant.</th>
                <th>UM</th>
                <th>Pret</th>
                <th>TVA</th>
                <th>Valoare</th>
                <th></th>
              </tr>
              <tr className="mobile-row">
                <th>Produse/Servicii</th>
              </tr>
            </thead>
            <tbody>
              {invoiceProducts.length > 0 &&
                invoiceProducts.map((item, idx) => (
                  <tr key={item.id + idx}>
                    <td className="idx">{idx + 1}</td>
                    <td className="name">{item.name}</td>
                    <td className="qty">{item.quantity}</td>
                    <td className="um">{item.um}</td>
                    <td className="price">
                      {item.price} <span className="info"> RON</span>
                    </td>
                    <td className="tva">
                      {item.tva}%<span className="info"> TVA</span>
                    </td>
                    <td className="value">{item.totalValue}</td>
                    <td className="action">
                      <button type="button">
                        <UpdateSvg color="blue" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteInvoiceItem(item.id)}
                      >
                        <DeleteSvg color="red" />
                      </button>
                    </td>
                  </tr>
                ))}

              <tr className="subtotal">
                <td>SUBTOTAL</td>
                <td>{invoiceSubtotal}</td>
              </tr>
              <tr className="totaltva">
                <td>TVA</td>
                <td>{invoiceTvaValue}</td>
              </tr>
              <tr className="discount">
                <td>DISCOUNT</td>
                <td>{invoiceAppliedDiscount}</td>
              </tr>
              <tr className="total">
                <td>TOTAL</td>
                <td>{invoiceTotal}</td>
              </tr>
            </tbody>
          </table>

          <div className="discount-box">
            <input
              className={
                invoiceDiscount < 0 || invoiceDiscount > 100
                  ? "input-error"
                  : ""
              }
              type="number"
              min="0"
              max={100}
              value={invoiceDiscount}
              onChange={(e) => setInvoiceDiscount(Number(e.target.value))}
            />
            <button
              type="button"
              className="btn-empty"
              onClick={handleInvoiceDiscount}
            >
              Aplica discount %
            </button>
          </div>
        </div>

        <div className="organize-box">
          <div className="box bg-4">
            <label>
              Intocmit de
              <input
                type="text"
                value={issuedByName}
                onChange={(e) => setIssuedByName(e.target.value)}
              />
            </label>
            <label>
              CNP
              <input
                type="text"
                value={issuedByCnp}
                onChange={(e) => setIssuedByCnp(e.target.value)}
              />
            </label>
            <label>
              Aviz insotire
              <input
                type="text"
                value={accompanyNotice}
                onChange={(e) => setAccompanyNotice(e.target.value)}
              />
            </label>
          </div>

          <div className="box bg-5">
            <label>
              Delegat
              <input
                type="text"
                value={delegateName}
                onChange={(e) => setDelegateName(e.target.value)}
              />
            </label>
            <label>
              Buletin
              <input
                type="text"
                value={delegateCnp}
                onChange={(e) => setDelegateCnp(e.target.value)}
              />
            </label>
            <label>
              Auto
              <input
                type="text"
                value={delegateAuto}
                onChange={(e) => setDelegateAuto(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="organize-box">
          <div className="box">
            <label className="textarea-label">
              Termeni & Conditii
              <textarea
                cols={30}
                rows={5}
                value={termsValue}
                onChange={(e) => setTermsValue(e.target.value)}
              ></textarea>
              {terms && (
                <ul>
                  {terms.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="btn-empty"
                onClick={() => handleTermsRemarks("terms", termsValue)}
              >
                Adauga
              </button>
            </label>

            <label className="textarea-label">
              Observatii
              <textarea
                cols={30}
                rows={5}
                value={remarksValue}
                onChange={(e) => setRemarksValue(e.target.value)}
              ></textarea>
              {remarks && (
                <ul>
                  {remarks.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="btn-empty"
                onClick={() => handleTermsRemarks("remarks", remarksValue)}
              >
                Adauga
              </button>
            </label>
          </div>

          <button
            type="button"
            className="btn-violet"
            onClick={(e) => handleSubmit(e)}
            disabled={
              invoiceSaveStatus === "error" ||
              invoiceSaveStatus === "success" ||
              invoiceSaveStatus === "loading"
            }
          >
            {invoiceSaveStatus === "error" ? (
              <ErrorSvg color="red" size={15} />
            ) : invoiceSaveStatus === "success" ? (
              <SuccessSvg color="green" size={15} />
            ) : invoiceSaveStatus === "loading" ? (
              <LoadingSvg color="white" size={15} />
            ) : (
              "Salveaza factura"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default InvoiceForm;
