"use client";

import React, { Key, useEffect, useState } from "react";

import CompanyClientModal from "../_modals/CompanyClientModal";
import InvoiceSeriesModal from "../_modals/InvoiceSeriesModal";

import {
  CompanyClientType,
  InvoiceProductType,
  InvoiceSeriesType,
  ProductType,
} from "@/types/prismaSchemaTypes";

import "./InvoiceForm.scss";
import ProductModal from "../_modals/ProductModal";
import UpdateSvg from "@/components/svg/UpdateSvg";
import DeleteSvg from "@/components/svg/DeleteSvg";

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
  // Modals
  const [isOpenClientModal, setIsOpenClientModal] = useState<boolean>(false);
  const [isOpenSeriesModal, setIsOpenSeriesModal] = useState<boolean>(false);
  const [isProductModal, setIsProductModal] = useState<boolean>(false);

  //Component state
  const [selectedClient, setSelectedClient] = useState<
    CompanyClientType | undefined
  >();
  const [selectedInvoiceSerie, setSelectedInvoiceSerie] = useState<
    InvoiceSeriesType | undefined
  >({ id: "", name: "", startingNumber: 0 });
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<
    number | string
  >("");
  const [date, setDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productUm, setProductUm] = useState<string>("");
  const [productQty, setProductQty] = useState<number | string>("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productTva, setProductTva] = useState<number | string>("");
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductType[]>(
    []
  );
  const [invoiceDiscount, setInvoiceDiscount] = useState<number>(0);
  const [invoiceAppliedDiscount, setInvoiceAppliedDiscount] =
    useState<number>(0);
  const [invoiceTvaValue, setInvoiceTvaValue] = useState<number>(0);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState<number>(0);
  const [invoiceTotal, setInvoiceTotal] = useState<number>(0);
  const [issuedByName, setIssuedByName] = useState<string>("");
  const [issuedByCnp, setIssuedByCnp] = useState<string>("");
  const [accompanyNotice, setAccompanyNotice] = useState<string>("");
  const [delegateName, setDelegateName] = useState<string>("");
  const [delegateCnp, setDelegateCnp] = useState<string>("");
  const [delegateAuto, setDelegateAuto] = useState<string>("");
  const [mentions, setMentions] = useState<string>("");

  // Handlers
  const handleSelectedClient = (clientId: string) => {
    const clientData = dbCompanyClients.filter(
      (item) => item.id === clientId
    )[0];
    setSelectedClient(clientData);
  };

  const handleSelectedSerie = (seriesId: string) => {
    if (seriesId !== "newInvoiceSerie") {
      const invoiceSerieData = dbInvoiceSeries.filter(
        (item) => item.id === seriesId
      )[0];
      setSelectedInvoiceSerie(invoiceSerieData);
    }
  };

  const handleAddInvoiceProduct = () => {
    const totalValueOfAddedProduct =
      Number(productQty) * Number(productPrice) +
      Number(productQty) * Number(productPrice) * (Number(productTva) / 100);

    setInvoiceProducts([
      ...invoiceProducts,
      {
        id: String(Math.random()),
        name: productName,
        um: productUm,
        quantity: Number(productQty),
        price: Number(productPrice),
        tva: Number(productTva),
        totalValue: totalValueOfAddedProduct,
      },
    ]);

    setProductName("");
    setProductUm("");
    setProductPrice("");
    setProductQty("");
    setProductTva("");
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

  // Functions
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
  }, [invoiceProducts,invoiceAppliedDiscount]);

  return (
    <>
      {/* START MODALS */}
      {isOpenClientModal && (
        <CompanyClientModal setIsOpenClientModal={setIsOpenClientModal} />
      )}
      {isOpenSeriesModal && (
        <InvoiceSeriesModal
          setIsOpenSeriesModal={setIsOpenSeriesModal}
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
              Selecteaza client
              <select
                required
                onChange={(e) => handleSelectedClient(e.target.value)}
              >
                <option value={undefined}>Adauga client</option>
                {dbCompanyClients &&
                  dbCompanyClients.map((item) => (
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
              Serie*
              <select
                required
                onChange={(e) => handleSelectedSerie(e.target.value)}
                value={selectedInvoiceSerie?.id}
              >
                <option value={undefined}>Adauga serie</option>
                {selectedInvoiceSerie?.id === "newInvoiceSerie" && (
                  <option value={selectedInvoiceSerie.id}>
                    {selectedInvoiceSerie.name}
                  </option>
                )}
                {dbInvoiceSeries &&
                  dbInvoiceSeries.map((item: any) => (
                    <option key={item.id as Key} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>

            {/* SERIES NUMBER */}
            <label>
              Numar*
              <input
                type="number"
                required
                min={
                  selectedInvoiceSerie?.id === "newInvoiceSerie"
                    ? Number(selectedInvoiceSerie.startingNumber)
                    : 0
                }
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

            {/* DATE */}
            <label>
              Data emiterii*
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
              Denumire produs*
              <input
                type="text"
                value={productName}
                required
                onChange={(e) => setProductName(e.target.value)}
                onFocus={() => setIsProductModal(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsProductModal(false);
                  }, 200)
                }
              />
            </label>
            {isProductModal && (
              <ProductModal
                setProductName={setProductName}
                setIsProductModal={setIsProductModal}
                setProductUm={setProductUm}
                dbProducts={dbProducts}
              />
            )}

            {/* UM */}
            <label>
              UM*
              <input
                type="text"
                value={productUm}
                required
                onChange={(e) => setProductUm(e.target.value)}
              />
            </label>

            {/* Quantity */}
            <label>
              Cantitate*
              <input
                type="number"
                required
                value={productQty}
                onChange={(e) => setProductQty(Number(e.target.value))}
              />
            </label>

            {/* PRICE */}
            <label>
              Pret*
              <input
                type="number"
                required
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
              />
            </label>

            {/* TVA */}
            <label>
              TVA*
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
            >
              Adauga la factura
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
                  <tr key={item.id}>
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
                        <UpdateSvg color="blue"/>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteInvoiceItem(item.id)}
                      >
                        <DeleteSvg color="red"/>
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
            <label className="textarea">
              Mentiuni
              <textarea
                cols={30}
                rows={10}
                value={mentions}
                onChange={(e) => setMentions(e.target.value)}
              ></textarea>
            </label>
          </div>
          <button type="button" className="btn-violet">
            Salveaza factura
          </button>
        </div>
      </form>
    </>
  );
};

export default InvoiceForm;
