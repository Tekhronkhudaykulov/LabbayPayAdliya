import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ASSETS } from "../../../assets/images/assets";
import { FooterNav, Text } from "../../../components";
import { useFormContext } from "../../../context/inputTypeContext";
import { APP_ROUTES } from "../../../router";

const PaymentInfo = () => {
    // @ts-ignore
    const { responseData } = useFormContext();
    const navigate = useNavigate();

    return (
        <>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-[#F4F4F4] p-[25px] rounded-[35px]"
            >
                <div>
                    <p className="text-[36px]">Выберите способ оплаты:</p>
                </div>
                <div className="bg-white flex justify-between items-center mt-[20px] p-[15px] rounded-[12px]">
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
                <div className="grid grid-cols-[60%_1fr] gap-[20px] mt-[10px]">
                    <div className="flex flex-col gap-[20px] bg-white p-[15px] rounded-[12px]">
                        {responseData?.vendor_info?.map((item: any, ind: any) => (
                            <div key={ind} className="flex items-center">
                                <div className="text-[22px] font-[500]">{item.label}</div>
                                <div className="text-[22px] ml-auto text-right">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                        <div
                            onClick={() => navigate(`${APP_ROUTES.PAYMENT_OF_FINE}/${APP_ROUTES.PAYMENT_OF_FINE_CASH}`)}
                            className="flex flex-col justify-center items-center h-full bg-white rounded-[12px] cursor-pointer"
                        >
                            <p className="text-[25px]">Наличными</p>
                            <img src={ASSETS.CashMoneyNew} alt="" />
                        </div>
                        <div
                            onClick={() => navigate(`${APP_ROUTES.PAY_TO_CARD}`)}
                            className="flex flex-col justify-center items-center bg-white h-full rounded-[12px] cursor-pointer"
                        >
                            <p className="text-[25px]">Банковской картой</p>
                            <img src={ASSETS.Card} alt="" />
                        </div>
                    </div>
                </div>
            </motion.div>
            <FooterNav showNextButton={false} prevClick={() => navigate(-1)} />
        </>
    );
};

export default PaymentInfo;
