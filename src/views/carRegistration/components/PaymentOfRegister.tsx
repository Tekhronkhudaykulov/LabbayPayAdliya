import { Outlet } from "react-router-dom";
import PaymentOfRegisterSideBar from "./PaymentOfRegisterSideBar";

const PaymentOfRegister = () => {
  return (
    <div>
      <PaymentOfRegisterSideBar />
      <Outlet />
    </div>
  );
};
export default PaymentOfRegister;
