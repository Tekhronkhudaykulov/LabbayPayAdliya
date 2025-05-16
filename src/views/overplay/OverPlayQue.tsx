import { Button } from "antd";
import { ASSETS } from "../../assets/images/assets";
import PayQue from "../../components/ErrorModal/PayQue";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";

const OverPlayQue = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-[80vh]">
      <div className="flex justify-center flex-col ">
        <PayQue
          img={ASSETS.Time}
          title="ВАША ОПЛАТА В ОЧЕРЕДИ"
          subTitle="Ваша средства будут зачислены в ближайшее время.
        Просим вас сохранить чек."
          desc="В случае незачисления средств в течение суток, пожалуйста, обратитесь в Колл-центр по номеру:
      +99871 000-00-00"
          isHas={true}
        />
        <div className="mt-auto w-[60%] mx-auto">
          <Button
            onClick={() => navigate(APP_ROUTES.OVER_PLAY_SEND_SMS)}
            className="!bg-btnGreen mt-auto w-full"
            type="primary"
          >
            Ок (30)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OverPlayQue;
