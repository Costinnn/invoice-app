"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import axios from "axios";

import close from "@/public/icons/close.png";

import "./ModalStyles.scss";
import { CompanyClientType } from "@/types/prismaSchemaTypes";

type ClientModalType = {
  setIsOpenClientModal: Function;
  setDbCompanyClientsState: Function;
  setSelectedClient: Function;
};

const CompanyClientModal = ({
  setIsOpenClientModal,
  setDbCompanyClientsState,
  setSelectedClient,
}: ClientModalType) => {
  const [newClientName, setNewClientName] = useState<string>("");
  const [newClientCui, setNewClientCui] = useState<string>("");
  const [newClientAddress, setNewClientAddress] = useState<string>("");
  const [newClientRc, setNewClientRc] = useState<string>("");
  const [newClientIban, setNewClientIban] = useState<string>("");
  const [newClientEmail, setNewClientEmail] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newClient = {
      name: newClientName,
      cui: newClientCui,
      address: newClientAddress,
      rc: newClientRc,
      iban: newClientIban,
      email: newClientEmail,
    };

    try {
      const res = await axios.post("/api/addCompanyClient", newClient);

      if (res.status === 201) {
        const newDbClient = {
          id: res.data.dbData.id,
          name: res.data.dbData.name,
          cui: res.data.dbData.cui,
          rc: res.data.dbData.rc,
          address: res.data.dbData.address,
          iban: res.data.dbData.iban,
          email: res.data.dbData.email,
          sellerId: res.data.dbData.sellerId,
        };

        setDbCompanyClientsState((prev: CompanyClientType[]) => [
          ...prev,
          newDbClient,
        ]);
        setSelectedClient(newDbClient);

        setIsOpenClientModal(false);
      } else {
        setFeedback("A intervenit o eroare!");
        setTimeout(() => {
          setFeedback("");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
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
            setIsOpenClientModal(false);
          }}
        />
        <h3>Adauga un client nou</h3>
        <form>
          <label>
            Nume client*
            <input
              type="text"
              value={newClientName}
              required
              onChange={(e) => setNewClientName(e.target.value)}
            />
          </label>
          <label>
            CUI*{" "}
            <input
              type="text"
              value={newClientCui}
              onChange={(e) => setNewClientCui(e.target.value)}
              required
            />
          </label>
          <label>
            Adresa*
            <input
              type="text"
              value={newClientAddress}
              onChange={(e) => setNewClientAddress(e.target.value)}
              required
            />
          </label>
          <label>
            RC{" "}
            <input
              type="text"
              value={newClientRc}
              onChange={(e) => setNewClientRc(e.target.value)}
            />
          </label>
          <label>
            Iban{" "}
            <input
              type="text"
              value={newClientIban}
              onChange={(e) => setNewClientIban(e.target.value)}
            />
          </label>
          <label>
            Email{" "}
            <input
              type="text"
              value={newClientEmail}
              onChange={(e) => setNewClientEmail(e.target.value)}
            />
          </label>
          {feedback && <p className="feedback">{feedback}</p>}
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

export default CompanyClientModal;
