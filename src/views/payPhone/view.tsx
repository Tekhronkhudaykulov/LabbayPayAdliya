import { Outlet } from "react-router-dom";
import { Sidebar } from "./components";

const PayPhone = () => {
  return (
    <div className="flex flex-col h-full">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default PayPhone;
