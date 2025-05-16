import { useNavigate, useParams } from "react-router-dom";
import { FooterNav } from "../../components";
import "./style.scss";
import { useEffect, useState } from "react";
import CustomKeyboardLetter from "../../components/CustomKeyboard/Keyboard";
import { useCustomGet } from "../../hook/useCustomGet";
import endpoints from "../../services/endpoints";
import LoadingPage from "../../components/Loading/view";
import DynamicForm from "../../form/dinamicForm";
import NumericKeyboardCustom from "../../components/CustomKeyboard/NumericKeyboard";
import { useFormContext } from "../../context/inputTypeContext";
import { useCustomPost } from "../../hook/useCustomPost";
import { APP_ROUTES } from "../../router";
import Notification from "../../components/Notification/view";
import { motion } from "framer-motion";

const bottomFadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

const ReplenishmentFine = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({});

  const { data, isLoading } = useCustomGet({
    key: "vendorId",
    endpoint: endpoints.vendorById(id),
    params: {
      categoryId: id,
    },
  });

  useEffect(() => {
    return () => {
      clearForm();
    };
  }, []);

  const [activeInput, setActiveInput] = useState({ name: "", value: "" });

  // @ts-ignore
  const { activeInputType, clearForm, form, setResponseData, setError, error } =
    useFormContext();

  const { mutate, isPending, isError } = useCustomPost({
    onSuccess: async (res: any) => {
      setResponseData(res);
      await clearForm();
      navigate(
        `${APP_ROUTES.PAYMENT_INFO}`
      );
    },
    onError: (err) => {
      setError(err?.response?.data?.message);
    },
  });

  const handleSubmit = () => {
    mutate({
      endpoint: endpoints.payInfo,
      body: form,
    });
  };

  return (
    <>
      {isError && <Notification message={error} onClose="" />}
      {isLoading || isPending ? (
        <LoadingPage />
      ) : (
     <div className="flex flex-col h-full">
        <div className={`grid grid-cols-[60%_40%] gap-x-[20px]`}>
          <div>
            {
              // @ts-ignore
              data?.vendor_form && (
                <DynamicForm
                // @ts-ignore
                  fields={data.vendor_form}
                  formData={formData}
                  setFormData={setFormData}
                />
              )
            }
          </div>

          {(activeInputType === "int" || activeInputType === "float") && (
            <NumericKeyboardCustom />
          )}
        </div>

    <motion.div
      className="mt-auto"
      initial="hidden"
      animate="visible"
      variants={bottomFadeUp}
    >
      {activeInputType === "string" ? (
        <CustomKeyboardLetter
          // @ts-ignore
          activeInput={activeInput}
          setInputValue={setActiveInput}
        />
      ): (
      <FooterNav
        prevClick={() => navigate(-1)}
        nextClick={() => handleSubmit()}
      />
      )}
     
    </motion.div>
  </div>
      )}
    </>
  );
};

export default ReplenishmentFine;
