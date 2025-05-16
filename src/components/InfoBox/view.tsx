import { FC, useMemo } from "react";
import { VendorType } from "../../types";

interface Props {
  displayParams: any[];
  vendorInfo?: VendorType;
}

const InfoBox: FC<Props> = ({ displayParams, vendorInfo }) => {
  const sort = useMemo(() => {
    return displayParams?.sort((a: any, b: any) => a?.order - b?.order);
  }, [displayParams]);

  return (
    <div className="bg-white rounded-content shadow-box border-[4px] border-dashed border-purple">
      <div className="flex items-center gap-24 bg-lightPurple rounded-content p-[20px]">
        {/* <LazyLoadImage
          className="h-[80px] w-[120px] object-contain"
          src={vendorInfo?.logo?.link}
          effect="opacity"
          alt=""
        /> */}
        <img
          className="h-[80px] w-[120px] object-contain"
          src={vendorInfo?.logo?.link}
          alt=""
        />

        <div className="uppercase text-darkPurple text-center text-[24px]">
          {vendorInfo?.short_name}
        </div>
      </div>
      <div className="pt-6 overflow-y-auto">
        {/* @ts-ignore */}
        {sort?.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-[20px] py-[8px] border-b border-dotted border-gray"
          >
            <div className="text-[18px] underline underline-offset-2">
              {item?.label}
            </div>
            <div className="text-[18px] underline underline-offset-2 text-right">
              {item?.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoBox;
