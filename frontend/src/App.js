import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import CreateAccount from "./pages/Register";
import { HomePage } from "./pages/Home";
// import { Main } from "./pages/Home";
import Deposit from "./pages/deposit";
import Withdraw from "./pages/withdraw";
//import AllData from "./pages/alldata";
//import LogOut from "./pages/logout";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import "./style.css";
import { AuthLayout } from "./components/AuthLayout.jsx";
import { Dashboard } from "./pages/main";
import Parse from "parse/dist/parse.min.js";

// import AllData from "./pages/alldata";

// ideally this would be an API call to server to get logged in user data

Parse.initialize(
  "JZlk1zJsl0Go1oCSz5ibw86OlhpTeN8rGZ7dUZSQ",
  "H5KLDrursM13MvGCDuKvUpBXUHpkdIkiufhYpw31"
); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = "https://parseapi.back4app.com/";
const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

// for error
// const getUserData = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       reject("Error");
//     }, 3000)
//   );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<CreateAccount />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="main" element={<Dashboard />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="withdraw" element={<Withdraw />} />
      </Route>
    </Route>
  )
);
