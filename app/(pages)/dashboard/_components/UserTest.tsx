"use client";

import React from "react";
import axios from "axios";

const UserTest = () => {
  const newCompany = {
    name: "Fake Company SRL",
    cui: "RO 3421534",
    rc: "J22/2434/4444",
    address: "Iasi, Romania",
    capital: 200,
    iban: "INGB RO43 4444 4444 4444 3333",
    email: "contact@gmail.com",
  };

  const newClientCompany = {
    name: "Fake 2 Client 2 SRL",
    cui: "RO 34fafafa",
    rc: "J22/2434/0000",
    address: "Iasi, Romania",
    iban: "INGB RO43 4444 4444 4444 3333",
    email: "contact@gmail.com",
    sellerId: "65fbd41cdccb0b09a7eca9d0",
  };

  const createCompany = async () => {
    try {
      const res = await axios.post("/api/addCompany", newCompany);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const createClientCompany = async () => {
    try {
      const res = await axios.post("/api/addClientCompany", newClientCompany);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Create Schema</h1>
      {/* <button className="btn-violet">Create Company</button>
      <button className="btn-violet" onClick={createClientCompany}>
        Create Client
      </button> */}
    </div>
  );
};

export default UserTest;
