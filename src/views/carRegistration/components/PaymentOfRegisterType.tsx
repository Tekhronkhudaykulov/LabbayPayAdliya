import { useNavigate } from "react-router-dom";
import { FooterNav, TypePaymentSection } from "../../../components";
import { APP_ROUTES } from "../../../router";

const PaymentOfRegisterType = () => {
  const navigate = useNavigate();
  return (
    <div>
      <TypePaymentSection
        onCashClick={() =>
          navigate(
            `${APP_ROUTES.PAYMENT_OF_REGISTER_CAR}/${APP_ROUTES.PAYMENT_OF_REGISTER_CAR_CASH}`
          )
        }
        onCardClick={() =>
          navigate(
            `${APP_ROUTES.PAYMENT_OF_REGISTER_CAR}/${APP_ROUTES.PAYMENT_OF_REGISTER_TERMINAL}`
          )
        }
         disabled={true}
      />
      <FooterNav
        prevClick={() => navigate(-1)}
        nextClick={() => {}}
        showNextButton={false}
      />
    </div>
  );
};

export default PaymentOfRegisterType;
