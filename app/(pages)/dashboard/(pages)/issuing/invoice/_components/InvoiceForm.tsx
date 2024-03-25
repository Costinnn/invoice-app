"use client";

import React, { Key, useCallback, useEffect, useState } from "react";

import CompanyClientModal from "../_modals/CompanyClientModal";
import InvoiceSeriesModal from "../_modals/InvoiceSeriesModal";

import {
  CompanyClientType,
  InvoiceSeriesType,
} from "@/types/prismaSchemaTypes";

import "./InvoiceForm.scss";

const todaysDate = new Date().getDate();

const InvoiceForm = ({
  companyClients,
  invoiceSeries,
}: {
  companyClients: [CompanyClientType];
  invoiceSeries: [InvoiceSeriesType];
}) => {
  // Modals
  const [isOpenClientModal, setIsOpenClientModal] = useState<boolean>(false);
  const [isOpenSeriesModal, setIsOpenSeriesModal] = useState<boolean>(false);

  //Component state
  const [selectedClient, setSelectedClient] = useState<
    CompanyClientType | undefined
  >();
  const [selectedInvoiceSerie, setSelectedInvoiceSerie] =
    useState<InvoiceSeriesType>({ id: "", name: "", startingNumber: 0 });
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState<
    number | string
  >("");
  const [date, setDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // Handlers
  const handleSelectedClient = (clientId: string) => {
    const clientData = companyClients.filter((item) => item.id === clientId)[0];
    setSelectedClient(clientData);
  };

  const handleSelectedSerie = (seriesId: string) => {
    if (seriesId !== "newInvoiceSerie") {
      const invoiceSerieData = invoiceSeries.filter(
        (item) => item.id === seriesId
      )[0];
      setSelectedInvoiceSerie(invoiceSerieData);
    }
  };

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
            <label>
              Selecteaza client
              <select
                required
                onChange={(e) => handleSelectedClient(e.target.value)}
              >
                <option value={undefined}>Adauga client</option>
                {companyClients &&
                  companyClients.map((item) => (
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
            <label>
              Serie*
              <select
                required
                onChange={(e) => handleSelectedSerie(e.target.value)}
                value={selectedInvoiceSerie.id}
              >
                <option value={undefined}>Adauga serie</option>
                {selectedInvoiceSerie.id === "newInvoiceSerie" && (
                  <option value={selectedInvoiceSerie.id}>
                    {selectedInvoiceSerie.name}
                  </option>
                )}
                {invoiceSeries &&
                  invoiceSeries.map((item) => (
                    <option key={item.id as Key} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Numar*
              <input
                type="number"
                required
                min={
                  selectedInvoiceSerie.id === "newInvoiceSerie"
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
            <label>
              Data emiterii*
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
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
          <div className="box bg-3">
            <label>
              Denumire produs*
              <input type="text" required />
            </label>
            <label>
              UM*
              <select required>
                <option value="buc">BUC</option>
                <option value="kg">KG</option>
                <option value="ore">ORE</option>
                <option value="lt">LT</option>
              </select>
            </label>
            <label>
              Cantitate*
              <input type="number" required />
            </label>
            <label>
              Pret*
              <input type="number" required />
            </label>
            <label>
              TVA*
              <select required>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="9">9%</option>
                <option value="19">19%</option>
              </select>
            </label>
            <button type="button" className="btn-yellow">
              Adauga
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
              <tr>
                <td className="idx">1</td>
                <td className="name">Servicii consultanta</td>
                <td className="qty">5</td>
                <td className="um">ore</td>
                <td className="price">
                  60 <span className="info"> RON</span>
                </td>
                <td className="tva">
                  0%<span className="info"> TVA</span>
                </td>
                <td className="value">300</td>
                <td className="action">action</td>
              </tr>
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
