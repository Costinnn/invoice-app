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
      <h2>Cum te ajuta Billz</h2>
      <div className="content">
        <div className="box">
          <RoboArmSvg color="#fbb03a" size={40} />
          <div>
            <h3>Castigi mult timp. Si scapi de greseli.</h3>
            <p>
              Te vei indragosti de “magia” Billz pe care o descoperi inca de la
              crearea contului.
            </p>
          </div>
        </div>

        <div className="box">
          <FolderSvg color="#fbb03a" size={40} />
          <div>
            <h3>
              Rezolvi tot ce tine de facturare online, gestiunea stocurilor si
              contabilitate.
            </h3>
            <p>
              Facturi, chitante, stocuri, nir, cheltuieli, avize, proforme. In
              plus, documentele pot ajunge simplu si rapid in programul de
              contabilitate.
            </p>
          </div>
        </div>

        <div className="box">
          <AnywhereSvg color="#fbb03a" size={40} />
          <div>
            <h3>
              Ai acces oricand, de oriunde. Fara nimic instalat. Direct online.
            </h3>
            <p>
              Aceasta este puterea internetului. Poate initial nu ti se va parea
              crucial, dar dupa ce te obisnuiesti nu vei mai privi in urma.
            </p>
          </div>
        </div>

        <div className="box">
          <EasySvg color="#fbb03a" size={40} />
          <div>
            <h3>
              Este un program de facturare mai usor de utilizat decat orice alta
              alternativa.
            </h3>
            <p>
              Chiar si decat facturi tipizate sau Excel. Te ghideaza pas cu pas
              si face aproape totul pentru tine.
            </p>
          </div>
        </div>

        <div className="box">
          <SafetySvg color="#fbb03a" size={40} />
          <div>
            <h3>Siguranta totala si garantie.</h3>
            <p>
              Investim mult in infrastructura, siguranta si audituri. Datele
              tale sunt de sute de ori mai in siguranta cu noi decat in propriul
              PC.
            </p>
          </div>
        </div>

        <div className="box">
          <SupportSvg color="#fbb03a" size={40} />
          <div>
            <h3>Actualizari si suport incluse.</h3>
            <p>
              Esti actualizat legal la zi. Intotdeauna. Avem 18 colegi in
              departamentul de Customer Care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
