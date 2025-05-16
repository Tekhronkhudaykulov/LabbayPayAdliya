import { FooterNav, Text } from "../../components"
import NumericKeyboardCustom from "../../components/CustomKeyboard/NumericKeyboard";
import { useFormContext } from "../../context/inputTypeContext";
import InputMask from "react-input-mask";
import { useCustomPost } from "../../hook/useCustomPost";
import endpoints from "../../services/endpoints";
import LoadingPage from "../../components/Loading/view";
import Notification from "../../components/Notification/view";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";



const PayToCardConfirm = () => {
    const navigate = useNavigate()
    // @ts-ignore
    const { responseData, form, setActiveInputKey,setResponseData,clearForm,setError, error } = useFormContext();


    console.log(responseData, 'data');
    
    
    
    const card_num = form["confirmCode"]?.length


    

    
    
    

    const { mutate, isPending, isError } = useCustomPost({
    onSuccess: async (res: any) => {
      setResponseData(res?.labbay_transaction_id);
      await clearForm();
      navigate(`${APP_ROUTES.SUCCESS}`);
    },
    onError: (err) => {
      setError(err?.response?.data?.message);
    },
    });

    console.log(form, 'form');
    

    const handleSubmit = () => {
        mutate({
        endpoint: endpoints.cardConfirm,
            body: {
                transaction_id: responseData?.transaction_id,
                confirm_code: form?.confirmCode
            },
        });
    };

    

    return (
     <>
     {isError && (
        <Notification message={error} onClose=""/>
     )}
     {isPending && (
        <LoadingPage/>
     )}
        <div className="grid  grid-cols-[65%_1fr] gap-x-[20px]">
            <div className="bg-[#F4F4F4] flex flex-col  rounded-[12px] gap-y-[20px] w-full p-[30px]">
                <div className="bg-white  flex justify-between items-center p-[20px]  rounded-[12px]">
                    <img
                        src={responseData?.vendor?.logo}
                        className="min-w-[88px] w-[88px] h-[88px] rounded-full object-contain"
                        alt=""
                    />
                    <Text
                        text={`${responseData?.vendor?.name}`}
                        className="text-[25px] font-bold"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="card-number" className="text-[30px] mb-[5px] text-gray-700 font-[500]">
                   **Введите СМС-код
                    </label>
                    <InputMask
                    id="confirmCode"
                    mask="9 9 9 9 9 9"
                    value={form["confirmCode"] || ""}
                    onFocus={() => setActiveInputKey("confirmCode")}
                    placeholder="_ _ _ _ _ _"
                    className="p-3 bg-white h-[75px] rounded-[12px] text-[27px]"
                    />
                </div>
                <div className="flex flex-col gap-y-[15px]">
                    <div className="flex items-center justify-between">
                        <p className="text-[30px] font-[500]">Номер карты оплаты:</p>
                        <p className="text-[30px] font-[bold]">{responseData?.masked_phone_number}</p>
                    </div>
                     <div className="flex items-center justify-between">
                        <p className="text-[30px] font-[500]">Статус</p>
                        <p className="text-[30px] font-[bold]">{responseData?.vendor?.status === "ACTIVE" && "Активный"}</p>
                    </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[30px] font-[500]">Номер терминала:</p>
                        <p className="text-[30px] font-[bold]">{responseData?.transaction_id}</p>
                    </div>
                </div>
              
            </div>
            <div className="bg-[#F4F4F4] rounded-[12px]">
                <NumericKeyboardCustom/>
            </div>
        </div>
        <div className="mt-auto">
            <FooterNav nextTitle="Получить СМС-код" nextClick={() => handleSubmit()} nextDisabled={card_num  !== 6}/>
        </div>
     </>
    )
}

export default PayToCardConfirm