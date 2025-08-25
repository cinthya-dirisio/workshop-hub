import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function PrivateAuthGuard() {
  const user = useSelector((store) => store.user.token);
  return <>{user ? <Outlet /> : <Navigate to={"/auth/login"} />}</>;
}

export default PrivateAuthGuard;
