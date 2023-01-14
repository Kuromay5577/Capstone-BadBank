import React from "react";
import MyCard from "../components/card";
import { useAuth } from "../hooks/useAuth";

function Deposit() {
  const [show] = React.useState(true);
  const [status] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const { user, setUser } = useAuth();

  const setUserDeposit = () => {
    let newUser = user;
    newUser[Object.keys(newUser)[0]] =
      newUser[Object.keys(newUser)[0].balance + { deposit }];
    setUser(newUser);
  };

  return (
    <MyCard
      header="Deposit"
      status={status}
      body={
        show ? (
          <>
            Balance
            <br />
            {Object.keys(user).length > 0
              ? user[Object.keys(user)[0]].balance
              : "N/A"}
            <br />
            Deposit
            <br />
            <input
              type="input"
              className="form-control"
              id="deposit"
              placeholder="Enter Deposit"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.currentTarget.value))}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={setUserDeposit}
            >
              Deposit
            </button>
          </>
        ) : (
          <>
            <h5>Success deposit</h5>
          </>
        )
      }
    />
  );
}

export default Deposit;
