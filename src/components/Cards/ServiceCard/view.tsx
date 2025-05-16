interface Props {
  className?: string;
  onClick?: () => void;
  disabled: boolean;
  item: any;
}

const disabledBlock = (
  <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center bg-orange50">
    <div className="text-[36px] text-white font-[700] text-center py-6 bg-orange">
      В разработке
    </div>
  </div>
);

const ServicesCard = ({ className, onClick, disabled, item }: Props) => {
  return (
    <div
      onClick={onClick}
      className={` relative  overflow-hidden ${className} ${
        disabled && "disabled"
      } bg-card rounded-[36px]`}
    >
      <div className="pt-[20px] px-[24px]">
        <p className="text-[36px] mb-[15px] font-[700]">{item.title}</p>
        {/* <p className="text-[36px] font-[700] mt-[-25px]">{desk}</p> */}
      </div>
      <div className="flex justify-end">
        <img src={item.logo} className="mt-auto object-contain" alt="" />
      </div>
      {disabled ? disabledBlock : null}
    </div>
  );
};

export default ServicesCard;
