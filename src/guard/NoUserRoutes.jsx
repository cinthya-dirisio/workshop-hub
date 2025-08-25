import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
function NoUserRoutes() {
  const user = useSelector((store) => store.user.token);
  return <>{!user ? <Outlet /> : <Navigate to={"/"} />}</>;
}
export default NoUserRoutes;