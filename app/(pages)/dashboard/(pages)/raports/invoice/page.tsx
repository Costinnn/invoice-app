import React from "react";
import InvoicesDisplay from "./_components/InvoicesDisplay";

const page = async () => {
  return (
    <section className="dash-page">
      FACTURI EMISE
      <InvoicesDisplay />
    </section>
  );
};

export default page;
