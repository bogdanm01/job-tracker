import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-[60px_1fr] h-screen">
      <Header />
      <Sidebar />
      <div className="col-start-2 col-end-2 row-[span] w-full p-6">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
