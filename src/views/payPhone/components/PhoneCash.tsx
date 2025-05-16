import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { APP_ROUTES } from "../../../router";

const PhoneCash = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="min-w-[787px]">
          <div className="flex flex-col gap-4 px-[15px] py-[20px] border-[18px] border-purple rounded-[36px]">
            <div className="flex items-center">
              <Text text="Введено:" className="text-[31px] font-[500]" />
              <Text
                text="0 сум"
                className="ml-auto text-right text-[31px] font-[700]"
              />
            </div>
            <div className="flex items-center">
              <Text text="К зачислению:" className="text-[31px] font-[500]" />
              <Text
                text="0 сум"
                className="ml-auto text-right text-[31px] font-[700]"
              />
            </div>
            <div className="flex items-center">
              <Text
                text="Комиссия сервиса:"
                className="text-[31px] font-[500]"
              />
              <Text
                text="0 сум"
                className="ml-auto text-right text-[31px] font-[700]"
              />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-4 bg-purple rounded-[36px] p-5">
            <div className="flex items-center">
              <Text
                text="Минимум:"
                className="text-[26px] font-[700] text-white"
              />
              <Text
                text="5000 сум"
                className="ml-auto text-right text-[26px] font-[700] text-white"
              />
            </div>
            <div className="flex items-center">
              <Text
                text="Максимум:"
                className="text-[26px] font-[700] text-white"
              />
              <Text
                text="5000 сум"
                className="ml-auto text-right text-[26px] font-[700] text-white"
              />
            </div>
          </div>
          <img src={ASSETS.Money} className="mx-auto mt-8" alt="" />
        </div>
      </div>
      <FooterNav
        prevClick={() => navigate(-1)}
        nextClick={() => navigate(APP_ROUTES.SUCCESS)}
        nextTitle="Оплатить"
      />
    </>
  );
};

export default PhoneCash;
