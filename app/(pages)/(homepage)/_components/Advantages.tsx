import React from "react";

import "./Advantages.scss";

import RoboArmSvg from "@/components/svg/RoboArmSvg";
import FolderSvg from "@/components/svg/FolderSvg";
import AnywhereSvg from "@/components/svg/AnywhereSvg";
import EasySvg from "@/components/svg/EasySvg";
import SafetySvg from "@/components/svg/SafetySvg";
import SupportSvg from "@/components/svg/SupportSvg";

const Advantages = () => {
  return (
    <section className="section-narrow sh-advantages">
      <h2>How can Billz help you</h2>
      <div className="content">
        <div className="box">
          <RoboArmSvg color="#fbb03a" size={40} />
          <div>
            <h3>Save a lot of time. And you get rid of mistakes.</h3>
            <p>
              You will fall in love with the Billz &apos;magic&apos; that you
              discover right from the start account creation.
            </p>
          </div>
        </div>

        <div className="box">
          <FolderSvg color="#fbb03a" size={40} />
          <div>
            <h3>
              Solve everything related to online invoicing, stock management and
              accounting.
            </h3>
            <p>
              Invoices, receipts, stocks, invoices, expenses, notices,
              proformas. In the plus, the documents can arrive simply and
              quickly in the program accounting.
            </p>
          </div>
        </div>

        <div className="box">
          <AnywhereSvg color="#fbb03a" size={40} />
          <div>
            <h3>
              You have access anytime, anywhere. Without anything installed.
              Direct online.
            </h3>
            <p>
              This is the power of the internet. Maybe at first you won&apos;t
              think so crucial, but once you get used to it, you won&apos;t look
              back.
            </p>
          </div>
        </div>

        <div className="box">
          <EasySvg color="#fbb03a" size={40} />
          <div>
            <h3>
              It is an invoicing program that is easier to use than any other
              alternative.
            </h3>
            <p>
              Even than typed invoices or Excel. It guides you step by step and
              does almost everything for you.
            </p>
          </div>
        </div>

        <div className="box">
          <SafetySvg color="#fbb03a" size={40} />
          <div>
            <h3>Total safety and guarantee.</h3>
            <p>
              We invest a lot in infrastructure, security and audits. data yours
              are hundreds of times safer with us than in your own pc.
            </p>
          </div>
        </div>

        <div className="box">
          <SupportSvg color="#fbb03a" size={40} />
          <div>
            <h3>Updates and support included.</h3>
            <p>
              You are legally up to date. Always. We have 18 colleagues in the
              Customer Care department.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
