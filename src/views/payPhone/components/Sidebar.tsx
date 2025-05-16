import { Text } from "../../../components";
import { ASSETS } from "../../../assets/images/assets";

const Sidebar = () => {
  return (
    <div className="flex justify-between gap-4 h-[240px] mb-6">
      <div className="bg-content px-4 py-5 min-w-[787px] h-full rounded-[36px]">
        <Text
          text="Детали платежа:"
          className="text-[25px] font-[500] border-b border-[#919191] pb-3 mb-3"
        />
        <div className="flex flex-col gap-[11px]">
          <div className="flex items-center">
            <div className="text-[25px] font-[500]">Номер телефона:</div>
            <div className="text-[25px] font-[500] ml-auto text-right">
              +998 90 000 00 00
            </div>
          </div>
        </div>
      </div>
      <div className="bg-content w-full h-full px-4 py-5 rounded-[36px]">
        <div className="flex items-center justify-center h-full gap-[28px] bg-white rounded-[31px]">
          <img
            src={ASSETS.Beeline}
            className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
            alt=""
          />
          <Text text="Beeline" className="text-[32px] font-[500]" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
