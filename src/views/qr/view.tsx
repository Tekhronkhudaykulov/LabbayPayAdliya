import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ASSETS } from "../../assets/images/assets";
import { useFormContext } from "../../context/inputTypeContext";
import Notification from "../../components/Notification/view";

import LoadingPage from "../../components/Loading/view";
import { motion } from "framer-motion";
import endpoints from "../../services/endpoints";
import { useCustomPost } from "../../hook/useCustomPost";
import { APP_ROUTES } from "../../router";

const QrPage = () => {
  const [seconds, setSeconds] = useState(60);

  // @ts-ignore
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  // @ts-ignore
  const { setResponseData,setError,error} = useFormContext(); 

  // Avto timer
  useEffect(() => {
    if (seconds === 0) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  // Fokus tiklash
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    window.addEventListener("click", focusInput);
    return () => window.removeEventListener("click", focusInput);
  }, []);

  const isJson = (raw ) => {
    try{
        JSON.parse(raw) 
        return true
    }catch (e) {
      return false
    }
  }

  const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    if(isJson(raw)){
      handleSubmit(JSON.parse(raw))
      e.target.value =""
    }
  };


  const { mutate, isPending, isError } = useCustomPost({
    onSuccess: async (res) => {
      console.log(res, 'res');
      
        await setResponseData(res);
        navigate(`${APP_ROUTES.PAYMENT_OF_FINE}/${APP_ROUTES.PAYMENT_OF_FINE_CASH}`)
    },
    onError: (err) => {
      console.log(err, 'error');
      setError(err?.response?.data?.message);
    },
  });

  const handleSubmit = (data) => {
    mutate({
      endpoint: endpoints.payQr,
      body: {
        s_id: Number(data.s_id),
        p_acc: data.p_acc,
      }
    });
  };

  // const fadeDown = {
  //   hidden: { opacity: 0, y: -30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.5, ease: "easeInOut" },
  //   },
  // };
  // };

  
  return (

    <>

      {isPending && <LoadingPage />}
      {isError && <Notification message={error}  onClose="" />}

      <motion.div
        className="h-full flex flex-col gap-[30px] p-[70px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
        }}
      >
        <div className="grid grid-cols-[1fr_1fr] gap-[45px]">
          <div className="flex flex-col gap-[27px]">
            <h2 className="text-[50px] font-bold">ОТСКАНИРУЙТЕ КОД</h2>
            <hr className="border-[#5960FE]" />
            <h2 className="text-[50px] font-bold">Инструкция</h2>
            <p className="text-[32px] font-medium">
              1. Поднесите QR/Штрих код к сканеру
            </p>
            <p className="text-[32px] font-medium">
              2. Зелёная метка сканера должна попасть на QR/Штрих код
            </p>
            <p className="text-[32px] font-medium">
              3. Если хотите ввести номер квитанции вручную или выйти на экран оплаты, то, нажмите на кнопку “Закрыть”
            </p>

            <input
              ref={inputRef}
              type="text"
              onChange={handleChange}
              className="absolute opacity-0 -z-10"
              autoFocus
            />
          </div>
          <div>
            <img src={ASSETS.QrPageImg} alt="QR scan instruction" />
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-[#C82E2E] text-[28px] mt-auto py-[40px] rounded-[16px] text-white w-[80%] mx-auto"
        >
          Закрыть ({seconds})
        </button>
      </motion.div>
    </>
  );
};

export default QrPage;
