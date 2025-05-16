import Text from "../Text/view";

interface LogoAndServiceCardType {
  img: string;
  title: string;
  className: string;
}

const LogoAndServiceCard = ({
  img,
  title,
  className,
}: LogoAndServiceCardType) => {
  return (
    <div className={`bg-content w-full  px-4 py-5 rounded-[36px] ${className}`}>
      <div className="flex items-center justify-center h-full gap-[28px] bg-white rounded-[31px]">
        <img
          src={img}
          className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
          alt=""
        />
        <Text text={title} className="text-[32px] font-[500]" />
      </div>
    </div>
  );
};

export default LogoAndServiceCard;
