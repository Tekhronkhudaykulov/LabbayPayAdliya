import { useNavigate } from "react-router-dom";
import { FooterNav, Text } from "../../../components";
import { PhoneInput, SmsInput, TextFild } from "../../../components/Input/view";
import { APP_ROUTES } from "../../../router";

const WithDrawMoneyAddInfo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-[85vh]">
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
      <div className="mt-auto ">
        <FooterNav
          prevClick={() => navigate(-1)}
          nextClick={() =>
            navigate(
              `${APP_ROUTES.WITHDRAWMONEY}/${APP_ROUTES.WITH_DRAW_MONEY_SMS}`
            )
          }
        />
      </div>
    </div>
  );
};

export default WithDrawMoneyAddInfo;
