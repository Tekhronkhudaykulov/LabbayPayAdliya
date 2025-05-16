import { Modal } from "antd";
import { FC, useEffect, useState } from "react";
// import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { appStore } from "../../store";

interface Props {
  onOk?: () => void;
  onCancel?: () => void;
}

const IdleModal: FC<Props> = ({ onOk, onCancel }) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState<number>(10);
  const navigate = useNavigate();
  const { idleModal, setIdleModal } = appStore();

  const handleClose = () => {
    setTimer(10);
  };

  useEffect(() => {
    if (idleModal) {
      const time = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      if (timer === 0) {
        navigate(APP_ROUTES.HOME);
        onCancel && onCancel();
        handleClose();
        setIdleModal(false);
      }

      return () => {
        clearInterval(time);
      };
    }
  }, [idleModal, timer]);

  return (
    <Modal
      open={idleModal}
      closeIcon={null}
      classNames={{
        content: "!rounded-[44px]",
        body: "h-full flex flex-col items-center justify-center",
        footer: "grid grid-cols-2 gap-8",
      }}
      className="!w-[90vw]"
      cancelText={t("i_want_to_logout")}
      cancelButtonProps={{
        size: "large",
        className: "h-[60px] [&>span]:text-[22px]",
      }}
      onCancel={() => {
        onCancel && onCancel();
        handleClose();
      }}
      okText={t("i_want_to_continue_working")}
      okButtonProps={{
        size: "large",
        className: "h-[60px] [&>span]:text-[22px]",
      }}
      onOk={() => {
        onOk && onOk();
        handleClose();
        setIdleModal(false);
      }}
      maskClosable={false}
      centered
    >
      {/* <Alert
          banner
          message={<Marquee gradient={false}>{t("idle_text")}</Marquee>}
          className="mb-auto"
        /> */}
      <div className="text-[56px] text-center mt-16">{t("idle_text")}</div>
      <div className="text-[56px] text-purple text-center mt-16 mb-24">
        {timer} {t("secund")}
      </div>
    </Modal>
  );
};

export default IdleModal;
