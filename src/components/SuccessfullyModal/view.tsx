import { Modal, Result } from "antd";
import { FC, useEffect, useState } from "react";
import { ASSETS } from "../../assets/images/assets";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { vendorStore } from "../../store";
import { useNavigate } from "react-router-dom";
import ReactDOMServer from "react-dom/server";
import { APP_ROUTES } from "../../router";
import { Check } from "..";
import { CheckOutlined } from "@ant-design/icons";
import { CheckType } from "../../types";
import QRCode from "qrcode";
import { useTranslation } from "react-i18next";
import logoImage from "../../assets/images/Logo.svg";

interface Props {
  open?: boolean;
}

const SuccessfullyModal: FC<Props> = ({ open }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { check } = vendorStore();
  const [qrDataURL, setQRDataURL] = useState(null);

  const generateQRCode = async () => {
    try {
      const qrDataURL = await QRCode.toDataURL("https://instagram.com");
      return qrDataURL;
    } catch (error) {
      console.error("Error generating QR code:", error);
      return null;
    }
  };
  const [base64IMG, setBase64IMG] = useState("");
  const convertToBase64 = () => {
    fetch(logoImage)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          // @ts-ignore
          setBase64IMG(base64data);
        };
      })
      .catch((error) => console.error("Failed to convert to base64:", error));
  };
  useEffect(() => {
    generateQRCode().then((dataURL: any) => {
      setQRDataURL(dataURL);
    });
    convertToBase64();
  }, [logoImage]);

  const onPrint = () => {
    window.ipcRenderer.send(
      "print-command-request",
      ReactDOMServer.renderToStaticMarkup(
        <div className={`check`}>
          <div className={`flex flex-col`}>
            <div className="check-image-block">
              <img src={base64IMG} className="check-image" alt="" />
            </div>
            {/* <div className="check-title text-[18px] text-center font-700 mb-2">
              LABBAY PAY
            </div> */}
            <div className="check-block">
              <div className="check-left-text">{t("ID")}</div>
              <div className="check-right-text">{check?.id}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("status")}</div>
              <div className="check-right-text">{check?.status?.string}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("amount")}</div>
              <div className="check-right-text">{check?.amount}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("commission_amount")}</div>
              <div className="check-right-text">{check?.commission_amount}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("payer_phone")}</div>
              <div className="check-right-text">{check?.payer_phone}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("vendor")}</div>
              <div className="check-right-text">
                {check?.vendor?.short_name}
              </div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("card_number")}</div>
              <div className="check-right-text">{check?.card_number}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("account")}</div>
              <div className="check-right-text">{check?.account}</div>
            </div>
            <div className="check-block">
              <div className="check-left-text">{t("date")}</div>
              <div className="check-right-text">
                {check?.created_at?.dateTime}
              </div>
            </div>
          </div>
          {Array.isArray(check?.childTransactions) &&
            check?.childTransactions?.map((item: CheckType, idx: number) => (
              <div className={`flex flex-col mt-2 pt-2`} key={idx}>
                <div className="check-image-block">
                  <img src={base64IMG} className="check-image" alt="" />
                </div>
                {/* <div className="check-title text-[18px] text-center font-700 mb-2">
              LABBAY PAY
            </div> */}
                <div className="check-block">
                  <div className="check-left-text">{t("ID")}</div>
                  <div className="check-right-text">{item?.id}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("status")}</div>
                  <div className="check-right-text">{item?.status?.string}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("amount")}</div>
                  <div className="check-right-text">{item?.amount}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">
                    {t("commission_amount")}
                  </div>
                  <div className="check-right-text">
                    {item?.commission_amount}
                  </div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("payer_phone")}</div>
                  <div className="check-right-text">{item?.payer_phone}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("vendor")}</div>
                  <div className="check-right-text">
                    {item?.vendor?.short_name}
                  </div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("card_number")}</div>
                  <div className="check-right-text">{item?.card_number}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("account")}</div>
                  <div className="check-right-text">{item?.account}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("date")}</div>
                  <div className="check-right-text">
                    {item?.created_at?.dateTime}
                  </div>
                </div>
              </div>
            ))}
          {Array.isArray(check?.parentTransaction) &&
            check?.parentTransaction?.map((item: CheckType, idx: number) => (
              <div className={`flex flex-col mt-2 pt-2`} key={idx}>
                <div className="check-image-block">
                  <img src={base64IMG} className="check-image" alt="" />
                </div>
                {/* <div className="check-title text-[18px] text-center font-700 mb-2">
              LABBAY PAY
            </div> */}
                <div className="check-block">
                  <div className="check-left-text">{t("ID")}</div>
                  <div className="check-right-text">{item?.id}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("status")}</div>
                  <div className="check-right-text">{item?.status?.string}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("amount")}</div>
                  <div className="check-right-text">{item?.amount}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">
                    {t("commission_amount")}
                  </div>
                  <div className="check-right-text">
                    {item?.commission_amount}
                  </div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("payer_phone")}</div>
                  <div className="check-right-text">{item?.payer_phone}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("vendor")}</div>
                  <div className="check-right-text">
                    {item?.vendor?.short_name}
                  </div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("card_number")}</div>
                  <div className="check-right-text">{item?.card_number}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("account")}</div>
                  <div className="check-right-text">{item?.account}</div>
                </div>
                <div className="check-block">
                  <div className="check-left-text">{t("date")}</div>
                  <div className="check-right-text">
                    {item?.created_at?.dateTime}
                  </div>
                </div>
              </div>
            ))}
          {/* {check?.cheque_details && ( */}
          <div className="check-qr-block">
            {qrDataURL && <img className="check-qr" src={qrDataURL} alt="" />}
          </div>
          <div className="check-block">
            <div className="check-left-text">Тех. роддержка</div>
            <div className="check-right-text">+998 33 776 36 36</div>
          </div>
          {/* )} */}
        </div>
      )
    );
  };

  return (
    <Modal
      footer={null}
      open={open}
      classNames={{
        content: "!rounded-[44px] !w-[90vw] h-[90vh]",
        body: "h-full flex flex-col items-center justify-center",
      }}
      className="!w-[90vw] h-[90vh] !m-auto"
      centered
    >
      <Result
        status="success"
        className="p-0 [&>div>span>svg]:text-[120px] [&>div>span>svg]:fill-green [&>div]:!mb-0 [&>div]:!mt-6"
      />
      {/* <img src={ASSETS.successfullyImage} className="mt-auto" alt="" /> */}
      <div className="text-[44px] text-center text-green">
        {t("payment_was_successful")}
      </div>
      <div className="text-[31px] text-center text-green font-400">
        {t("send_check_text")}
      </div>
      <Check className="w-[300px] mt-10" />
      <div className="flex w-full mt-auto">
        <button
          onClick={onPrint}
          className="bg-purple text-[20px] shadow-button rounded-button ml-16 mr-8 text-white py-3 px-6 flex items-center justify-center gap-2"
        >
          <LazyLoadImage src={ASSETS.checkImage} effect="opacity" alt="" />
          {t("print_a_receipt")}
        </button>
        {/* <button className="bg-purple text-[20px] shadow-button rounded-button mr-16 text-white py-3 px-6 flex items-center gap-3">
          <PhoneOutlined className="[&>svg]:text-[24px]" />
          Отправить чек на телефон
        </button> */}
        <button
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="bg-purple text-[20px] shadow-button rounded-button ml-auto mr-16 text-white py-3 px-12 flex items-center gap-3"
        >
          <CheckOutlined className="[&>svg]:text-[24px]" />
          {t("main")}
        </button>
      </div>
    </Modal>
  );
};

export default SuccessfullyModal;
