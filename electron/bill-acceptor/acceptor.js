import EBDS from "./lib";
import serialPortConfig from "./lib/config";
import triggerEventInElectron from "../main";
import os from 'os';

let device = null;



const enableSerialPort = () => {

    if (device !== null) {
        return true;
    }

    device = new EBDS({
        acceptorConfig: serialPortConfig
    });

    handleCashAcceptance()

    let port = 'COM4';

    if (os.platform() === 'linux') {
        port = '/dev/ttyS0'
    }

    
    device.open(port)
        .then(
            () => {
                device.enable()
            }
        )
        .then((event) => {
            console.log(event);
        })
        .then(
            () => new Promise(resolve => {
                setTimeout(function () {
                    resolve();
                    device.disable();
                    device = null;
                }, 600000); // 10 minutes
            })
        )
        .then((event) => {
            console.log(event?.info?.statuses);
        })
        .catch(error => {
            console.log(error);
        });

}


const handleCashAcceptance = () => {

    device.on('OPEN', () => {
        console.log('Port opened!');
    });

    device.on('CLOSE', () => {
        console.log('Port closed!');
    });

    device.on('IDLING', (event) => {

    });

    device.on('ESCROWED', (event) => {
        // device.command(commandNameList.STACK).then(event => {
        //     console.log(event);
        // });
    });

    device.on('STACKED', (event) => {
        triggerEventInElectron(
            'bill-accepted',
            {
                acceptedBillAmount: parseFloat(event?.info?.denomination)
            });
    });

    device.on('RETURNED', (event) => {
        // triggerEventInElectron(
        //     'bill-returned',
        //     {
        //         acceptedBillAmount: parseFloat(event?.info?.denomination)
        //     });
    });

    device.on('JAMMED', (event) => {
        // main event
    });

    device.on('ACCEPTING', (event) => {
        // console.log(event);
    });

    device.on('STACKING', (event) => {
        // console.log(event);
        // console.log('STACKING!');
    });

    device.on('RETURNING', (event) => {
        // console.log(event);
        // console.log('RETURNING!');
    });

    device.on('CHEATED', (event) => {
        console.log(event);
        console.log('CHEATED!');
    });

    device.on('REJECTED', (event) => {
        console.log(event);
        console.log('REJECTED!');
    });


    device.on('CASSETTE_FULL', (event) => {
        console.log(event);
        console.log('CASSETTE_FULL!');
    });

    device.on('LRC_REMOVED', (event) => {
        console.log(event);
    });

    device.on('PAUSED', (event) => {
        console.log(event);
        console.log('PAUSED!');
    });

    device.on('CALIBRATION', (event) => {
        console.log(event);
        console.log('CALIBRATION!');
    });

    device.on('POWER_UP', (event) => {
        console.log(event);
        console.log('POWER_UP!');
    });

    device.on('INVALID_COMMAND', (event) => {
        console.log(event);
        console.log('INVALID_COMMAND!');
    });

    device.on('FAILURE', (event) => {
        console.log(event);
        console.log('FAILURE!');
    });

    device.on('NO_PUSH_MODE', (event) => {
        console.log(event);
        console.log('NO_PUSH_MODE!');
    });

    device.on('FLASH_DOWNLOAD', (event) => {
        console.log(event);
        console.log('FLASH_DOWNLOAD!');
    });

    device.on('PRESTACK', (event) => {
        console.log(event);
        console.log('PRESTACK!');
    });

    device.on('ERROR', (event) => {
        console.log(event);
        console.log('ERROR!');
    });

}


const disableSerialPort = () => {
    if (device) {
        device.close();
    } else {
      console.warn("No device instance found.");
    }
    device = null;
}

export {handleCashAcceptance, disableSerialPort, enableSerialPort};

