import { useAppSelectore } from "@/App/store";
import { Navigate, Outlet } from "react-router-dom";

export const CivilProtectRoute = () => {
  const { CurrentCivilUser } = useAppSelectore((state) => state.user);
  return CurrentCivilUser ? <Outlet /> : <Navigate to={"/"} />;
};
