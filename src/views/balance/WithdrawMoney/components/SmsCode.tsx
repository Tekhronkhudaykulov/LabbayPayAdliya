import { Button, Form } from "antd";
import InputMask from "react-input-mask";

const SmsCode = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

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
          <div className="bg-content rounded-[36px] px-5 pt-4 pb-16">
            <>
              <div className="text-[26px] font-[500] mb-4">СМС-код</div>
              <Form form={form2} layout="vertical">
                {forms2.map((item, idx) => (
                  <Form.Item
                    key={idx}
                    label={item.label}
                    name={item.name}
                    rules={[{ required: item.required, message: item.message }]}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SmsCode;
