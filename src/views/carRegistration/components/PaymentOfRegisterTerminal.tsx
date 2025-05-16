import { Button, Form } from "antd";
import { FooterNav, KeyboardComponent, Text } from "../../../components";
import { numericKeyboard } from "../../../components/Keyboard/typesKeyboars";
import InputMask from "react-input-mask";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../router";

const PaymentOfRegisterTerminal = (isHas: any) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const forms = [
    {
      label: "",
      name: "",
      required: true,
      message: "Заполните",
      child: (
        <div className="flex gap-4 w-full">
          <InputMask
            placeholder="0000 0000 0000 0000"
            mask="9999 9999 9999 9999"
            maskChar={null}
            className="h-[91px] w-full rounded-[22px] px-[20px] text-[41px]"
            onChange={(e) => form.setFieldValue("creditCard", e.target.value)}
          ></InputMask>
          <InputMask
            className="h-[91px] w-[180px] rounded-[22px] px-[20px] text-[41px]"
            placeholder="mm/yy"
            mask="99 / 99"
            onChange={(e) => form.setFieldValue("expiryDate", e.target.value)}
          ></InputMask>
        </div>
      ),
    },
    {
      label: "",
      name: "phone",
      required: true,
      message: "Заполните",
      child: (
        <InputMask
          placeholder="Номер телефона смс-информир..."
          mask="+998 (99) 999-99-99"
          maskChar={null}
          className="h-[91px] w-full rounded-[22px] px-[20px] text-[41px]"
          onChange={(e) => form.setFieldValue("creditCard", e.target.value)}
        ></InputMask>
      ),
    },
  ];
  const forms2 = [
    {
      label: "",
      name: "phone",
      required: true,
      message: "Заполните",
      child: (
        <InputMask
          placeholder="_ _ _ _ _ _"
          mask="9 9 9 9 9 9"
          className="h-[91px] w-full rounded-[22px] px-[20px] text-[41px]"
          onChange={(e) => form.setFieldValue("creditCard", e.target.value)}
        ></InputMask>
      ),
    },
  ];
  return (
    <>
      <div className="flex justify-between gap-4">
        <div className="min-w-[787px]">
          {isHas && (
            <div className="flex items-center mb-[10px] px-[15px] py-[20px] border-[18px] border-purple rounded-[36px]">
              <Text text="Сумма оплаты:" className="text-[31px] font-[500]" />
              <Text
                text="120 000.00"
                className="ml-auto text-right text-[31px] font-[700]"
              />
            </div>
          )}
          <div className="bg-content rounded-[36px] px-5 pt-4 pb-16">
            {!step ? (
              <Form form={form} layout="vertical">
                {forms.map((item, idx) => (
                  <Form.Item
                    key={idx}
                    label={item.label}
                    name={item.name}
                    rules={[{ required: item.required, message: item.message }]}
                  >
                    {item.child}
                  </Form.Item>
                ))}
                <Button
                  className="!bg-btnGreen w-[505px] [&>span]:!text-[27px]"
                  type="primary"
                  size="small"
                  onClick={() => setStep(true)}
                >
                  Получить СМС-код
                </Button>
              </Form>
            ) : (
              <>
                <div className="text-[26px] font-[500] mb-4">СМС-код</div>
                <Form form={form2} layout="vertical">
                  {forms2.map((item, idx) => (
                    <Form.Item
                      key={idx}
                      label={item.label}
                      name={item.name}
                      rules={[
                        { required: item.required, message: item.message },
                      ]}
                    >
                      {item.child}
                    </Form.Item>
                  ))}
                  <div className="flex justify-between gap-4">
                    <Button
                      className="!bg-btnGreen min-w-[30%] w-[30%] [&>span]:whitespace-pre-wrap"
                      type="primary"
                    >
                      Изменить карту оплаты
                    </Button>
                    <Button className="!bg-btnGreen w-full" type="primary">
                      Повторно получить СМС-код (59)
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </div>
        </div>
        <div className="w-full">
          <KeyboardComponent
            className="numeric mx-auto"
            layout={numericKeyboard}
          />
        </div>
      </div>
      <FooterNav
        prevClick={() => navigate(-1)}
        nextClick={() => navigate(APP_ROUTES.SUCCESS)}
        nextTitle="Оплатить"
      />
    </>
  );
};

export default PaymentOfRegisterTerminal;
