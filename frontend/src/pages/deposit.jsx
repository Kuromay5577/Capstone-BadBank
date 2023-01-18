import React from "react";
import MyCard from "../components/card";
import { useAuth } from "../hooks/useAuth";
function Deposit() {
  const [show] = React.useState(true);
  const [status] = React.useState("");
  const [deposit, setDeposit] = React.useState(0);
  const { user, updateUser } = useAuth();

  const setUserDeposit = () => {
    updateUser({ ...user, balance: user.balance + deposit });
  };

  return (
    <MyCard
      header=<h4>{user.name}'s account</h4>
      status={status}
      body={
        show ? (
          <>
            <h5>Balance ${user.balance}</h5>
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
