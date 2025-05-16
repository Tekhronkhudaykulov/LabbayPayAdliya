import { LazyLoadImage } from "react-lazy-load-image-component";
import { ASSETS } from "../../assets/images/assets";
import { FC } from "react";

interface Props {
  className?: string;
}

const Warning: FC<Props> = ({ className }) => {
  return (
    <div className={`flex ${className}`}>
      <LazyLoadImage
        src={ASSETS.undovImage}
        wrapperClassName="z-[1] rounded-full border-[5px] p-[10px] border-white bg-warning w-[118px] h-[118px]"
        className="w-full h-full object-contain"
        effect="opacity"
        alt=""
      />
      <div className="ml-[-30px] max-w-[600px] bg-warning py-[10px] px-14 leading-[30px] rounded-[29px] border-[3px] border-white text-[24px] uppercase text-white font-700">
        Убедительная просьба проверять данные в левом окне после вносите купюры
        !!!
      </div>
    </div>
  );
};

export default Warning;
