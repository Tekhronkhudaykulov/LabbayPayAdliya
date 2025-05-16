import InputMask from "react-input-mask";
import { Input } from "antd";

interface InputSms {
  className?: string;
  placeHolder?: string;
  changeMask: string;
}

const TextFild = ({ className, placeHolder }: any) => {
  return (
    <input
      className={`px-[10px] h-[90px] text-[30px] w-full font-[500] outline-none text-[#E8E8E8] border rounded-[21px] ${className}`}
      type="text"
      placeholder={placeHolder}
    />
  );
};

const SmsInput = ({ className, placeHolder, changeMask }: InputSms) => {
  return (
    // @ts-ignore
    <InputMask
      placeholder={placeHolder}
      mask={changeMask}
      className={`h-[91px] w-full rounded-[22px] px-[20px] text-[41px] ${className}`}
    ></InputMask>
  );
};

const PhoneInput = (className: any) => {
  return (
    <div className="flex items-center gap-[20px] p-[20px] bg-white rounded-[22px]">
      <div className="text-[41px] font-[500] border-r-[5px] border-[#E8E8E8] pr-[20px]">
        +998
      </div>
      <Input
        className={`border-transparent  text-[41px] p-0 h-[50px] ${className}`}
      />
    </div>
  );
};
export { SmsInput, TextFild, PhoneInput };
