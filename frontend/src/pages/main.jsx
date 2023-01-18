import React from "react";
//import AppBar from "../components/AppBar.jsx";
import Bank from "../components/bank.png";
import MyCard from "../components/card.jsx";
import { useAuth } from "../hooks/useAuth";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <MyCard
      bgcolor="primary"
      txtcolor="white"
      header=<h4>{user.name}'s account</h4>
      title="Bad Bank Personal Account"
      body={<img src={Bank} className="img-fluid" alt="Responsive" />}
    />
  );
}
