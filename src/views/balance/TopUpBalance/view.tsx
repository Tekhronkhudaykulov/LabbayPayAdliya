import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, KeyboardComponent, Text } from "../../../components";
import LogoAndServiceCard from "../../../components/Card/LogoAndServiceCard";
import { PhoneInput, SmsInput, TextFild } from "../../../components/Input/view";
import { numericKeyboard } from "../../../components/Keyboard/typesKeyboars";
import "./style.scss";
import { APP_ROUTES } from "../../../router";

const TopUpBalance = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-[80vh]">
      <div className="top-up-container">
        <div className=" grid gap-y-[10px]">
          <div className="bg-[#F4F4F4] grid gap-y-[10px]  py-[20px] px-[15px] rounded-[36px]">
            <Text
              text="Введите номер карты UZCARD/HUMO (16-цифр)"
              className="text-[25px] font-[500]"
            />
            <div>
              <SmsInput
                className="h-[90px]"
                placeHolder="_ _ _ _"
                changeMask="9 9 9 9 "
              />
            </div>
          </div>
          <div className="bg-[#F4F4F4] grid gap-y-[10px]  py-[20px] px-[15px] rounded-[36px]">
            <Text
              text="Введите номер телефона"
              className="text-[25px] font-[500]"
            />
            <div>
              <PhoneInput className="!outline-none h-[90px]" />
            </div>
          </div>
          <div className="bg-[#F4F4F4] grid gap-y-[10px]  py-[20px] px-[15px] rounded-[36px]">
            <Text
              text="Введите сумму пополнения"
              className="text-[25px] font-[500]"
            />
            <div>
              <TextFild
                onchange={() => console.log()}
                className="!h-[90px]"
                placeHolder="0 UZS"
              />
            </div>
          </div>
        </div>
        <div>
          <LogoAndServiceCard
            title="Пополнение по номеру карты"
            img={ASSETS.UzAndHumo}
            className="h-[150px]"
          />
          <div className="flex items-center justify-center mt-[20px]">
            <KeyboardComponent layout={numericKeyboard} numeric />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <FooterNav
          prevClick={() => navigate(-1)}
          nextClick={() => navigate(APP_ROUTES.TOPUPBALANCEINFO)}
        />
      </div>
    </div>
  );
};
export default TopUpBalance;
