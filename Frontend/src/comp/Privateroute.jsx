import { useRecoilValue } from "recoil"
import { currentAtom } from "../State/User/UserState"
import { Navigate, Outlet } from "react-router-dom"

export function Privateroute(){
    const currentuser = useRecoilValue(currentAtom)
    console.log(currentuser._id);
    return currentuser._id?<Outlet/>: <Navigate to={"/signin"}/>
}