import { ReactNode } from "react";

interface Props {
  text: ReactNode | string;
  className?: string;
}

const Text = ({ text, className }: Props) => {
  return <div className={`${className}`}>{text}</div>;
};

export default Text;
