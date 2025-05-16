import { motion } from "framer-motion";
import { FooterNav, Text } from "../../components";
import NumericKeyboardCustom from "../../components/CustomKeyboard/NumericKeyboard";
import { useFormContext } from "../../context/inputTypeContext";
import InputMask from "react-input-mask";
import { useCustomPost } from "../../hook/useCustomPost";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import endpoints from "../../services/endpoints";
import Notification from "../../components/Notification/view";
import LoadingPage from "../../components/Loading/view";

const formatPrice = (value) => {
  if (!value) return "";
  const num = parseInt(value.toString().replace(/\D/g, ""));
  return isNaN(num) ? "" : num.toLocaleString("ru-RU");
};

const Refound = () => {
  const navigate = useNavigate();
  // @ts-ignore
  const { responseData, form, setActiveInputKey, setResponseData, clearForm, setError, error } = useFormContext();

  const card_num = form["card_number"]?.replace(/\s/g, "").length;
  const card_expire = form["card_expire"]?.length;

  const { mutate, isPending, isError } = useCustomPost({
    onSuccess: async (res: any) => {
      setResponseData(res);
      await clearForm();
      navigate(`${APP_ROUTES.PAY_CARD_CONFIRM}`);
    },
    onError: (err) => {
      setError(err?.response?.data?.message);
    },
  });

  const { amount, ...payFormWithoutAmount } = form;

  const handleSubmit = () => {
    mutate({
      endpoint: endpoints.cardPrepare,
      body: {
        vendor_form: {
          ...responseData?.vendor_form,
          static_amount: amount,
        },
        pay_form: payFormWithoutAmount,
      },
    });
  };

  return (
    <>
      {isError && <Notification message={error} onClose="" />}
      {isPending && <LoadingPage />}

      {/* Motion container */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-[65%_1fr] gap-x-[20px]"
      >
        <div className="bg-[#F4F4F4] flex flex-col justify-between rounded-[12px] gap-y-[20px] w-full p-[30px]">
          <div className="bg-white flex justify-between items-center p-[20px] rounded-[12px]">
            <img
              src={responseData?.vendor?.logo}
              className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
              alt=""
            />
            <Text text={`${responseData?.vendor?.name}`} className="text-[25px] font-bold" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number" className="text-[30px] mb-[5px] text-gray-700 font-[500]">
              *Сумма
            </label>
            <input
              id="amount"
              type="text"
              value={formatPrice(form["amount"] || "")}
              onFocus={() => setActiveInputKey("amount")}
              className="p-3 bg-white h-[75px] rounded-[12px] text-[27px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="card-number" className="text-[30px] mb-[5px] text-gray-700 font-[500]">
              *Введите номер карты
            </label>
            <InputMask
              id="card_number"
              mask="9999 9999 9999 9999"
              value={form["card_number"] || ""}
              onFocus={() => setActiveInputKey("card_number")}
              placeholder="____ ____ ____ ____"
              className="p-3 bg-white h-[75px] rounded-[12px] text-[27px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="expiry" className="text-[30px] mb-[5px] text-gray-700 font-[500]">
              *Введите срок карты
            </label>
            <InputMask
              id="card_expire"
              mask="99/99"
              placeholder="MM/YY"
              className="p-3 h-[75px] rounded-[12px] text-[27px]"
              value={form["card_expire"] || ""}
              onFocus={() => setActiveInputKey("card_expire")}
            />
          </div>
        </div>
        <div className="bg-[#F4F4F4] rounded-[12px]">
          <NumericKeyboardCustom />
        </div>
      </motion.div>

      <div className="mt-auto">
        <FooterNav
          nextTitle="Получить СМС-код"
          nextClick={handleSubmit}
          nextDisabled={card_num !== 16 || card_expire !== 4}
          prevClick={() => navigate(-1)}
        />
      </div>
    </>
  );
};

export default Refound;
