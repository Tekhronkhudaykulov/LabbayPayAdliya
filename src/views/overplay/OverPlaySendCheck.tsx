import { Button } from "antd";
import PayQue from "../../components/ErrorModal/PayQue";
import { ASSETS } from "../../assets/images/assets";
import { MailOutlined } from "@ant-design/icons";

const OverPlaySendCheck = () => {
  return (
    <div className="flex justify-center h-[80vh]">
      <div className="flex justify-center flex-col ">
        <PayQue
          img={ASSETS.Tick}
          title="ОШИБКА ПЕЧАТИ ЧЕКА"
          subTitle="В принтере закончилась бумага"
          desc="В случае незачисления средств в течение суток, пожалуйста, обратитесь в Колл-центр по номеру: +99871 000-00-00"
          isHas={true}
        />
        <div className="mt-auto w-[800px] mx-auto flex flex-col gap-y-[10px]">
          <Button
            icon={<MailOutlined className="[&>svg]:text-[32px]" />}
            className="flex items-center justify-center gap-4 leading-none col-span-2 !bg-btnGreen"
            type="primary"
          >
            Получить СМС
          </Button>
          <Button className="!bg-[#C82E2E]" type="primary">
            Закрыть (30)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OverPlaySendCheck;
