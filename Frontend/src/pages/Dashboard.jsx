import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar } from "../comp/DashSidebar";
import { DashProfile } from "../comp/DashProfile";
import { DashPosts } from "../comp/DashPosts";
import { CreatePost } from "./CreatePost";
import { UpdatePost } from "./UpdatePost";
import { DashUsers } from "../comp/DashUsers";
import { DashComments } from "../comp/DashComments";
import { DashboardComp } from "../comp/DashboardComp";

export function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-56">
        {/*Sidebar*/}
        <DashSidebar />
      </div>
      {/*DashProfile*/}
      {tab === "profile" && <DashProfile />}
      {tab === "posts" && <DashPosts />}
      {tab === "create-post" && <CreatePost />}
      {tab === "users" && <DashUsers />}
      {tab === "comments" && <DashComments/>}
      {tab === "dashboard" && <DashboardComp/>}
    </div>
  );
}
