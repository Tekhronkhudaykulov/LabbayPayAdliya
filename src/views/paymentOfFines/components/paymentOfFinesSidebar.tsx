import axios from "axios";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { useFormContext } from "../../../context/inputTypeContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useCustomPost } from "../../../hook/useCustomPost";
import { APP_ROUTES } from "../../../router";
import endpoints from "../../../services/endpoints";
import Notification from "../../../components/Notification/view";
import LoadingPage from "../../../components/Loading/view";
import { motion } from "framer-motion"; // 🔵 Qo‘shildi


const socket = io("http://localhost:5555");


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const PaymentOfFinesSidebar = () => {
  const [data, setData] = useState(0);

  const deviceID = localStorage.getItem("device_id");

  const navigate = useNavigate();
  // @ts-ignore
  const { responseData, setResponseData, clearForm, setError, error, setRefoundSum, refoundSum } =
    useFormContext();

    
  useEffect(() => {
    axios
      .post(
        `http://localhost:5555/cash/api/CashDevice/StartDevice?deviceID=${deviceID}`
      )
      .then(() => {
        socket.on("add-cash", (incoming) => {
          const added = (incoming?.value || 0) / 100;
          setData((prev: any) => {
            const updated = prev + added;

            setResponseData((prevState: any) => ({
              ...prevState,
              vendorForm: {
                ...prevState.vendorForm,
                static_amount: updated,
              },
            }));

            return updated;
          });
        });
        return () => {
          socket.off("add-cash");
        };
      });
  }, []);






  const { mutate, isPending, isError } = useCustomPost({
    onSuccess: async (res: any) => {
     await clearForm();
      setResponseData(res?.labbay_transaction_id);

      if (refoundSum > 0) {
        axios.post(`http://localhost:5555/cash/api/CashDevice/DispenseValue?deviceID=${deviceID}`).then(() => {
          navigate(APP_ROUTES.SUCCESS);
        }).catch (() => {
           navigate(APP_ROUTES.REFOUND);
        })
      } else {
        navigate(APP_ROUTES.SUCCESS);
      }
    },
    onError: (err) => {
      setError(err?.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    const backendAmount = responseData?.vendorForm?.static_amount || 0;
    const refundAmount = data - backendAmount;

    if (refundAmount > 0 && backendAmount > 0) {
      setRefoundSum(refundAmount);
    }
    mutate({
      endpoint: endpoints.createPay,
      body: {
        ...responseData?.vendorForm,
        static_amount: backendAmount ?? data
      }
    });
  };

  return (
    <>
      {isError && <Notification message={error} onClose="" />}
      {isPending ? (
        <LoadingPage />
      ) : (
        <>
      <motion.div
          className="grid grid-cols-[60%_1fr] gap-[20px]"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
      {/* Chap panel */}
      <div className="bg-content p-[20px] rounded-[36px] overflow-y-scroll">
        <div className="flex items-center justify-between gap-x-[20px] bg-white rounded-[12px] p-[10px]">
          <img
            src={responseData?.vendor?.logo}
            className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
            alt=""
          />
          <Text
            text={responseData?.vendor?.name}
            className="text-[25px] font-bold"
          />
        </div>

        <div className="flex flex-col gap-[15px] mt-[10px]">
          {responseData?.vendor_info?.map((item: any, ind: any) => (
            <div key={ind} className="flex items-center">
              <div className="text-[22px] font-[500]">{item.label}</div>
              <div className="text-[22px]  ml-auto text-right">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* O‘ng panel */}
      <div className="flex flex-col gap-y-[10px]">
        <div className="bg-content p-[20px] rounded-[36px]">
          <div className="flex items-center">
            <Text text="Минимум:" className="text-[25px] font-[500]" />
            <Text
              text="1 000 сум"
              className="ml-auto text-right text-[25px] font-[bold]"
            />
          </div>
          <div className="h-[2px] bg-[#0BA859] my-[10px]"></div>
          <div className="flex items-center">
            <Text text="Максимум:" className="text-[25px] font-[500]" />
            <Text
              text="200 000 сум"
              className="ml-auto text-right text-[25px] font-[bold]"
            />
          </div>
        </div>

        <div className="bg-content p-[20px] rounded-[36px]">
          <div className="flex items-center">
            <Text text="Введено:" className="text-[25px] font-[500]" />
            <Text
              text={`${data} сум`}
              className="ml-auto text-right text-[25px] font-[bold]"
            />
          </div>
          <div className="h-[2px] bg-[#0BA859] my-[10px]"></div>
          <div className="flex items-center">
            <Text text="К зачислению:" className="text-[25px] font-[500]" />
            <Text
              text="0 сум"
              className="ml-auto text-right text-[25px] font-[bold]"
            />
          </div>
          <div className="h-[2px] bg-[#0BA859] my-[10px]"></div>
          <div className="flex items-center">
            <Text text="Комиссия:" className="text-[25px] font-[500]" />
            <Text
              text="0 сум"
              className="ml-auto text-right text-[25px] font-[bold]"
            />
          </div>
        </div>

        <img src={ASSETS.Money} className="mx-auto mt-8" alt="" />
      </div>
    </motion.div>
          <FooterNav
            prevClick={() => {
              axios
                .post(
                  `http://localhost:5555/cash/api/CashDevice/StopDevice?deviceID=${deviceID}`
                )
                .then(() => {
                  navigate(-1);
                });
            }}
            showPrevButton={data >= 900}
            nextDisabled={data <= 900}
            nextClick={() => {
              axios
                .post(
                  `http://localhost:5555/cash/api/CashDevice/StopDevice?deviceID=${deviceID}`
                )
                .then(() => {
                   handleSubmit();
                });
            }}
          />
        </>
      )}
    </>
  );
};

export default PaymentOfFinesSidebar;
