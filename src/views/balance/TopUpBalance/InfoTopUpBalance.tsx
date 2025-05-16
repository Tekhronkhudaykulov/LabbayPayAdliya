import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { APP_ROUTES } from "../../../router";

const InfoTopUpBalance = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-[85vh]">
      <div className="flex justify-between gap-4 h-[240px] mb-6">
        <div className="bg-content px-4 py-5 min-w-[787px] h-full rounded-[36px]">
          <Text
            text="Детали платежа:"
            className="text-[25px] font-[500] border-b border-[#919191] pb-3 mb-3"
          />
          <div className="flex flex-col gap-[11px]">
            <div className="flex items-center">
              <div className="text-[25px] font-[500]">ФИО:</div>
              <div className="text-[25px] font-[500] ml-auto text-right">
                UMAROV OYBEK
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-[25px] font-[500]">Вид нарушения:</div>
              <div className="text-[25px] font-[500] ml-auto text-right">
                22-KM DAN KUP BULMAGAN
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-[25px] font-[500]">Сумма штрафа:</div>
              <div className="text-[25px] font-[500] ml-auto text-right">
                170 000.00
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-[25px] font-[500]">Номер постановления:</div>
              <div className="text-[25px] font-[500] ml-auto text-right">
                RB89127912329
              </div>
            </div>
          </div>
        </div>
        <div className="bg-content w-full h-full px-4 py-5 rounded-[36px]">
          <div className="flex items-center justify-center h-full gap-[28px] px-[20px] bg-white rounded-[31px]">
            <img
              src={ASSETS.UzAndHumo}
              className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
              alt=""
            />
            <Text
              text="Пополнение по номеру карты"
              className="text-[32px] font-[500]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-[20px]">
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
      <div className="mt-auto">
        <FooterNav
          nextTitle="ПОПОЛНИТЬ"
          prevClick={() => navigate(-1)}
          nextClick={() => navigate(APP_ROUTES.SUCCESS)}
        />
      </div>
    </div>
  );
};

export default InfoTopUpBalance;
