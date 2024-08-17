import { useAppSelectore } from "@/App/store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  const { Client } = useAppSelectore((state) => state.client);

  return CurrentCivilUser || Client ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default ProtectRoute;
