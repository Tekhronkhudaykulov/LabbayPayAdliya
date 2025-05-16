import {app, BrowserWindow, ipcMain,} from 'electron'
// @ts-ignore
import {enableSerialPort, disableSerialPort} from './bill-acceptor/acceptor.js';
import path from 'node:path'
import * as fs from "fs";


// ├─┬─┬ dist
// │ │ | index.html
// │ ├─┬ dist-electron
// │ │ ├ main.js
// │ │ └ preload.js

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
    win = new BrowserWindow({
        width:1280,
        height: 1024,
        frame: false,
        fullscreen: true,
        // transparent: true,
        icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    // Open the DevTools in development mode
    if (process.env.NODE_ENV === 'development') {
        // win.webContents.openDevTools();
    }

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(process.env.DIST, 'index.html'))
    }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('print-command-request', (event, data) => {
    printHTMLContent(data);
    console.log(event);
});

ipcMain.on('bill-accept-start-request', (event) => {
    enableSerialPort();
    event.sender.send('bill-accept-start-response', {success: true});
});

ipcMain.on('bill-accept-stop-request', (event) => {
    disableSerialPort();
    event.sender.send('bill-accept-stop-response', {success: true});
});


function triggerEventInElectron(eventName: any, data: any) {
    win && win.webContents.send(eventName, data);
}

app.whenReady().then(() => {
    createWindow();
});


function createPrintWindow( htmlContent: any ) {

    const printWindow: any = new BrowserWindow({ 
        show: false,
        // width: 304,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
          }, 
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

    printWindow.loadURL(`data:text/html;charset=utf-8,${ encodeURI( contentWithStyle ) }`);

    printWindow.webContents.on('did-finish-load', () => {

        // Print to PDF
        printWindow.webContents.printToPDF({}).then( (data: any) => {


            
                const tempPDFPath = '123123123.pdf';

                fs.writeFile(tempPDFPath, data, (error) => {

                    if (error) {
                        console.error('Failed to save PDF:', error);
                        return;
                    }

                    // Print the PDF
                    printWindow.webContents.print({ silent: true,  margins: {marginType: 'printableArea'}, pagesPerSheet: 1, copies: 1, filePath: tempPDFPath }, (error: any) => {
                    // printWindow.webContents.print({ silent: true, filePath: tempPDFPath }, (error) => {

                        if (error) {
                            console.error('Failed to print PDF:', error);
                        } else {
                            console.log('PDF printed successfully!');
                        }

                        // Delete the temporary PDF file
                        fs.unlink(tempPDFPath, (error) => {
                            if (error) {
                                console.error('Failed to delete temporary PDF file:', error);
                            }
                        });

                    });
                });
                // @ts-ignore
        }).catch(e => {
            console.log('Print to PDF');
            if (e) {
                console.error('Failed to generate PDF:', e);
                return;
            }
        });
    });

    return printWindow;

}


function printHTMLContent( htmlContent: any ) {
    createPrintWindow( htmlContent );
}


export default triggerEventInElectron;