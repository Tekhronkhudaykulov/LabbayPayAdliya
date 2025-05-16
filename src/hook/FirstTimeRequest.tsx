import { useEffect } from 'react';
import axios from 'axios';

const CashDeviceConnector = () => {
  useEffect(() => {
    const deviceID = localStorage.getItem('deviceID');

    if (!deviceID) {
      
      axios.post(`http://localhost:5555/cash/api/CashDevice/DisconnectDevice?deviceID=null`)
        .catch(err => console.warn('Disconnect skipped (initial run):', err));
      const config = {
        ComPort: "COM12",
        SspAddress: 0,
        LogFilePath: "C:\\Temp\\Cash_Device_Log.log",
        SetInhibits: [
          { Denomination: "1000 UZS", Inhibit: false },
          { Denomination: "2000 UZS", Inhibit: false },
          { Denomination: "5000 UZS", Inhibit: false },
          { Denomination: "50000 UZS", Inhibit: false },
          { Denomination: "100000 UZS", Inhibit: false },
          { Denomination: "200000 UZS", Inhibit: false },
          { Denomination: "500 UZS", Inhibit: true },
          { Denomination: "100 UZS", Inhibit: true },
          { Denomination: "10000 UZS", Inhibit: true },
        ],
        SetRoutes: [
          { Denomination: "1000 UZS", Route: 7 },
          { Denomination: "2000 UZS", Route: 7 },
          { Denomination: "5000 UZS", Route: 7 },
          { Denomination: "50000 UZS", Route: 7 },
          { Denomination: "100000 UZS", Route: 7 },
          { Denomination: "200000 UZS", Route: 7 },
        ],
        EnableAcceptor: true,
        EnableAutoAcceptEscrow: true,
        EnablePayout: true,
      };

      axios.post('http://localhost:5555/cash/api/CashDevice/OpenConnection', config)
        .then(res => {
          const receivedID = res.data.deviceID;
          if (receivedID) {
            localStorage.setItem('deviceID', receivedID);
            console.log('✅ Connected. deviceID saved:', receivedID);
          } else {
            console.warn('⚠️ Connected but no deviceID in response');
          }
        })
        .catch(err => {
          console.error('❌ Failed to connect:', err);
        });

    } else {
      console.log('🔁 Device already connected. deviceID:', deviceID);
    }
  }, []);

  return null;
};

export default CashDeviceConnector;
