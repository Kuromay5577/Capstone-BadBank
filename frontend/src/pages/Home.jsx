import React from "react";
import Bank from "../components/bank.png";
import MyCard from "../components/card";

export function HomePage() {
  return (
    <MyCard
      bgcolor="primary"
      txtcolor="white"
      header="Welcome to the Bad Bank"
      title="For all your banking needs."
      body={<img src={Bank} className="img-fluid" alt="Responsive" />}
    />
  );
}
