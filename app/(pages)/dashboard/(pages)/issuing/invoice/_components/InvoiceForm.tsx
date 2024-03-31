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
    setInvoiceProducts([
      ...invoiceProducts,
      {
        id: String(Math.random()),
        name: productName,
        um: productUm,
        quantity: Number(productQty),
        price: Number(productPrice),
        tva: Number(productTva),
        totalValue:
          Number(productQty) * Number(productPrice) +
          (Number(productTva) / 100) *
            (Number(productPrice) * Number(productQty)),
      },
    ]);
    setProductName("");
    setProductUm("");
    setProductPrice("");
    setProductQty("");
    setProductTva("");
  };

  // Functions

  useEffect(() => {}, []);

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
              {invoiceProducts.map((item, idx) => (
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
                  <td className="action">action</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn-empty">
            Aplica discount %
          </button>
        </div>

        <div className="organize-box">
          <div className="box bg-4">
            <label>
              Intocmit de
              <input type="text" />
            </label>
            <label>
              CNP
              <input type="text" />
            </label>
            <label>
              Aviz insotire
              <input type="text" />
            </label>
          </div>
          <div className="box bg-5">
            <label>
              Delegat
              <input type="text" />
            </label>
            <label>
              Buletin
              <input type="text" />
            </label>
            <label>
              Auto
              <input type="text" />
            </label>
          </div>
        </div>

        <div className="organize-box">
          <div className="box">
            <label className="textarea">
              Mentiuni
              <textarea cols={30} rows={10}></textarea>
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
