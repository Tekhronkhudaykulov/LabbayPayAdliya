
import { ASSETS } from "../../assets/images/assets";
import LanguageBtn from "../../components/LanguageBtn/view";
import "./style.scss";
import ServicesCard from "../../components/Cards/ServiceCard/view";
import { APP_ROUTES } from "../../router";
import { useNavigate } from "react-router-dom";
import ServivePaymentCard from "../../components/Cards/ServiceCard/ServicePaymentCard";
import { useCustomGet } from "../../hook/useCustomGet";
import endpoints from "../../services/endpoints";
import LoadingPage from "../../components/Loading/view";
import { IoQrCodeOutline } from "react-icons/io5";
import { motion } from "framer-motion";

// Fade-up variant faqat pastgi bloklar uchun
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

const Services = () => {
  const visitorId = localStorage.getItem("visitor_id");
  const navigate = useNavigate();

  const { data, isLoading } = useCustomGet({
    key: "category",
    headers: {
      "x-device-id": visitorId,
    },
    endpoint: endpoints.category,
    onSuccess: () => console.log("Maʼlumotlar keldi"),
  });

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="flex items-center mx-auto w-[90%]">
            <div className="w-[65%] relative">
              <p className="text-[45px] leading-[55px]">

                Оплата государственных услуг
                <span className="text-[#3B41C6] text-[45px]"> быстро и удобно</span>
                <span className="ml-[10px] text-[#3B41C6] text-[45px]">с</span> Labbay Pay:
              </p>

              <button
                onClick={() => navigate(APP_ROUTES.QR)}
                className="flex button-gradient-service gap-[10px] text-white text-[25px] font-[700] rounded-[10px] mb-[20px] bg-[blue] h-[75px] items-center px-[20px] mt-[21px]"
              >
                Провести оплату по Qr
                <IoQrCodeOutline size={35} />
              </button>

              <div className="flex gap-x-[5px]">
                {[ASSETS.Sum, ASSETS.Uzcard, ASSETS.Humo].map((img, idx) => (
                  <div
                    key={idx}
                    className="border-[#E7E7E7] border-[2px] w-max rounded-[10px] p-[5px]"
                  >
                    <img src={img} className="h-[100%]" alt="" />
                  </div>
                ))}
              </div>
            </div>

            <img
              className="object-cover w-[43%] absolute left-[57%] top-[-1%] z-[9999]"
              src={ASSETS.ServiceBanner}
              alt=""
            />
          </div>

          <div className="bg-gradient-service absolute w-full z-[-9999] top-[24%] left-0"></div>

          {/* Tillar blok – animatsiyasiz */}
          <div className="my-[15px]">
            <div className="flex items-center justify-between">
              <p className="text-[35px] font-font700 text-white">
                Выберите услугу:
              </p>
              <div className="flex gap-x-[14px]">
                <LanguageBtn title="O’Z" img={ASSETS.UzFlag} isHas={false} />
                <LanguageBtn title="РУ" img={ASSETS.RuFlag} isHas={true} />
                <LanguageBtn title="EN" img={ASSETS.EngFlag} isHas={false} />
              </div>
            </div>
          </div>

          {/* Pastdan chiqadigan bloklar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="flex gap-x-[10px] flex-grow overflow">
              {
                // @ts-ignore
              data?.data?.map((item: any, ind: any) => (
                <div key={ind}>
                  <ServicesCard
                    item={item}
                    disabled={false}
                    className="w-full h-full card-gradient-service"
                    onClick={() =>
                      navigate(`${APP_ROUTES.CHOOSE_SERVICE}/${item.id}`)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-x-[20px] mt-[20px]">
              <ServivePaymentCard
                disabled={true}
                title="Пополнить карту UZCARD/HUMO"
                img={ASSETS.HumoAndUzc}
                className="mt-[19px] ml-[21px]"
              />
              <ServivePaymentCard
                disabled={true}
                title="Снять средства с карты UZCARD/HUMO"
                img={ASSETS.CashMoney}
                className="mt-[19px] ml-[21px]"
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Services;
