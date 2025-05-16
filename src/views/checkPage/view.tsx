import { Button } from "antd";
import { ASSETS } from "../../assets/images/assets";
import { Text } from "../../components";
import { APP_ROUTES } from "../../router";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full w-[65%] mx-auto pb-16">
      <img src={ASSETS.PrintAnimation} className="h-[150px]" alt="" />
      <Text
        text="Печать чека"
        className="text-[45px] font-[700] text-center mt-8 mb-14"
      />
      <div className="bg-content p-5 rounded-[36px] flex flex-col gap-4">
        <div className="flex items-center">
          <Text text="Услуга:" className="text-[25px] font-[500]" />
          <Text
            text="ГУБДД Штрафы"
            className="ml-auto text-right text-[25px] font-[500]"
          />
        </div>
        <div className="flex items-center">
          <Text text="Время оплаты:" className="text-[25px] font-[500]" />
          <Text
            text="ГУБДД Штрафы"
            className="ml-auto text-right text-[25px] font-[500]"
          />
        </div>
        <div className="flex items-center">
          <Text text="Тип оплаты:" className="text-[25px] font-[500]" />
          <Text
            text="ГУБДД Штрафы"
            className="ml-auto text-right text-[25px] font-[500]"
          />
        </div>
        <div className="flex items-center">
          <Text text="Сумма штрафа:" className="text-[25px] font-[500]" />
          <Text
            text="ГУБДД Штрафы"
            className="ml-auto text-right text-[25px] font-[500]"
          />
        </div>
        <div className="flex items-center">
          <Text text="Сумма к оплате:" className="text-[25px] font-[500]" />
          <Text
            text="ГУБДД Штрафы"
            className="ml-auto text-right text-[25px] font-[500]"
          />
        </div>
        <div className="flex items-center">
          <Text text="К зачислению:" className="text-[25px] font-[500]" />
          <Text
            text="ГУБДД Штрафы"
            className="ml-auto text-right text-[25px] font-[500]"
          />
        </div>
      </div>
      <div className="mt-auto">
        <Button
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="!bg-btnGreen w-full"
          type="primary"
        >
          ОК (30)
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
