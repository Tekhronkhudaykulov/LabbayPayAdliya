import { Button } from "antd";
import { ASSETS } from "../../assets/images/assets";
import { Text } from "../../components";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { useCustomPost } from "../../hook/useCustomPost";
import { useFormContext } from "../../context/inputTypeContext";
import endpoints from "../../services/endpoints";
import { useEffect } from "react";
import { motion } from "framer-motion"; // 🔵 Qo‘shildi

const CheckPage = () => {
  const navigate = useNavigate();

  // @ts-ignore

  const { responseData, setError, setCheck, check } = useFormContext();

  const { mutate } = useCustomPost({
    onSuccess: async (res: any) => {
      console.log(res, 'res');
      setCheck(res?.result);
    },
    onError: (err) => {
      setError(err?.response?.data?.message);
    },
  });

  useEffect(() => {
    if (responseData) {
      mutate({
        endpoint: endpoints.checkInfo,
        body: {
          transaction_id: responseData,
        },
      });
    }
  }, []);

  const { mutate: sendPrint } = useCustomPost({
    baseURL: "http://localhost:5555",
    onSuccess: () => {
      navigate(APP_ROUTES.HOME);
    },
    onError: (err) => {
      setError(err?.response?.data?.message);
    },
  });

  const checkList = check?.detail_params
    ?.filter((item) => item.value)
    ?.map((ind) => ({
      key: ind.labelUz,
      value: ind.value,
    }));

  const handleSendPrint = () => {
    sendPrint({
      endpoint: endpoints.print,
      body: {
        list: checkList,
        tranId: check?.id,
        amount: check?.amount,
      },
    });
  };


  const fadeDown = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="flex flex-col h-full w-[65%] mx-auto pb-16"
      initial="hidden"
      animate="visible"
      variants={fadeDown}
    >
      <img src={ASSETS.Success} className="h-[150px]" alt="" />
      <Text
        text="УСПЕШНО"
        className="text-[45px] font-[700] text-center mt-8 mb-14"
      />
      <Text
        text="Ваши средства зачислены."
        className="text-[28px] font-[500] text-center"
      />
      <Text
        text="Распечатать чек?"
        className="text-[28px] font-[500] text-center"
      />
      <div className="mt-auto grid grid-cols-2 gap-4">
        <Button
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="!bg-btnRed"
          type="primary"
        >
          Нет (30)
        </Button>
        <Button
          onClick={handleSendPrint}
          className="!bg-btnGreen"
          type="primary"
        >
          Да
        </Button>
        {/* <Button
          icon={<MailOutlined className="[&>svg]:text-[32px]" />}
          className="flex items-center justify-center gap-4 leading-none col-span-2 !bg-btnGreen"
          type="primary"
        >
          Получить СМС
        </Button> */}
      </div>
    </motion.div>
  );
};

export default CheckPage;
