import { FC } from "react";
import { ASSETS } from "../../assets/images/assets";

interface Props {
  className?: string;
}

const PageLoading: FC<Props> = ({ className }) => {
  return (
    <img
      src={ASSETS.loadingImage}
      className={`animate-spin ${className}`}
      alt=""
    />
  );
};

export default PageLoading;
