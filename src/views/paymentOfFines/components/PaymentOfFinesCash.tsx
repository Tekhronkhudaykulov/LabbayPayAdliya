import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { APP_ROUTES } from "../../../router";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";


const socket = io("http://localhost:5555");

const PaymentOfFinesCash = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(0)

  const deviceID = localStorage.getItem("deviceID")
  useEffect(() => {
      axios.post(`http://localhost:5555/cash/api/CashDevice/StartDevice?deviceID=${deviceID}`).then(() => {
       socket.on("add-cash", (incoming) => {
        const added = (incoming?.value || 0) / 100;
          setData((prev: any) => prev + added); 
        });
        return () => {
          socket.off("add-cash"); 
        };
      })
  },[])



  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="min-w-[787px]">
          {/* <div className="flex items-center px-[15px] py-[20px] border-[18px] border-purple rounded-[36px]">
            <Text
              text="Указанная сумма оплаты:"
              className="text-[31px] font-[500]"
            />
            <Text
              text="120 000.00"
              className="ml-auto text-right text-[31px] font-[700]"
            />
          </div> */}
          <div className="flex flex-col gap-4 px-[15px] py-[20px] border-[18px] border-purple rounded-[36px]">
            <div className="flex items-center">
              <Text text="Введено:" className="text-[31px] font-[500]" />
              <Text
                text={`${data} сум`}
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
            <div className="flex items-center">
              <Text text="Лишняя сумма:" className="text-[31px] font-[500]" />
              <Text
                text="0 сум"
                className="ml-auto text-right text-[31px] font-[700]"
              />
            </div>
            <Text
              text="Будет использованная для пополнения мобильной связи"
              className="text-[20px] font-[500]"
            />
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
        nextClick={() => {
          axios.post(`http://localhost:5555/cash/api/CashDevice/StopDevice?deviceID=${deviceID}`).then(() => {
            navigate(APP_ROUTES.SUCCESS);
          })
        }}
        nextTitle="Оплатить"
      />
    </>
  );
};

export default PaymentOfFinesCash;
