import { useAppSelectore } from "@/App/store";
import { Navigate, Outlet } from "react-router-dom";

const ClientProtectRoute = () => {
  const { Client } = useAppSelectore((state) => state.client);
  return Client ? <Outlet /> : <Navigate to={"/"} />;
};

export default ClientProtectRoute;
