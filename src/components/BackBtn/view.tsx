import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

interface Props {
  className?: string;
  onClick?: () => void;
  title?: string;
}

const BackBtn: FC<Props> = ({ className, onClick, title }) => {
  return (
    <Button
      icon={
        <LeftOutlined className="[&>svg]:fill-purple [&>svg]:text-[35px]" />
      }
      type="default"
      className={`flex items-center shadow-box rounded-main bg-white uppercase h-[70px] ${className}`}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default BackBtn;
