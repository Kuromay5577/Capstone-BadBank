import React from "react";
import MyCard from "../components/card";
import { useAuth } from "../hooks/useAuth";

function Withdraw() {
  const [show] = React.useState(true);
  const [status] = React.useState("");
  const [withdraw, setWithdraw] = React.useState(0);
  const { user, updateUser } = useAuth();

  const setUserWithdraw = () => {
    updateUser({ ...user, balance: user.balance - withdraw });
  };

  return (
    <MyCard
      bgcolor="blue#7b6767"
      header=<h4>{user.name}'s account</h4>
      status={status}
      body={
        show ? (
          <>
            <h5>Balance ${user.balance}</h5>
            <br />
            Withdraw
            <br />
            <input
              type="input"
              className="form-control"
              id="withdraw"
              placeholder="Enter Withdraw"
              value={withdraw}
              onChange={(e) => setWithdraw(Number(e.currentTarget.value))}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={setUserWithdraw}
            >
              Withdraw
            </button>
          </>
        ) : null
      }
    />
  );
}

export default Withdraw;
