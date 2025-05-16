import { Input } from "antd";
import { Text } from "..";
import { ASSETS } from "../../assets/images/assets";

interface Props {
  className?: string;
}

const PhoneBlock = ({ className }: Props) => {
  return (
    <div
      className={`bg-content py-4 px-5 rounded-[36px] w-[810px] mx-auto ${className}`}
    >
      <Text
        text="Введите номер телефона:"
        className="font-[500] text-[25px] mb-2.5"
      />
      <div className="flex items-center gap-[20px] p-[20px] bg-white rounded-[22px]">
        <div className="text-[41px] font-[500] border-r-[5px] border-[#E8E8E8] pr-[20px]">
          +998
        </div>
        <Input className="border-transparent text-[41px] p-0 h-[50px]" />
        <img className="h-[46px]" src={ASSETS.PhoneCompany} alt="" />
      </div>
    </div>
  );
};

export default PhoneBlock;
