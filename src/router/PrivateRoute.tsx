import { FC, ReactNode } from "react";
import { Navbar } from "../layouts";

interface Props {
  child?: ReactNode;
}

const PrivateRoute: FC<Props> = ({ child }) => {
  return (
    <>
      <Navbar />
      <div className="pb-[13px] wrapper !font-poppins h-[calc(100vh-110px)] flex flex-col">
        {child}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default PrivateRoute;
