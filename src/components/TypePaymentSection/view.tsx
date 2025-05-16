import { Text } from "..";
import { ASSETS } from "../../assets/images/assets";

interface Props {
  className?: string;
  onCashClick: () => void;
  onCardClick?: () => void;
  disabled?: boolean;
}

const disabledBlock = (
  <div className="absolute top-0 left-0 h-full w-full flex flex-col rounded-[30px] justify-center bg-orange50">
    <div className="text-[25px] text-white font-[700] text-center py-6 bg-orange ">
      В разработке
    </div>
  </div>
);

const TypePaymentSection = ({
  className,
  onCashClick,
  onCardClick,
  disabled = false,
}: Props) => {
  return (
    <div className={`bg-section rounded-[36px] p-[26px] ${className}`}>
      <Text
        text="Выберите способ оплаты:"
        className="text-[36px] font-[700] mb-[26px]"
      />
      <div className="grid grid-cols-2 gap-4">
        <div
          onClick={onCashClick}
          className="h-[300px] flex flex-col items-center justify-center gap-4 rounded-[31px] bg-white p-[20px]"
        >
          <Text
            text="Наличными"
            className="text-[26px] font-[700] text-center"
          />
          <div className="border-[#E7E7E7] border-[2px] rounded-[10px] p-[5px]">
            <img
              className="w-[185px] h-[127px] object-cover"
              src={ASSETS.CashMoneyNew}
              alt=""
            />
          </div>
        </div>
        <div
          onClick={() => !disabled && onCardClick?.()}
          className="h-[300px] flex flex-col items-center justify-center gap-4 rounded-[31px] bg-white p-[20px] relative"
        >
          <Text
            text="Банковской картой"
            className="text-[26px] font-[700] text-center"
          />
           <div className="border-[#E7E7E7] border-[2px] rounded-[10px] p-[5px]">
            <img
              className="w-[185px] h-[127px] object-cover"
              src={ASSETS.Card}
              alt=""
            />
          </div>
          {/* <div className="border-[#E7E7E7] border-[2px] rounded-[17px] p-[5px]">
            <img
              className="w-[205px] h-[67px] object-cover"
              src={ASSETS.Uzcard}
              alt=""
            />
          </div>
          <div className="border-[#E7E7E7] border-[2px] rounded-[17px] p-[5px]">
            <img
              className="w-[205px] h-[67px] object-cover"
              src={ASSETS.Humo}
              alt=""
            />
          </div> */}
          {disabled && disabledBlock}
        </div>
      </div>
    </div>
  );
};

export default TypePaymentSection;
