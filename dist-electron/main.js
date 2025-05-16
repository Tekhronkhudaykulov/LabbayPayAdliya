"use strict";
const electron = require("electron");
const path = require("node:path");
const fs = require("fs");
const os = require("os");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fs__namespace = /* @__PURE__ */ _interopNamespaceDefault(fs);
const states = [
  {
    name: "IDLING",
    description: "Waiting for a bill/bar code",
    type: "transient",
    byte: 0,
    bit: 0
  },
  {
    name: "ACCEPTING",
    description: "Drawing a bill/bar code in",
    type: "transient",
    byte: 0,
    bit: 1
  },
  {
    name: "ESCROWED",
    description: "Note/barcode now in Escrow",
    type: "persistent",
    byte: 0,
    bit: 2,
    denomination: true
  },
  {
    name: "STACKING",
    description: "In the Stacking process",
    type: "transient",
    byte: 0,
    bit: 3
  },
  {
    name: "STACKED",
    description: "The bill/bar code has been Stacked",
    type: "event",
    byte: 0,
    bit: 4,
    denomination: true
  },
  {
    name: "RETURNING",
    description: "Returning a bill/bar code",
    type: "transient",
    byte: 0,
    bit: 5
  },
  {
    name: "RETURNED",
    description: "Bill/bar code has been Returned",
    type: "event",
    byte: 0,
    bit: 6,
    denomination: true
  },
  {
    name: "CHEATED",
    description: "A Cheat has been detected",
    type: "event",
    byte: 1,
    bit: 0
  },
  {
    name: "REJECTED",
    description: "A bill/bar code was Rejected",
    type: "event",
    byte: 1,
    bit: 1
  },
  {
    name: "JAMMED",
    description: "The Acceptor is Jammed",
    type: "persistent",
    byte: 1,
    bit: 2
  },
  {
    name: "CASSETTE_FULL",
    description: "The Cassette is Full",
    type: "persistent",
    byte: 1,
    bit: 3
  },
  {
    name: "LRC_REMOVED",
    description: "Lockable Removable Cassette is removed",
    type: "persistent",
    negative: true,
    byte: 1,
    bit: 4
  },
  {
    name: "PAUSED",
    description: "The Acceptor is paused",
    type: "persistent",
    byte: 1,
    bit: 5
  },
  {
    name: "CALIBRATION",
    description: "Entering Calibration mode",
    type: "state",
    byte: 1,
    bit: 6
  },
  {
    name: "POWER_UP",
    description: "The Acceptor has just been reset",
    type: "event",
    byte: 2,
    bit: 0
  },
  {
    name: "INVALID_COMMAND",
    description: "Invalid command was received",
    type: "event",
    byte: 2,
    bit: 1
  },
  {
    name: "FAILURE",
    description: "Requires reset or repair",
    type: "persistent",
    byte: 2,
    bit: 2
  },
  {
    name: "NO_PUSH_MODE",
    description: "Acceptor is stalled in the No Push Mode",
    type: "persistent",
    byte: 3,
    bit: 0
  },
  {
    name: "FLASH_DOWNLOAD",
    description: "Entering Flash Download mode",
    type: "state",
    byte: 3,
    bit: 1
  },
  {
    name: "PRESTACK",
    description: "The bill is not retrievable",
    type: "event",
    byte: 3,
    bit: 2
  }
];
const commands = {
  SOFTWARE_CRC: {
    data: [0, 0, 0],
    description: "Acceptor's Software CRC",
    type: 96,
    responseLength: 11
  },
  CASH_VALUE_IN_CASSETTE: {
    data: [0, 0, 1],
    description: "The total value of all the notes in the cash box.",
    type: 96,
    responseLength: 11
  },
  NUMBER_OF_ACCEPTOR_RESETS: {
    data: [0, 0, 2],
    description: "Total number of Power up/resets the Acceptor has performed",
    type: 96,
    responseLength: 11
  },
  CLEAR_CASH_VALUE_IN_CASSETTE: {
    data: [0, 0, 3],
    description: "Acceptor clears its note value counter to zero.",
    type: 96,
    responseLength: 11
  },
  ACCEPTOR_TYPE: {
    data: [0, 0, 4],
    description: "The Acceptor responds with a non-zero terminated ASCII string.",
    type: 96,
    responseLength: 25
  },
  ACCEPTOR_SERIAL_NUMBER: {
    data: [0, 0, 5],
    description: "The Acceptor responds with a non-zero terminated ASCII string.",
    type: 96,
    responseLength: 25
  },
  ACCEPTOR_BOOT_SOFTWARE_VERSION: {
    data: [0, 0, 6],
    description: "The Acceptor responds with a non-zero terminated ASCII string.",
    type: 96,
    responseLength: 14
  },
  ACCEPTOR_APPLICATION_SOFTWARE_VERSION: {
    data: [0, 0, 7],
    description: "The Acceptor responds with a non-zero terminated ASCII string.",
    type: 96,
    responseLength: 14
  },
  ACCEPTOR_VARIANT_NAME: {
    data: [0, 0, 8],
    description: "The Acceptor responds with a non-zero terminated ASCII string.",
    type: 96,
    responseLength: 37
  },
  ACCEPTOR_VARIANT_VERSION: {
    data: [0, 0, 9],
    description: "The Acceptor responds with a non-zero terminated ASCII string.",
    type: 96,
    responseLength: 14
  },
  ACCEPTOR_AUDIT_LIFE_TIME_TOTALS: {
    data: [0, 0, 10],
    description: "The Acceptor responds with an array of 32 bit integer values.",
    type: 96,
    responseLength: 53
  },
  ACCEPTOR_AUDIT_QP_MEASURES: {
    data: [0, 0, 11],
    description: "The Acceptor responds with an array of 16 bit integer values.",
    type: 96,
    responseLength: 61
  },
  ACCEPTOR_AUDIT_GENERAL_PERFORMANCE_MEASURES: {
    data: [0, 0, 12],
    // data: [0xDA, 0xDA, 0xDA],
    description: "The Acceptor responds with an array of 16 bit integer values.",
    type: 96,
    responseLength: 77
  },
  SOFT_RESET: {
    data: [127, 127, 127],
    description: "Acceptor will reset and perform power up initialization.",
    type: 96
  },
  SETUP: {
    data: [0, 0, 0],
    description: "Configure device according to configuration",
    type: 16,
    responseLength: 11
  },
  POLL: {
    data: [0, 0, 0],
    description: "",
    type: 16,
    responseLength: 11
  },
  ENABLE: {
    data: [0, 0, 0],
    description: "Open configured channels and start accepting bills",
    type: 16,
    responseLength: 11
  },
  DISABLE: {
    data: [0, 0, 0],
    description: "Inhibit all the channels and stop accepting bills",
    type: 16,
    responseLength: 11
  },
  STACK: {
    data: [0, 0, 0],
    description: "Stack the Bill",
    type: 16,
    responseLength: 11
  },
  RETURN: {
    data: [0, 0, 0],
    description: "Return the Bill",
    type: 16,
    responseLength: 11
  },
  QUERY_EXPANDED_NOTE_SPECIFICATION: {
    data: [0, 0, 0],
    description: "",
    type: 112,
    subtype: 2
  }
};
const models = {
  1: "Series 1000 ZT1000 USD (United States)",
  17: "Series 1000 ZT1100 USD (United States)",
  12: "Series 1000 ZT1107 USD (United States)",
  20: "Series 1000 ZT1200 USD (United States)",
  15: "Series 1000 ZT1200 AUD (Australia)",
  22: "Series 1000 ZT1200 CAD (Canada)",
  65: "Series 2000 AUD (Australia)",
  67: "Series 2000 CAD (Canada)",
  69: "Series 2000 USD (United States) Economy (Generation 1 Platform - VN2500)",
  70: "Series 2000 China",
  72: "Series 2000 USD (United States) Economy (Generation 1 Platform - AE24V)",
  80: "Series 2000 USD (United States) Premium (Generation 2 Platform - AE2600)",
  81: "Series 2000 Philippine",
  82: "Series 2000 USD (United States) Reference (Generation 1 Platform - VN2500)",
  86: "Series 2000 USD (United States) Reference(Generation 2 Platform - VN2500)",
  87: "Series 2000 Brazil (Generation 2 Platform)",
  88: "Series 2000 USD (United States) AE2800 Expanded Premium (Generation 2 Platform)",
  30: "Series 3000 USD (United States) Series 3000 VFX (BDS)",
  31: "Series 3000 USD (United States) Series 3000 EBDS",
  74: "CASHFLOW SC 66 (Fixed Width)",
  84: "CASHFLOW SC 83 (Multi Width / Supports Extended Note Reporting)",
  85: "CASHFLOW SC 66 (Supports Extended Note Reporting)"
};
const currencies = {
  USD: [1, 2, 5, 10, 20, 50, 100],
  AUD: [null, null, 5, 10, 20, 50, 100],
  CAD: [null, 5, 10, 20, 50, 100, null],
  EUR: [5, 10, 20, 50, 100, 200, 500],
  GBP: [1, 5, 10, 20, null, null, null],
  UZS: [1e3, 2e3, 5e3, 1e4, 2e4, 5e4, 1e5]
};
function bitTest(num, bit) {
  return (num >> bit) % 2 !== 0;
}
function bitSet(num, bit) {
  return num | 1 << bit;
}
function bitClear(num, bit) {
  return num & ~(1 << bit);
}
function bitExtract(num, count, position) {
  return (1 << count) - 1 & num >> position;
}
function calculateChecksum(bufer) {
  return [...bufer].reduce((accum, value) => accum ^ value, 0);
}
function readField16(bufer, field) {
  return parseInt(
    bufer.slice(field * 4, field * 4 + 4).reduce((accum, val) => accum + (val & 15).toString(16), ""),
    16
  );
}
function readField32(bufer, field) {
  return parseInt(
    bufer.slice(field * 8, field * 8 + 8).reduce((accum, val) => accum + (val & 15).toString(32), ""),
    16
  );
}
function parse(bufer, currentCommand, currency = "USD", ackNumber) {
  const LENGTH = bufer[1];
  const CTL = bufer[2];
  let DATA = bufer.slice(3, LENGTH - 2);
  const CHEHCKSUM = bufer[bufer.length - 1];
  const MESSAGE_TYPE = (CTL & 240) >> 4;
  const ACK_NUMBER = CTL >> 0 & 1;
  let result = {
    success: true,
    command: currentCommand,
    info: {}
  };
  if (ACK_NUMBER !== ackNumber) {
    result.success = false;
    result.info.error = "ACK_ERROR";
    result.info.message = "Ack number is wrong, try to send command again";
    return result;
  }
  const checksum = calculateChecksum([LENGTH, CTL].concat([...DATA]));
  if (CHEHCKSUM !== checksum) {
    result.success = false;
    result.info.error = "CHEHCKSUM_ERROR";
    result.info.message = "Checksum is failed";
    return result;
  }
  if (MESSAGE_TYPE === 2 || MESSAGE_TYPE === 7) {
    if (MESSAGE_TYPE === 7) {
      DATA = DATA.slice(1, DATA.length);
    }
    result.info = {
      idling: bitTest(DATA[0], 0),
      accepting: bitTest(DATA[0], 1),
      escrowed: bitTest(DATA[0], 2),
      stacking: bitTest(DATA[0], 3),
      stacked: bitTest(DATA[0], 4),
      returning: bitTest(DATA[0], 5),
      returned: bitTest(DATA[0], 6),
      cheated: bitTest(DATA[1], 0),
      rejected: bitTest(DATA[1], 1),
      jammed: bitTest(DATA[1], 2),
      cassetteFull: bitTest(DATA[1], 3),
      lrcInstalled: bitTest(DATA[1], 4),
      paused: bitTest(DATA[1], 5),
      calibration: bitTest(DATA[1], 6),
      powerUp: bitTest(DATA[2], 0),
      invalidCommand: bitTest(DATA[2], 1),
      failure: bitTest(DATA[2], 2),
      billValue: currencies[currency][bitExtract(DATA[2], 3, 3)],
      stalled: bitTest(DATA[3], 0),
      flashDownload: bitTest(DATA[3], 1),
      prestack: bitTest(DATA[3], 2),
      barcodeSupport: bitTest(DATA[3], 3),
      allowsDeviceCaps: bitTest(DATA[3], 4),
      model: models[DATA[4]] || DATA[4],
      codeRevision: DATA[5]
    };
    if (MESSAGE_TYPE === 7) {
      const EXPANDED_DATA = Buffer.from(DATA.slice(6, DATA.length));
      result.info.expanded = {
        index: parseInt(EXPANDED_DATA[0], 16),
        isoCode: EXPANDED_DATA.slice(1, 4).toString("ascii"),
        baseValue: parseInt(EXPANDED_DATA.slice(4, 7).toString("ascii")),
        sign: EXPANDED_DATA.slice(7, 8).toString("ascii"),
        exponent: parseInt(EXPANDED_DATA.slice(8, 10).toString("ascii")),
        orientation: parseInt(EXPANDED_DATA[10], 16),
        type: EXPANDED_DATA.slice(11, 12).toString("ascii"),
        series: EXPANDED_DATA.slice(12, 13).toString("ascii"),
        compatibility: EXPANDED_DATA.slice(13, 14).toString("ascii"),
        version: EXPANDED_DATA.slice(14, 15).toString("ascii")
      };
    }
    const resultStates = states.filter(
      ({ byte, bit, negative }) => bitTest(DATA[byte], bit) === !negative
    );
    result.info.statuses = resultStates.map(
      ({ name, description, denomination, type }) => {
        const res = { name, description, type };
        if (denomination) {
          res.info = {
            denomination: currencies[currency][bitExtract(DATA[2], 3, 3)],
            currency
          };
          if (MESSAGE_TYPE === 7) {
            let denomination2 = result.info.expanded.baseValue * Math.pow(10, result.info.expanded.exponent);
            if (result.info.expanded.sign === "-")
              denomination2 = result.info.expanded.baseValue / Math.pow(10, result.info.expanded.exponent);
            res.info = {
              denomination: denomination2,
              currency
            };
          }
        }
        return res;
      }
    );
  }
  if (MESSAGE_TYPE === 6) {
    if (currentCommand === "SOFTWARE_CRC") {
      result.info.value = DATA.slice(0, 4).reduce(
        (accum, val) => accum + (val & 15).toString(16),
        "0x"
      );
    } else if (currentCommand === "CLEAR_CASH_VALUE_IN_CASSETTE") {
      result.info.value = parseInt(
        DATA.reduce((accum, val) => accum + (val & 15).toString(24), ""),
        16
      );
    } else if ([
      "ACCEPTOR_SERIAL_NUMBER",
      "ACCEPTOR_BOOT_SOFTWARE_VERSION",
      "ACCEPTOR_APPLICATION_SOFTWARE_VERSION",
      "ACCEPTOR_VARIANT_VERSION",
      "ACCEPTOR_VARIANT_NAME",
      "ACCEPTOR_TYPE"
    ].includes(currentCommand)) {
      result.info.value = Buffer.from(DATA).toString().replace(/[^\x20-\x7E]/g, "");
    } else if (["CASH_VALUE_IN_CASSETTE", "NUMBER_OF_ACCEPTOR_RESETS"].includes(
      currentCommand
    )) {
      result.info.value = DATA.reduce((accum, val) => accum + (val & 15), 0);
    } else if (currentCommand === "ACCEPTOR_AUDIT_LIFE_TIME_TOTALS") {
      result.info = {
        performanceDataMapID: readField32(DATA, 0),
        totalOperatingHours: readField32(DATA, 1),
        totalMotorStarts: readField32(DATA, 2),
        totalDocumentsReachedEscrowPosition: readField32(DATA, 3),
        totalDocumentsPassedRecognition: readField32(DATA, 4),
        totalDocumentsPassedValidation: readField32(DATA, 5)
      };
    } else if (currentCommand === "ACCEPTOR_AUDIT_QP_MEASURES") {
      result.info = {
        last100BillsAcceptRate: readField16(DATA, 0),
        totalMotorStarts: readField16(DATA, 1),
        totalDocumentsStacked: readField16(DATA, 2),
        totalDocumentsReachedEscrowPosition: readField16(DATA, 3),
        totalDocumentsPassedRecognition: readField16(DATA, 4),
        totalDocumentsPassedValidation: readField16(DATA, 5),
        totalRecognitionRejections: readField16(DATA, 6),
        totalSecurityRejections: readField16(DATA, 7),
        totalOrientationDisabledRejections: readField16(DATA, 8),
        totalDocumentDisabledRejections: readField16(DATA, 9),
        totalFastFeedRejectionRejections: readField16(DATA, 10),
        totalDocumentsInsertedwhileDisabled: readField16(DATA, 11),
        totalHostReturnDocumentRejections: readField16(DATA, 12),
        totalBarcodesDecoded: readField16(DATA, 13)
      };
    } else if (currentCommand === "ACCEPTOR_AUDIT_GENERAL_PERFORMANCE_MEASURES") {
      result.info = {
        totalCrossChannel0Rejects: readField16(DATA, 0),
        totalCrossChannel1Rejects: readField16(DATA, 1),
        totalSumofAllJams: readField16(DATA, 2),
        totalJamRecoveryEfforts: readField16(DATA, 3),
        totalRejectAttemptsFollowedbyJam: readField16(DATA, 4),
        totalStackerJams: readField16(DATA, 5),
        totalJamswithoutRecoveryEnabled: readField16(DATA, 6),
        totalOutOfServiceConditions: readField16(DATA, 7),
        totalOutOfOrderConditions: readField16(DATA, 8),
        totalOperatingHours: readField16(DATA, 9),
        totalDocumentsExceedingMaxLength: readField16(DATA, 10),
        totalDocumentsunderMinLength: readField16(DATA, 11),
        totalDocumentsFailedToReachEscrowPosition: readField16(DATA, 12),
        totalCalibrations: readField16(DATA, 13),
        totalPowerups: readField16(DATA, 14),
        totalDownloadAttempts: readField16(DATA, 15),
        totalCassettesFull: readField16(DATA, 16),
        totalCassettesRemoved: readField16(DATA, 17)
      };
    }
  }
  if (result.info.invalidCommand || result.info.failure) {
    result.success = false;
  }
  return result;
}
function compose(commandName, args = {}, ACK_NUMBER = 0) {
  const { data, type, subtype } = commands[commandName];
  let DATA = data;
  if (type === 16 || type === 112) {
    args.denominations.forEach((set, bit) => {
      if (set)
        DATA[0] = bitSet(DATA[0], bit);
    });
    if (args.specialInterruptMode)
      DATA[1] = bitSet(DATA[1], 0);
    if (args.highSecurity)
      DATA[1] = bitSet(DATA[1], 1);
    if (args.orientation) {
      switch (args.orientation) {
        case 1:
          DATA[1] = bitClear(DATA[1], 2);
          DATA[1] = bitClear(DATA[1], 3);
          break;
        case 2:
          DATA[1] = bitSet(DATA[1], 2);
          DATA[1] = bitClear(DATA[1], 3);
          break;
        case 4:
          DATA[1] = bitSet(DATA[1], 2);
          DATA[1] = bitSet(DATA[1], 3);
          break;
      }
    }
    if (args.escrowMode)
      DATA[1] = bitSet(DATA[1], 4);
    if (args.noPushMode)
      DATA[2] = bitSet(DATA[2], 0);
    if (args.powerUpPolicy === "B") {
      bitSet(DATA[2], 2);
    } else if (args.powerUpPolicy === "C") {
      bitSet(DATA[2], 3);
    }
    if (args.expandedNoteReporting)
      DATA[2] = bitSet(DATA[2], 4);
    if (args.expandedCouponReporting)
      DATA[2] = bitSet(DATA[2], 5);
    if (commandName === "ENABLE") {
      if (args.denominations.includes(1)) {
        args.denominations.forEach((set, bit) => {
          if (set)
            DATA[0] = bitSet(DATA[0], bit);
        });
      } else
        DATA[0] = 127;
      if (args.enableBarcode)
        DATA[2] = bitSet(DATA[2], 1);
    } else if (commandName === "DISABLE") {
      DATA[0] = 0;
      DATA[2] = bitClear(DATA[2], 1);
    } else if (commandName === "STACK") {
      DATA[1] = bitSet(DATA[1], 5);
    } else if (commandName === "RETURN") {
      DATA[1] = bitSet(DATA[1], 6);
    }
  }
  if (type === 112) {
    DATA = [subtype, ...DATA];
    if (subtype === 2) {
      DATA = [...DATA, args.index];
    }
  }
  const STX = 2;
  const ETX = 3;
  const LENGTH = 5 + DATA.length;
  const MSG_TYPE = type | ACK_NUMBER & 15;
  const buffer = [STX, LENGTH, MSG_TYPE].concat(DATA, ETX);
  const CHECKSUM = calculateChecksum(buffer.slice(1, -1));
  buffer.push(CHECKSUM);
  return Buffer.from(buffer);
}
module.exports = { parse, calculateChecksum, compose };
const Debug$1 = require("debug");
const { Transform } = require("stream");
const debug$1 = Debug$1("ebds:parser");
const PACKET_STX = 0;
const PACKET_LENGTH = 1;
const PACKET_CTL = 2;
const PACKET_DATA = 3;
const PACKET_ETX = 4;
const PACKET_CHECKSUM = 5;
const packetTemplate = {
  stx: 0,
  length: 0,
  ctl: 0,
  data: null,
  etx: 0,
  checksum: 0
};
class EBDSProtocolParser extends Transform {
  constructor(options) {
    super({
      ...options,
      objectMode: true
    });
    this.buffer = Buffer.alloc(0);
    this.packet = { ...packetTemplate };
    this.dataPosition = 0;
    this.packetStartFound = false;
    this.packetState = PACKET_STX;
    this.interval = 20;
  }
  _transform(chunk, encoding, cb) {
    if (this.intervalID) {
      clearTimeout(this.intervalID);
    }
    const data = Buffer.concat([this.buffer, chunk]);
    for (const [i, byte] of data.entries()) {
      if (this.packetStartFound) {
        switch (this.packetState) {
          case PACKET_LENGTH:
            if (byte >= 5) {
              this.packet.length = byte;
              this.packetState = PACKET_CTL;
            } else {
              debug$1(
                `Unknown byte "${byte}" received at state "${this.packetState}"`
              );
              this.resetState();
            }
            break;
          case PACKET_CTL: {
            const highNibble = (byte & 240) >> 4;
            const lowNibble = byte & 15;
            if (highNibble >= 2 && highNibble <= 7 && (lowNibble === 1 || lowNibble === 0)) {
              this.packet.ctl = byte;
              this.packetState = PACKET_DATA;
            } else {
              debug$1(
                `Unknown byte "${byte}" received at state "${this.packetState}"`
              );
              this.resetState();
            }
            break;
          }
          case PACKET_DATA:
            if (this.packet.data === null) {
              this.packet.data = Buffer.alloc(this.packet.length - 5);
              this.dataPosition = 0;
            }
            this.packet.data[this.dataPosition] = byte;
            this.dataPosition += 1;
            if (this.dataPosition >= this.packet.length - 5) {
              this.packetState = PACKET_ETX;
            }
            break;
          case PACKET_ETX:
            if (byte === 3) {
              this.packet.etx = byte;
              this.packetState = PACKET_CHECKSUM;
            } else {
              debug$1(
                `Unknown byte "${byte}" received at state "${this.packetState}"`
              );
              this.resetState();
            }
            break;
          case PACKET_CHECKSUM:
            this.packet.checksum = byte;
            this.push(
              Buffer.from(
                Object.values(this.packet).reduce(
                  (accum, val) => typeof val === "number" ? accum.concat(val) : accum.concat([...val]),
                  []
                )
              )
            );
            this.resetState();
            this.buffer = data.slice(i + 1);
            break;
          default:
            debug$1(`Should never reach this packetState "${this.packetState}`);
        }
      } else if (byte === 2) {
        this.packetStartFound = true;
        this.packet.stx = byte;
        this.packetState = PACKET_LENGTH;
      } else if (byte === 5 && data.length === 1) {
        this.push(data);
        this.resetState();
        this.buffer = data.slice(i + 1);
      } else {
        debug$1(`Unknown byte "${byte}" received at state "${this.packetState}"`);
      }
    }
    this.intervalID = setTimeout(this.resetState, this.interval);
    cb();
  }
  resetState() {
    this.packetState = 0;
    this.packet = { ...packetTemplate };
    this.dataPosition = 0;
    this.packetStartFound = false;
    this.buffer = Buffer.alloc(0);
  }
  _flush(cb) {
    this.resetState();
    cb();
  }
}
const currencyNameList = {
  USD: "USD",
  AUD: "AUD",
  CAD: "CAD",
  EUR: "EUR",
  GBP: "GBP",
  UZS: "UZS"
};
const { SerialPort } = require("serialport");
const Debug = require("debug");
const { EventEmitter } = require("events");
const fromEvents = require("promise-toolbox/fromEvents");
const debug = Debug("ebds:app");
class EBDS extends EventEmitter {
  constructor(param = {}) {
    super();
    this.port = void 0;
    this.ackNumber = 1;
    this.emitter = new EventEmitter();
    this.polling = false;
    this.enabled = false;
    this.acceptorConfig = {
      currency: currencyNameList.UZS,
      bookmark: false,
      denominations: [1, 1, 1, 1, 1, 1, 1],
      specialInterruptMode: false,
      highSecurity: false,
      orientation: 4,
      escrowMode: true,
      noPushMode: false,
      enableBarcode: false,
      powerUpPolicy: "A",
      expandedNoteReporting: true,
      expandedCouponReporting: true,
      ...param.acceptorConfig
    };
    this.currentCommand = void 0;
  }
  getAcceptorConfig() {
    const config = {
      ...this.acceptorConfig
    };
    if (!this.enabled) {
      config.denominations = [0, 0, 0, 0, 0, 0, 0];
      config.escrowMode = false;
      config.enableBarcode = false;
      config.expandedNoteReporting = false;
      config.expandedCouponReporting = false;
    }
    return config;
  }
  open(port, param = {}) {
    return new Promise((resolve, reject) => {
      this.port = new SerialPort({
        path: port,
        baudRate: param.baudRate || 9600,
        dataBits: param.dataBits || 7,
        stopBits: param.stopBits || 1,
        parity: param.parity || "even"
      });
      this.port.on("error", (error) => {
        reject(error);
        this.emit("ERROR");
      });
      this.port.on("close", (error) => {
        reject(error);
        this.emit("CLOSE");
      });
      this.port.on("open", () => {
        resolve();
        this.emit("OPEN");
      });
      const parser = this.port.pipe(new EBDSProtocolParser());
      parser.on("data", (buffer) => {
        debug("Received <-", Buffer.from(buffer));
        const result = parse(
          buffer,
          this.currentCommand,
          this.acceptorConfig.currency,
          this.ackNumber
        );
        const { success } = result;
        if (this.timeoutId)
          clearTimeout(this.timeoutId);
        if (success) {
          this.emitter.emit("SUCCESS", result);
        } else {
          this.emitter.emit("ERROR", result);
        }
      });
    });
  }
  close() {
    if (this.port) {
      this.port.close((err) => {
        if (err) {
          console.error("Error closing port:", err);
        } else {
          console.log("Port closed successfully");
        }
      });
    }
  }
  poll(start) {
    if (start) {
      return new Promise((resolve, reject) => {
        this.pollInterval = setInterval(() => {
          this.polling = true;
          this.exec("POLL").then((res) => {
            resolve();
            const { statuses = [] } = res.info;
            statuses.forEach((event) => {
              this.emit(event.name, event);
            });
          }).catch((error) => {
            reject();
            this.emit("ERROR", error);
          }).finally(() => {
            this.emitter.emit("POLL_STOP");
            this.polling = false;
          });
        }, 200);
      });
    } else {
      return new Promise((resolve) => {
        if (this.polling) {
          this.emitter.once("POLL_STOP", () => {
            resolve();
          });
        } else {
          clearInterval(this.pollInterval);
          resolve();
        }
      });
    }
  }
  getAck() {
    this.ackNumber = this.ackNumber === 0 ? 1 : 0;
    return this.ackNumber;
  }
  exec(command, args) {
    if (this.timeoutId)
      clearTimeout(this.timeoutId);
    const buffer = compose(
      command,
      { ...this.getAcceptorConfig(), ...args },
      this.getAck(),
      this.enabled
    );
    debug("Sent ->", buffer);
    this.port.write(buffer);
    this.port.drain(() => {
      this.timeoutId = setTimeout(() => {
        this.currentCommand = null;
        this.emitter.emit("TIMED_OUT", {
          success: false,
          command,
          info: {
            error: "TIMED_OUT",
            message: "No response in 3s"
          }
        });
      }, 3e3);
    });
    return new Promise((resolve, reject) => {
      fromEvents(this.emitter, ["SUCCESS"], ["ERROR", "TIMED_OUT"]).then(
        (event) => {
          resolve(...event.args);
        },
        (event) => {
          reject(...event.args);
        }
      );
    });
  }
  command(command, args) {
    this.currentCommand = command;
    if (this.enabled) {
      return this.poll(false).then(() => this.exec(command, args)).then((res) => {
        if (!this.polling)
          this.poll(true);
        return res;
      });
    }
    return this.exec(command, args);
  }
  enable() {
    return this.command("ENABLE").then((res) => {
      this.enabled = true;
      this.poll(true);
      return res;
    });
  }
  softReset() {
    return this.command("SOFT_RESET").then((res) => {
      return res;
    });
  }
  disable() {
    return this.command("DISABLE").then((res) => {
      this.enabled = false;
      this.poll(false);
      return res;
    });
  }
}
const serialPortConfig = {
  baudrate: 9600,
  // default: 9600
  databits: 7,
  // default: 8
  stopbits: 1,
  // default: 2
  parity: "even",
  // default: 'none'
  currency: currencyNameList.UZS,
  escrowMode: false
};
let device = null;
const enableSerialPort = () => {
  if (device !== null) {
    return true;
  }
  device = new EBDS({
    acceptorConfig: serialPortConfig
  });
  handleCashAcceptance();
  let port = "COM4";
  if (os.platform() === "linux") {
    port = "/dev/ttyS0";
  }
  device.open(port).then(
    () => {
      device.enable();
    }
  ).then((event) => {
    console.log(event);
  }).then(
    () => new Promise((resolve) => {
      setTimeout(function() {
        resolve();
        device.disable();
        device = null;
      }, 6e5);
    })
  ).then((event) => {
    var _a;
    console.log((_a = event == null ? void 0 : event.info) == null ? void 0 : _a.statuses);
  }).catch((error) => {
    console.log(error);
  });
};
const handleCashAcceptance = () => {
  device.on("OPEN", () => {
    console.log("Port opened!");
  });
  device.on("CLOSE", () => {
    console.log("Port closed!");
  });
  device.on("IDLING", (event) => {
  });
  device.on("ESCROWED", (event) => {
  });
  device.on("STACKED", (event) => {
    var _a;
    triggerEventInElectron(
      "bill-accepted",
      {
        acceptedBillAmount: parseFloat((_a = event == null ? void 0 : event.info) == null ? void 0 : _a.denomination)
      }
    );
  });
  device.on("RETURNED", (event) => {
  });
  device.on("JAMMED", (event) => {
  });
  device.on("ACCEPTING", (event) => {
  });
  device.on("STACKING", (event) => {
  });
  device.on("RETURNING", (event) => {
  });
  device.on("CHEATED", (event) => {
    console.log(event);
    console.log("CHEATED!");
  });
  device.on("REJECTED", (event) => {
    console.log(event);
    console.log("REJECTED!");
  });
  device.on("CASSETTE_FULL", (event) => {
    console.log(event);
    console.log("CASSETTE_FULL!");
  });
  device.on("LRC_REMOVED", (event) => {
    console.log(event);
  });
  device.on("PAUSED", (event) => {
    console.log(event);
    console.log("PAUSED!");
  });
  device.on("CALIBRATION", (event) => {
    console.log(event);
    console.log("CALIBRATION!");
  });
  device.on("POWER_UP", (event) => {
    console.log(event);
    console.log("POWER_UP!");
  });
  device.on("INVALID_COMMAND", (event) => {
    console.log(event);
    console.log("INVALID_COMMAND!");
  });
  device.on("FAILURE", (event) => {
    console.log(event);
    console.log("FAILURE!");
  });
  device.on("NO_PUSH_MODE", (event) => {
    console.log(event);
    console.log("NO_PUSH_MODE!");
  });
  device.on("FLASH_DOWNLOAD", (event) => {
    console.log(event);
    console.log("FLASH_DOWNLOAD!");
  });
  device.on("PRESTACK", (event) => {
    console.log(event);
    console.log("PRESTACK!");
  });
  device.on("ERROR", (event) => {
    console.log(event);
    console.log("ERROR!");
  });
};
const disableSerialPort = () => {
  if (device) {
    device.close();
  } else {
    console.warn("No device instance found.");
  }
  device = null;
};
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
function createWindow() {
  win = new electron.BrowserWindow({
    width: 1280,
    height: 1024,
    frame: false,
    fullscreen: true,
    // transparent: true,
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (process.env.NODE_ENV === "development")
    ;
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
    win = null;
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
electron.ipcMain.on("print-command-request", (event, data) => {
  printHTMLContent(data);
  console.log(event);
});
electron.ipcMain.on("bill-accept-start-request", (event) => {
  enableSerialPort();
  event.sender.send("bill-accept-start-response", { success: true });
});
electron.ipcMain.on("bill-accept-stop-request", (event) => {
  disableSerialPort();
  event.sender.send("bill-accept-stop-response", { success: true });
});
function triggerEventInElectron(eventName, data) {
  win && win.webContents.send(eventName, data);
}
electron.app.whenReady().then(() => {
  createWindow();
});
function createPrintWindow(htmlContent) {
  const printWindow = new electron.BrowserWindow({
    show: false,
    // width: 304,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  const metaTag = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
  const style = `
        <style>
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }
        .check {
            width: 27mm !important;
        }
        .check-image-block {
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid black;
            padding-bottom: 12px;
            margin-bottom: 12px;
        }
        .check-image {
            height: 5mm;
            width: 70%;
            object-contain: cover;
        }
        .check-title {
            font-size: 2.5mm;
            text-align: center;
            font-family: sans-serif;
            margin-bottom: 4px;
        }
        .check-block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1px;
            padding-bottom: 1px;
            border-bottom: 0.5px solid rgba(0,0,0,0.06);
        }
        .check-left-text {
            font-size: 1.5mm;
            font-family: sans-serif;
            font-weight: bold;
            line-height: 1.2;
        }
        .check-right-text {
            font-size: 1.5mm;
            text-align: right;
            font-family: sans-serif;
            line-height: 1.2;
        }
        .check-qr-block {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .check-qr {
            width: 15mm;
            height: 15mm;
            margin-left: auto;
            margin-right: auto;
        }
        .thanks-text {
            font-size: 2mm;
            text-align: center;
            font-family: sans-serif;
            font-weight: bold;
            border-top: 0.5px dashed black;
            margin-top: 4px;
        }
        </style>
    `;
  const contentWithStyle = `<html><head>${metaTag}${style}</head><body>${htmlContent}</body></html>`;
  printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURI(contentWithStyle)}`);
  printWindow.webContents.on("did-finish-load", () => {
    printWindow.webContents.printToPDF({}).then((data) => {
      const tempPDFPath = "123123123.pdf";
      fs__namespace.writeFile(tempPDFPath, data, (error) => {
        if (error) {
          console.error("Failed to save PDF:", error);
          return;
        }
        printWindow.webContents.print({ silent: true, margins: { marginType: "printableArea" }, pagesPerSheet: 1, copies: 1, filePath: tempPDFPath }, (error2) => {
          if (error2) {
            console.error("Failed to print PDF:", error2);
          } else {
            console.log("PDF printed successfully!");
          }
          fs__namespace.unlink(tempPDFPath, (error3) => {
            if (error3) {
              console.error("Failed to delete temporary PDF file:", error3);
            }
          });
        });
      });
    }).catch((e) => {
      console.log("Print to PDF");
      if (e) {
        console.error("Failed to generate PDF:", e);
        return;
      }
    });
  });
  return printWindow;
}
function printHTMLContent(htmlContent) {
  createPrintWindow(htmlContent);
}
module.exports = triggerEventInElectron;
