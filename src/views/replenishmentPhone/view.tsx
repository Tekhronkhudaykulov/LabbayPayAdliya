import { useNavigate } from "react-router-dom";
import { FooterNav, KeyboardComponent, PhoneBlock } from "../../components";
import { numericKeyboard } from "../../components/Keyboard/typesKeyboars";
import { APP_ROUTES } from "../../router";

const ReplenishmentPhone = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full">
      <PhoneBlock className="mt-8" />
      <KeyboardComponent
        className="mx-auto mt-8"
        layout={numericKeyboard}
        numeric
      />
      <FooterNav
        prevClick={() => navigate(-1)}
        nextClick={() =>
          navigate(`${APP_ROUTES.PAY_PHONE}/${APP_ROUTES.TYPE_PAYMENT}`)
        }
      />
    </div>
  );
};

export default ReplenishmentPhone;
