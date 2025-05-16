import { FC } from "react";
import { VendorType } from "../../types";

interface Props {
  card: VendorType;
  className?: string;
  onClick?: () => void;
}

const Card: FC<Props> = ({ card, className, onClick }) => {
  return (
    <div
      className={`block shadow-box bg-white rounded-main p-[10px] pt-[28px] ${className}`}
      onClick={onClick}
    >
      <img className=" object-contain  w-full h-[95px] mb-[20px]" src={card?.logo?.link} alt="" />
      <div className="line-clamp-2 text-center text-[14px] uppercase mt-auto leading-[18px]">
        {card?.short_name}
      </div>
    </div>
  );
};

export default Card;
