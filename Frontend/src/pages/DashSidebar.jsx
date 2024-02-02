import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentAtom, errorAtom, loadingAtom } from "../State/User/UserState";

export function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [error, setError] = useRecoilState(errorAtom)
  const [loading, setLoading] = useRecoilState(loadingAtom)
  const [currentUser, setcurrentUser] = useRecoilState(currentAtom)



  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);
  //Signout
  const HandleSignOut = async (e) => {
    try {
      setcurrentUser({});
      navigate("/signin");
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            onClick={() => {
              navigate("/dashboard?tab=profile");
            }}
          >
            Profile
          </Sidebar.Item>
          <div className="cursor-pointer" onClick={HandleSignOut}>
            <Sidebar.Item icon={HiArrowSmRight}>Sign out</Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
