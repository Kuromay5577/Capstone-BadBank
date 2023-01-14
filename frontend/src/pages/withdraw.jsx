import React from "react";
import MyCard from "../components/card";
import { useAuth } from "../hooks/useAuth";

function Withdraw() {
  const [show] = React.useState(true);
  const [status] = React.useState("");
  const [withdraw, setWithdraw] = React.useState(0);
  const { user } = useAuth();

  const setUserWithdraw = () => {
    let newUser = user;
    newUser.balance = newUser.balance - withdraw;
  };

  return (
    <MyCard
      bgcolor="blue#7b6767"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <>
            Balance
            <br />
            {user.balance}
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
