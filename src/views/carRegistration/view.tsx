import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../assets/images/assets";
import { FooterNav, KeyboardComponent, Text } from "../../components";
import LogoAndServiceCard from "../../components/Card/LogoAndServiceCard";
import { numericKeyboard } from "../../components/Keyboard/typesKeyboars";
import "./style.scss";
import { APP_ROUTES } from "../../router";
import { useState } from "react";

const RegisterCar = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
  });
  const [currentInput, setCurrentInput] = useState("");

  const onChangeAll = (input: string) => {
    setInputs({
      ...inputs,
      [currentInput]: input,
    });
  };

  const handleFocus = (inputName: string) => {
    setCurrentInput(inputName);
  };
  return (
    <div className="flex flex-col h-[85vh]">
      <div className="register-car-container">
        <div className="bg-[#F4F4F4] py-[20px] px-[15px] rounded-[36px] h-[310px]">
          <div>
            <Text
              text="Введите номер инвойса"
              className="text-[25px] font-[500] mb-[10px]"
            />
            <input
              className="px-[10px] h-[90px] text-[30px] w-full font-[500] outline-none text-[#E8E8E8] border rounded-[21px]"
              type="text"
              placeholder="Сумма платежа"
              name="input1"
              value={inputs.input1}
              onFocus={() => handleFocus("input1")}
              readOnly
            />
          </div>
          <div className="mt-[15px]">
            <Text
              text="Сумма платежа"
              className="text-[25px] font-[500] mb-[10px]"
            />
            <input
              className="px-[10px] h-[90px] text-[30px] w-full font-[500] outline-none text-[#E8E8E8] border rounded-[21px]"
              type="text"
              placeholder="Сумма платежа"
              name="input2"
              value={inputs.input2}
              onFocus={() => handleFocus("input2")}
              readOnly
            />
          </div>
        </div>
        <div>
          <LogoAndServiceCard
            title="Оформление авто"
            img={ASSETS.Group}
            className="h-[150px]"
          />
          <div className="flex items-center justify-center mt-[20px]">
            <KeyboardComponent
              inputName={currentInput}
              onChange={onChangeAll}
              layout={numericKeyboard}
              numeric
            />
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <FooterNav
          prevClick={() => navigate(-1)}
          nextClick={() => navigate(APP_ROUTES.DATA_CHECKING_CAR)}
          nextTitle="ДАЛЕЕ"
        />
      </div>
    </div>
  );
};

export default RegisterCar;
