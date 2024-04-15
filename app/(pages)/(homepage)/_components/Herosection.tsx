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
          <h1>The most used invoicing program</h1>
          <p>
            Solve everything related to the issuance, delivery, collection of
            invoices online and sending via e-Invoice. You have notices,
            proformas, receipts, as well as the management of stocks, nir,
            sheets, vouchers and reports online.
          </p>

          <div className="quote">
            <p>
              <i>
                e-Invoice is incredibly EASY to use. Send the invoices in Easy
                and fast SPV. It lasts a maximum of one second.
              </i>
            </p>
            <span>Mircea Popescu www.ronev.ro</span>
          </div>
          <button type="button" className="btn-yellow">
            See advantages
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
          <span>YEARS EXPERIENCE</span>
        </div>

        <div className="box">
          <PeopleSvg color="#c4c1c0" size={50} />
          <span>17.500</span>
          <span>HAPPY CUSTOMERS</span>
        </div>

        <div className="box">
          <InvoiceSvg color="#c4c1c0" size={50} />
          <span>675.000</span>
          <span>MONTHLY INVOICES</span>
        </div>

        <div className="box">
          <MoneySvg color="#c4c1c0" size={50} />
          <span>12.050.000</span>
          <span>EURO ISSUED MONTHLY</span>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
