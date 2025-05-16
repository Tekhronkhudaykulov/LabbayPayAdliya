import "./App.css";
import Router from "./router/Router";
import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import "./assets/fonts/fonts.css";
import "react-simple-keyboard/build/css/index.css";
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";



const App = () => {
  const { data } = useVisitorData();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (data?.visitorId) {
      localStorage.setItem("visitor_id", data.visitorId);

      const socket = io("http://localhost:5555", {
        transportOptions: {
          polling: {
            extraHeaders: {
              "x-device-id": data.visitorId,
            },
          },
        },
      });

      socketRef.current = socket;

      socket.emit("get-device-id", () => {
      
      });

      socket.on("deviceId", (data) => {
        localStorage.setItem("device_id", data?.deviceId);
        console.log(data?.deviceId, 'device_id');
      })

      return () => {
        socket.off("get-device-id");
        socket.disconnect();
      };
    }
  }, [data?.visitorId]); 

  return (
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <Router />
      </ConfigProvider>
    </I18nextProvider>
  );
};

export default App;
