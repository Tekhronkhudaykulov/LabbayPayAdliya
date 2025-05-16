import currencyNameList from "./consts/currencyNameList";

const serialPortConfig = {
    baudrate: 9600,   // default: 9600
    databits: 7,      // default: 8
    stopbits: 1,      // default: 2
    parity: 'even',   // default: 'none'
    currency: currencyNameList.UZS,
    escrowMode: false
};

export default serialPortConfig;
