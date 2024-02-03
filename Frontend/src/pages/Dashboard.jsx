import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar } from "../comp/DashSidebar";
import { DashProfile } from "../comp/DashProfile";
import { DashPosts } from "../comp/DashPosts";

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
    </div>
  );
}
