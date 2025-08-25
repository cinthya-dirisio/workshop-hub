import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Workshops from "./views/Workshops/Workshops";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Workshop from "./views/Workshop/Workshop";
import MainLayout from "./layout/MainLayout";
import UserProfile from "./views/Profile/UserProfile";
import { useEffect } from "react";
import authQueries from "./services/authQueries";
import { useDispatch } from "react-redux";
import userActions from "./redux/actions/userActions";
import NotAvailable from "./components/NotAvailable";
import { enqueueSnackbar } from "notistack";
import PrivateAuthGuard from "./guard/PrivateAuthGuard";
import NoUserRoutes from "./guard/NoUserRoutes";
import Instructor from "./views/Instructor/Instructor";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      authQueries
        .loginToken(token)
        .then((response) => {
          dispatch(userActions.login(response));
          enqueueSnackbar(`Bienvenidx ${response.data.firstName}`, {
            variant: "success",
          });
        })
        .catch((error) => {
          console.log(error)
          enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
        });
    }
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/workshops"} element={<Workshops />} />
            <Route path={"/workshops/:id"} element={<Workshop />} />
            <Route path="/auth" element={<NoUserRoutes />}>
              <Route path={"/auth/register"} element={<Register />} />
              <Route path={"/auth/login"} element={<Login />} />
            </Route>
            <Route path="/private" element={<PrivateAuthGuard />}>
              <Route path={"/private/profile/:id"} element={<UserProfile />} />
              <Route path={"/private/instructor"} element={<Instructor />} />
            </Route>
            <Route path="*" element={<NotAvailable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
