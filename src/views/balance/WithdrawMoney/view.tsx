import { Outlet } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { KeyboardComponent } from "../../../components";
import LogoAndServiceCard from "../../../components/Card/LogoAndServiceCard";
import { numericKeyboard } from "../../../components/Keyboard/typesKeyboars";
import "./style.scss";

const WithdrawMoney = () => {
  return (
    <div className="flex flex-col h-[80vh]">
      <div className="top-up-container  container-with-draw-money ">
        <Outlet />
        <div>
          <LogoAndServiceCard
            title="Снятие средств с карты"
            img={ASSETS.CashMoney}
            className="h-[150px]"
          />
          <div className="flex items-center justify-center mt-[20px]">
            <KeyboardComponent layout={numericKeyboard} numeric />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WithdrawMoney;
