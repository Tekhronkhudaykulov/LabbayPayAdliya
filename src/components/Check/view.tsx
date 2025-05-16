import { QRCode } from "antd";
import { vendorStore } from "../../store";
import { FC } from "react";
import { CheckType } from "../../types";
import "./module.css";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  show?: boolean;
}

const Check: FC<Props> = ({ className, show }) => {
  const { t } = useTranslation();
  const { check } = vendorStore();

  return (
    <div className={`check ${className}`}>
      <div className={`flex flex-col`}>
        <div className="check-title text-[18px] text-center font-700 mb-2">
          LABBAY PAY
        </div>
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
          <div className="check-right-text">{check?.vendor?.short_name}</div>
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
          <div className="check-right-text">{check?.created_at?.dateTime}</div>
        </div>
      </div>
      {show && (
        <>
          {Array.isArray(check?.childTransactions) &&
            check?.childTransactions?.map((item: CheckType, idx: number) => (
              <div className="mt-2 pt-2" key={idx}>
                <div className="block border-t border-dashed">
                  <div className="left-text">ID</div>
                  <div className="right-text">{item?.id}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Currency</div>
                  <div className="right-text">{item?.currency}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Status</div>
                  <div className="right-text">{item?.status?.string}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Payer Phone</div>
                  <div className="right-text">{item?.payer_phone}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Поставщик</div>
                  <div className="right-text">{item?.vendor?.short_name}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Card Number</div>
                  <div className="right-text">{item?.card_number}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Лицевой счёт</div>
                  <div className="right-text">{item?.account}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Date</div>
                  <div className="right-text">{item?.created_at?.dateTime}</div>
                </div>
              </div>
            ))}
          {Array.isArray(check?.parentTransaction) &&
            check?.parentTransaction?.map((item: CheckType, idx: number) => (
              <div className="mt-2 pt-2" key={idx}>
                <div className="block border-t border-dashed">
                  <div className="left-text">ID</div>
                  <div className="right-text">{item?.id}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Currency</div>
                  <div className="right-text">{item?.currency}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Status</div>
                  <div className="right-text">{item?.status?.string}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Payer Phone</div>
                  <div className="right-text">{item?.payer_phone}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Поставщик</div>
                  <div className="right-text">{item?.vendor?.short_name}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Card Number</div>
                  <div className="right-text">{item?.card_number}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Лицевой счёт</div>
                  <div className="right-text">{item?.account}</div>
                </div>
                <div className="block border-t border-dashed">
                  <div className="left-text">Date</div>
                  <div className="right-text">{item?.created_at?.dateTime}</div>
                </div>
              </div>
            ))}
        </>
      )}
      {/* {check?.cheque_details && ( */}
      <div className="check-qr-block my-4">
        <QRCode value={"asd"} />
      </div>
      {/* )} */}
    </div>
  );
};

export default Check;
