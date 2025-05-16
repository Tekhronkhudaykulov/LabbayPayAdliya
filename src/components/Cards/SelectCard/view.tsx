import { ReactNode } from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  img?: string;
  disabled: boolean;
  title: ReactNode | string;
}

const disabledBlock = (
  <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center bg-orange50">
    <div className="text-[36px] text-white font-[700] text-center py-6 bg-orange">
      В разработке
    </div>
  </div>
);

const SelectCard = ({ className, onClick, img, disabled, title }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col relative overflow-hidden ${className} ${
        disabled && "disabled"
      } bg-card rounded-[36px]`}
    >
      <div className="text-[36px] pt-[24px] pl-[24px] font-[700]">{title}</div>
      <img src={img} className="mt-auto text-right max-w-full" alt="" />
      {disabled ? disabledBlock : null}
    </div>
  );
};

export default SelectCard;
