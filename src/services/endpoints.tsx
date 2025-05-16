const endpoints = {
  category: '/category',
  vendor: '/vendor',
  vendorById: (id) => `/vendor/${id}/forms`,
  payInfo: 'payment/pay-info',
  openConnection: "OpenConnection",
  createPay: "payment/pay-by-cash",
  checkInfo: "payment/get-cheque-details",
  print: "print",
  payQr: "payment/pay-qr",
  cardPrepare: "payment/pay-prepare",
  cardConfirm: "payment/pay-confirm"
};

export default endpoints;