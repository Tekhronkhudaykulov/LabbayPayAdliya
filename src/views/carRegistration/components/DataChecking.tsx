import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav } from "../../../components";
import { CheckingCard } from "../../../components/Cards";
import { APP_ROUTES } from "../../../router";

const DataChecking = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[85vh] flex flex-col">
      <div className="flex items-center justify-center">
        <img src={ASSETS.Info} alt="" />
        <p className="text-orangeInfo text-[24px] font-[700]">
          Проверьте данные!
        </p>
        <img src={ASSETS.Info} alt="" />
      </div>
      <div className="grid gap-y-[20px]">
        <div className="grid grid-cols-3 gap-x-[14px] mt-[22px]">
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
        </div>
        <div className="grid grid-cols-2 gap-x-[14px]">
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
        </div>
        <div>
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
        </div>
        <div>
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
        </div>
        <div className="grid grid-cols-2 gap-x-[14px]">
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
          <CheckingCard
            label="blank:"
            title="About"
            className="bg-content rounded-[14px] h-[96px] px-[20px] py-[15px] "
          />
        </div>
      </div>
      <div className="mt-auto">
        <FooterNav
          nextTitle="ДАЛЕЕ"
          nextClick={() =>
            navigate(
              `${APP_ROUTES.PAYMENT_OF_REGISTER_CAR}/${APP_ROUTES.PAYMENT_OF_REGISTER_CAR_TYPE}`
            )
          }
          prevClick={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default DataChecking;
