import "ldrs/ring";
import { lineWobble } from "ldrs";

const LoadingPage = () => {
  lineWobble.register();

  return (
    <div className="fixed flex items-center justify-center top-0 bg-black left-0 z-[99999] right-0 bottom-0 w-[100%] h-[105vh] bg-opacity-70">
      <div className="h-[25px] bg-white flex items-center px-[20px] rounded-full">
        <l-line-wobble
          size="400"
          stroke="10"
          bg-opacity="0.1"
          speed="2"
          color="#7A80FF"
        ></l-line-wobble>
      </div>
    </div>
  );
};

export default LoadingPage;
