import { LazyLoadImage } from "react-lazy-load-image-component";
import { ASSETS } from "../../assets/images/assets";
import { FC } from "react";
import { modalsStore } from "../../store";

interface Props {
  className?: string;
}

const Logo: FC<Props> = ({ className }) => {
  const { openModal } = modalsStore();
  return (
    <LazyLoadImage
      onDoubleClick={() => openModal("logout")}
      className={`min-w-[205px] w-[205px] ${className}`}
      src={ASSETS.logoImage}
      effect="opacity"
      alt=""
    />
  );
};

export default Logo;
