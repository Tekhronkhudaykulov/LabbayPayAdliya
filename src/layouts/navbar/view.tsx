import { Logo } from "../../components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ASSETS } from "../../assets/images/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../router";
import { unShowItemInPages } from "../../utils";
import { useFormContext } from "../../context/inputTypeContext";
import axios from "axios";
// import { Button } from "antd";
// import { changeLanguage } from "../../helpers/api";
// import { useTranslation } from "react-i18next";

const homeButtonRoutes = [
  APP_ROUTES.HOME,
  APP_ROUTES.SERVICES,
  APP_ROUTES.SUPPORT_SERVICE,
  APP_ROUTES.SUCCESS,
  APP_ROUTES.CHECK,
];
// const supportServiceButtonRoutes = [
//   APP_ROUTES.SERVICES,
//   APP_ROUTES.SUPPORT_SERVICE,
//   APP_ROUTES.SUCCESS,
//   APP_ROUTES.CHECK,
//   APP_ROUTES.HOME,

// ];
// const checkButtonRoutes = [
//   APP_ROUTES.SERVICES,
//   APP_ROUTES.HOME,

//   APP_ROUTES.SUPPORT_SERVICE,
//   APP_ROUTES.SUCCESS,
//   APP_ROUTES.CHECK,
// ];

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const deviceID = localStorage.getItem("device_id")

  // @ts-ignore
  const { clearForm } = useFormContext();
  // const { t, i18n } = useTranslation();

  return (
    <nav className="bg-white py-[16px] z-[99]">
      <div className="wrapper">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          {/* {unShowItemInPages(checkButtonRoutes, pathname) ? (
            <button className="ml-auto bg-purple h-[78px] text-[24px] gap-6 rounded-button text-white w-[145px] flex items-center justify-center">
              Чек
              <LazyLoadImage src={ASSETS.checkImage} effect="opacity" alt="" />
            </button>
          ) : null} */}
          <div className="flex gap-x-[10px]">
            {/* {unShowItemInPages(supportServiceButtonRoutes, pathname) ? (
            <button
              onClick={() => navigate(APP_ROUTES.SUPPORT_SERVICE)}
              className="bg-purple h-[78px] text-[24px] gap-6 rounded-button text-white w-[335px] flex items-center justify-center"
            >
              Служба поддержки
              <LazyLoadImage src={ASSETS.HelpCenter} effect="opacity" alt="" />
            </button>
          ) : null} */}
            {unShowItemInPages(homeButtonRoutes, pathname) ? (
              <button
                onClick={  () => {
                   clearForm();
                   axios.post(`http://localhost:5555/cash/api/CashDevice/StopDevice?deviceID=${deviceID}`)
                   navigate(APP_ROUTES.HOME);
                }}
                className="bg-orange h-[78px] text-[24px] gap-6 rounded-button text-white w-[355px] flex items-center justify-center"
              >
                Вернуться на главную
                <LazyLoadImage src={ASSETS.HomeImage} effect="opacity" alt="" />
              </button>
            ) : null}
          </div>
          {/* <Button
            type={i18n.language === "uz" ? "default" : "primary"}
            className="rounded-main shadow-button py-[5px] h-[38px] w-[135px]"
            onClick={() => changeLanguage("ru")}
          >
            {t("russian")}
          </Button>
          <Button
            type={i18n.language === "ru" ? "default" : "primary"}
            className="rounded-main shadow-button py-[5px] h-[38px] w-[135px] text-purple font-700"
            onClick={() => changeLanguage("uz")}
          >
            {t("uzbek")}
          </Button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
