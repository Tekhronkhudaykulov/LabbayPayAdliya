import { APP_ROUTES } from ".";

import {
  SupportService,
  Services,
  ReplenishmentPhone,
  TypePayment,
  PayPhone,
  PhoneCash,
  PhoneTerminal,
  SuccessPage,
  CheckPage,
  ChooseService,
  PaymentOfFines,
  ReplenishmentFine,
  PaymentOfFineType,
  PaymentOfFineCash,
  OverPlayQue,
  OverPlaySendSms,
  OverPlaySendCheck,
  RegisterCar,
  DataCheckingCar,
  PaymentOfRegister,
  PaymentOfRegisterCarType,
  PaymentOfRegisterCarCash,
  PaymentOfRegisterTerminal,
  TopUpBalance,
  TopUpBalanceInfo,
  WithdrawMoney,
  WithDrawMoneyAddInfo,
  WithDrawMoneySms,
  Qr,
  PaymentInfo,
  PayToCard,
  PayConfirmCard
} from "../views";

export const _routes = [
  {
    path: APP_ROUTES.HOME,
    element: Services,
    exact: true,
  },
  {
    path: APP_ROUTES.SUPPORT_SERVICE,
    element: SupportService,
  },
    {
    path: APP_ROUTES.QR,
    element: Qr,
  },
  
  {
    path: APP_ROUTES.SERVICES,
    element: Services,
  },
  {
    path: APP_ROUTES.REPLENISHMENT_PHONE,
    element: ReplenishmentPhone,
  },
  {
    path: `${APP_ROUTES.CHOOSE_SERVICE}/:id`,
    element: ChooseService,
  },
  {
    path: `${APP_ROUTES.REPLENISHMENT_FINE}/:id`,
    element: ReplenishmentFine,
  },
  {
    path: APP_ROUTES.PAYMENT_INFO,
    element: PaymentInfo,
  },
  {
    path: APP_ROUTES.PAY_TO_CARD,
    element: PayToCard,
  },
    {
    path: APP_ROUTES.PAY_CARD_CONFIRM,
    element: PayConfirmCard,
  },
  {
    path: APP_ROUTES.PAYMENT_OF_FINE,
    element: PaymentOfFines,
  },
  {
    path: APP_ROUTES.PAYMENT_OF_FINE,
    element: PaymentOfFines,
    childs: [
      {
        path: APP_ROUTES.PAYMENT_OF_FINE_TYPE,
        element: PaymentOfFineType,
      },
      {
        path: APP_ROUTES.PAYMENT_OF_FINE_CASH,
        element: PaymentOfFineCash,
      },
      {
        path: APP_ROUTES.PHONE_TERMINAL,
        element: PhoneTerminal,
      },
    ],
  },
  {
    path: APP_ROUTES.PAY_PHONE,
    element: PayPhone,
  },
  {
    path: APP_ROUTES.PAY_PHONE,
    element: PayPhone,
    childs: [
      {
        path: APP_ROUTES.TYPE_PAYMENT,
        element: TypePayment,
      },
      {
        path: APP_ROUTES.PHONE_CASH,
        element: PhoneCash,
      },
      {
        path: APP_ROUTES.PHONE_TERMINAL,
        element: PhoneTerminal,
      },
    ],
  },
  {
    path: APP_ROUTES.SUCCESS,
    element: SuccessPage,
  },
  {
    path: APP_ROUTES.CHECK,
    element: CheckPage,
  },
  {
    path: APP_ROUTES.OVER_PLAY_QUE,
    element: OverPlayQue,
  },
  {
    path: APP_ROUTES.OVER_PLAY_SEND_SMS,
    element: OverPlaySendSms,
  },
  {
    path: APP_ROUTES.OVER_PLAY_SEND_CHECK,
    element: OverPlaySendCheck,
  },
  {
    path: APP_ROUTES.REGISTER_CAR,
    element: RegisterCar,
  },
  {
    path: APP_ROUTES.DATA_CHECKING_CAR,
    element: DataCheckingCar,
  },
  {
    path: APP_ROUTES.PAYMENT_OF_REGISTER_CAR,
    element: PaymentOfRegister,
  },
  {
    path: APP_ROUTES.PAYMENT_OF_REGISTER_CAR,
    element: PaymentOfRegister,
    childs: [
      {
        path: APP_ROUTES.PAYMENT_OF_REGISTER_CAR_TYPE,
        element: PaymentOfRegisterCarType,
      },
      {
        path: APP_ROUTES.PAYMENT_OF_REGISTER_CAR_CASH,
        element: PaymentOfRegisterCarCash,
      },
      {
        path: APP_ROUTES.PAYMENT_OF_REGISTER_TERMINAL,
        element: PaymentOfRegisterTerminal,
      },
    ],
  },
  {
    path: APP_ROUTES.TOPUPBALANCE,
    element: TopUpBalance,
  },
  {
    path: APP_ROUTES.TOPUPBALANCEINFO,
    element: TopUpBalanceInfo,
  },
  {
    path: APP_ROUTES.WITHDRAWMONEY,
    element: WithdrawMoney,
  },
  {
    path: APP_ROUTES.WITHDRAWMONEY,
    element: WithdrawMoney,
    childs: [
      {
        path: APP_ROUTES.WITH_DRAW_MONEY_ADD_INFO,
        element: WithDrawMoneyAddInfo,
      },
      {
        path: APP_ROUTES.WITH_DRAW_MONEY_SMS,
        element: WithDrawMoneySms,
      },
    ],
  },
];
