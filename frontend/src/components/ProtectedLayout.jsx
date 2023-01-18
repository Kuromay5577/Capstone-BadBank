import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Deposit", path: "deposit" },
          { label: "Withdraw", path: "withdraw" },
        ]}
      />
      {outlet}
    </div>
  );
};
