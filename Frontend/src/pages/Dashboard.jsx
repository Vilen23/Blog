import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DashSidebar } from "./DashSidebar";
import { DashProfile } from "./DashProfile";

export function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-56">
        
          {/*Sidebar*/}
          <DashSidebar />
        
      </div>
        {/*DashProfile*/}
        {tab === "profile" && <DashProfile />}
    </div>
  );
}
