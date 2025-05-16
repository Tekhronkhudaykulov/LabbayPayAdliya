import { Text } from "../../../components";
import SmsCode from "./components/SmsCode";

const WithdrawMoneySms = () => {
  return (
    <div>
      <div className="bg-content px-4 py-5 h-[240px] min-w-[787px] rounded-[36px]">
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
      <div className="mt-[20px]">
        <SmsCode />
      </div>
    </div>
  );
};

export default WithdrawMoneySms;
