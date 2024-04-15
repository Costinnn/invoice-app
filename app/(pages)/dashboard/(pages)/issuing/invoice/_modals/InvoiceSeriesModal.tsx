"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";

import close from "@/public/icons/close.png";

import { InvoiceSeriesType } from "@/types/prismaSchemaTypes";

import "./ModalStyles.scss";

type SeriesModalType = {
  setIsOpenSeriesModal: Function;
  setDbInvoiceSeriesState: Function;
  setSelectedInvoiceSerie: Function;
  setSelectedInvoiceNumber: Function;
};

const InvoiceSeriesModal = ({
  setIsOpenSeriesModal,
  setDbInvoiceSeriesState,
  setSelectedInvoiceSerie,
  setSelectedInvoiceNumber,
}: SeriesModalType) => {
  const [name, setName] = useState<string>("");
  const [startingNumber, setStartingNumber] = useState<string | number>("");
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (name && Number(startingNumber) > 0) {
      try {
        const res = await axios.post("/api/addInvoiceSeries", {
          name,
          lastNumber: Number(startingNumber) - 1,
        });

        if (res.status === 201) {
          const newDbSeries = {
            id: res.data.dbData.id,
            name: res.data.dbData.name,
            lastNumber: res.data.dbData.lastNumber ,
            numbers: res.data.dbData.numbers,
          };

          setDbInvoiceSeriesState((prev: InvoiceSeriesType[]) => [
            ...prev,
            newDbSeries,
          ]);
          setSelectedInvoiceSerie(newDbSeries);
          setSelectedInvoiceNumber(newDbSeries.lastNumber + 1);

          setIsOpenSeriesModal(false);
        } else {
          setFeedback("A intervenit o eroare!");
          setTimeout(() => {
            setFeedback("");
          }, 5000);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setFeedback("Date eronate");
      setTimeout(() => {
        setFeedback("");
      }, 5000);
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
        <h3>Add new series</h3>
        <form>
          <label>
            Series*
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            First number*
            <input
              type="number"
              value={startingNumber || ""}
              onChange={(e) => setStartingNumber(e.target.value)}
              required
            />
          </label>
          {feedback && <p className="feedback">{feedback}</p>}
          <button
            type="button"
            className="btn-violet"
            onClick={(e) => handleSubmit(e)}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceSeriesModal;
