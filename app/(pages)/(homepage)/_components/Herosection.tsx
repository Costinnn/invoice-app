import React from "react";
import Image from "next/image";

import heroImg from "@/public/images/sh-herosection.png";

import "./Herosection.scss";
import TimeSvg from "@/components/svg/TimeSvg";
import PeopleSvg from "@/components/svg/PeopleSvg";
import InvoiceSvg from "@/components/svg/InvoiceSvg";
import MoneySvg from "@/components/svg/MoneySvg";

const Herosection = () => {
  return (
    <section className="section-narrow sh-herosection">
      <div className="row1">
        <div className="text">
          <h1>Cel mai folosit program de facturare</h1>
          <p>
            Rezolvi tot ce tine de emiterea, livrarea, incasarea de facturi
            online si trimiterea prin e-Factura. Ai avize, proforme, chitante,
            precum si gestiunea stocurilor, nir, fise, bonuri si rapoarte
            online.
          </p>

          <div className="quote">
            <p>
              <i>
                e-Factura e incredbil de USOR de folosit. Trimiti facturile in
                SPV usor si rapid. Dureaza o secunda maxim.
              </i>
            </p>
            <span>Mircea Popescu www.ronev.ro</span>
          </div>
          <button type="button" className="btn-yellow">
            Vezi avantaje
          </button>
        </div>

        <div className="img-box">
          <Image src={heroImg} alt="" fill sizes="" />
        </div>
      </div>
      <div className="row2">
        <div className="box">
          <TimeSvg color="#c4c1c0" size={50} />
          <span>9</span>
          <span>ANI EXPERIENTA</span>
        </div>

        <div className="box">
          <PeopleSvg color="#c4c1c0" size={50} />
          <span>17.500</span>
          <span>CLIENTI FERICITI</span>
        </div>

        <div className="box">
          <InvoiceSvg color="#c4c1c0" size={50} />
          <span>675.000</span>
          <span>FACTURI LUNARE</span>
        </div>

        <div className="box">
          <MoneySvg color="#c4c1c0" size={50} />
          <span>12.050.000</span>
          <span>EURO FACTURATI LUNAR</span>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
