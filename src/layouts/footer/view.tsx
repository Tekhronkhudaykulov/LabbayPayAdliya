import { useLocation } from "react-router-dom";
import { Text } from "../../components";
import { showItemInPages } from "../../utils";
import { APP_ROUTES } from "../../router";

const Footer = () => {
  const { pathname } = useLocation();
  const routes = [
    APP_ROUTES.HOME,
    APP_ROUTES.SERVICES,
    APP_ROUTES.SUPPORT_SERVICE,
  ];
  return (
    <>
      {showItemInPages(routes, pathname) ? (
        <footer className="py-4">
          <div className="wrapper">
            <div className="flex items-center justify-between">
              <Text
                text="Terminal #123456789 v1.01"
                className="italic text-[24px]"
              />
              <Text
                text="30 Сентября. 2022 год. 14:08:35"
                className="italic text-[24px]"
              />
            </div>
          </div>
        </footer>
      ) : null}
    </>
  );
};

export default Footer;
