import { Navigate, Outlet } from "react-router-dom";
import { currentAtom } from "../State/User/UserState";
import { useRecoilValue } from "recoil";

export function AdminOnlyPrivateRoute() {
  const currentUser = useRecoilValue(currentAtom);
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to={"/signin"} />
}
