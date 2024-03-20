"use client";

import React from "react";

import "./Invoice.scss";

const Invoice = () => {
  const handleCreate = () => {};

  return (
    <>
      <h1>INVOICE</h1>
      <button onClick={handleCreate} className="btn-violet">
        Create
      </button>

      {/*<section className="invoice" id="print-invoice">
        <div className="row1">
          <div className="box">
            <div>
              <p className="name">FIRM NAME SRL</p>
              <li>RC: J23/2354/2020 CUI: 43354321</li>
              <li>Adresa: Iasi, Romania Capital social: 200 lei</li>
              <li className="bank">ING IBAN: RO44 INGB 0000 9999 1212 3232</li>
              <li className="contact">Contact: adress@gmail.com</li>
            </div>
          </div>
          <div className="box">
            <span>IMAGE</span>
          </div>
        </div>
         <div className="row2">
          <h1>FACTURA</h1>
        </div>
        <div className="row3">
          <div className="box">
            <h2>FACTURAT CATRE</h2>
            <ul>
              <li>
                Client: <span>ANOTHER FIRM SRL</span>
              </li>
              <li>
                CUI: <span>RO 5454544</span>
              </li>
              <li>
                Adresa: <span>Iasi, Romania</span>
              </li>
              <li>
                Contact: <span>address@gmail.com</span>
              </li>
              <li>
                IBAN: <span></span>
              </li>
            </ul>
          </div>
          <div className="box">
            <ul>
              <li>
                Nr. Factura: <span>4</span>
              </li>
              <li>
                Seria: <span>WEB</span>
              </li>
              <li>
                Data: <span>12/03/2020</span>
              </li>
              <li>
                Scadenta: <span>5</span>
              </li>
            </ul>
          </div>
        </div>
        <table className="row4">
          <thead>
            <tr>
              <th>Nr.crt.</th>
              <th>Denumire</th>
              <th>Cant.</th>
              <th>UM</th>
              <th>Pret</th>
              <th>TVA</th>
              <th>Valoare</th>
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
            </tr>
          </tbody>
        </table>
        <div className="row5">
          <div className="box">
            <a href="/">www.firmwebsite.com</a>
          </div>
          <div className="box">
            <ul>
              <li>
                SUBTOTAL <span>1.500</span>
              </li>
              <li>
                Discount <span>500</span>
              </li>
              <li>
                TOTAL DE PLATA <span>1.000</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row6">
          <h3>Termeni si conditii</h3>
          <ul>
            <li>
              Platile se fac in contul bancar afisat, specificand numarul, seria
              si data facturii.
            </li>
            <li>
              Factura valabilă fără semnatură şi ştampilă cf. art.V, alin (2)
              din Ordonanţa nr.17/2015 şi art. 319 alin (29) din Legea nr.
              227/2015 privind Codul fiscal.
            </li>
          </ul>
        </div>
        <div className="row7">
          <h3>Observatii</h3>
          <ul>
            <li>Rest plata 70% conform Oferta nr.1 din 10.10.2023</li>
          </ul>
        </div> 
      </section>*/}
    </>
  );
};

export default Invoice;
