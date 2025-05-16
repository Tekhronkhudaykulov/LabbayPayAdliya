interface ServicePaymentCardType {
  title: string;
  img: string;
  className?: string;
  onclick?: () => void;
  disabled? : any
}

const disabledBlock = (
  <div className="absolute top-0 left-0 h-full w-full flex flex-col rounded-[30px] justify-center bg-orange50">
    <div className="text-[25px] text-white font-[700] text-center py-6 bg-orange ">
      В разработке
    </div>
  </div>
);

const ServivePaymentCard = ({
  title,
  img,
  className,
  onclick,
  disabled
}: ServicePaymentCardType) => {
  return (
    <div
      onClick={onclick}
      className={`bg-[red] relative w-full rounded-[31px] card-gradient-service flex `}
    >
      <p className={`text-black font-[700] text-[25px] ${className}`}>
        {title}
      </p>
      <img className={`w-[200px] `} src={img} alt="" />
      {disabled ? disabledBlock : null}
    </div>
  );
};

export default ServivePaymentCard;