import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { currentAtom, errorAtom, loadingAtom } from "../State/User/UserState";
import { FaUsers } from "react-icons/fa";

export function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [error, setError] = useRecoilState(errorAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [currentUser, setcurrentUser] = useRecoilState(currentAtom);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  //Signout
  const HandleSignOut = async (e) => {
    try {
      setcurrentUser({});
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
            label={currentUser.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            onClick={() => {
              navigate("/dashboard?tab=profile");
            }}
            className="cursor-pointer"
          >
            Profile
          </Sidebar.Item>
          {currentUser.isAdmin && (
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              onClick={() => {
                navigate("/dashboard?tab=posts");
              }}
              className="cursor-pointer"
            >
              Posts
            </Sidebar.Item>
          )}
          {currentUser.isAdmin && (
            <Sidebar.Item
              active={tab === "users"}
              onClick={() => {
                navigate("/dashboard?tab=users");
              }}
              icon={FaUsers}
              className="cursor-pointer"
            >
              Users
            </Sidebar.Item>
          )}
          <div className="cursor-pointer" onClick={HandleSignOut}>
            <Sidebar.Item icon={HiArrowSmRight}>Sign out</Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
