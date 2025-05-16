import { Button } from "antd";
import { ASSETS } from "../../assets/images/assets";
import PayQue from "../../components/ErrorModal/PayQue";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

const OverPlaySendSms = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-[80vh]">
      <div className="flex justify-center flex-col ">
        <PayQue
          img={ASSETS.Tick}
          title="ОШИБКА ОТПРАВКИ СМС"
          subTitle="Просим вас обратиться в Call-Center
+99871 000-00-00"
          desc="В случае незачисления средств в течение суток, пожалуйста, обратитесь в Колл-центр по номеру:
      +99871 000-00-00"
          isHas={false}
        />
        <div className="mt-auto w-[800px] mx-auto flex flex-col gap-y-[10px]">
          <Button
            className="!bg-btnGreen"
            onClick={() => navigate(APP_ROUTES.OVER_PLAY_SEND_CHECK)}
            type="primary"
          >
            Печать чека
          </Button>
          <Button className="!bg-[#C82E2E] " type="primary">
            Закрыть (30)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OverPlaySendSms;
