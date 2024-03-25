"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";

import close from "@/public/icons/close.png";

import "./ModalStyles.scss";

type SeriesModalType = {
  setIsOpenSeriesModal: Function;
  setSelectedInvoiceSerie: Function;
  setSelectedInvoiceNumber: Function;
};

const InvoiceSeriesModal = ({
  setIsOpenSeriesModal,
  setSelectedInvoiceSerie,
  setSelectedInvoiceNumber,
}: SeriesModalType) => {
  const [name, setName] = useState<string>("");
  const [startingNumber, setStartingNumber] = useState<string | number>("");

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (name && Number(startingNumber) > 0) {
      setSelectedInvoiceSerie({
        id: "newInvoiceSerie",
        name,
        startingNumber: Number(startingNumber),
      });
      setSelectedInvoiceNumber(Number(startingNumber));
      setIsOpenSeriesModal(false);
    }
  };

  return (
    <div className="bg-modal">
      <div className="modal">
        <Image
          src={close}
          alt="close"
          width={25}
          className="close-btn"
          onClick={() => {
            setIsOpenSeriesModal(false);
          }}
        />
        <h3>Adauga o serie noua</h3>
        <form>
          <label>
            Serie*
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Primul numar*
            <input
              type="number"
              value={startingNumber || ""}
              onChange={(e) => setStartingNumber(e.target.value)}
              required
            />
          </label>

          <button
            type="button"
            className="btn-violet"
            onClick={(e) => handleSubmit(e)}
          >
            Adauga
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceSeriesModal;
