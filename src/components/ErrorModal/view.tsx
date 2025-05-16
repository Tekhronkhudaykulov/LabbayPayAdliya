import { Modal } from "antd";
import { FC } from "react";
import { ASSETS } from "../../assets/images/assets";

interface Props {
  open?: boolean;
}

const SuccessfullyModal: FC<Props> = ({ open }) => {
  return (
    <Modal
      footer={null}
      open={open}
      classNames={{
        content: "!rounded-[44px] !w-[90vw] h-[90vh]",
        body: "h-full flex flex-col items-center justify-center",
      }}
      className="!w-[90vw] h-[90vh] !m-auto"
      centered
    >
      <img src={ASSETS.errorImage} alt="" />
      <div className="text-[44px] text-center text-red">Ошибка оплаты</div>
      <div className="text-[31px] text-center text-red font-400">
        Error message
      </div>
    </Modal>
  );
};

export default SuccessfullyModal;
