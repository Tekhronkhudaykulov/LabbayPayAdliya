import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  FpjsProvider,

} from '@fingerprintjs/fingerprintjs-pro-react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchIntervalInBackground: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
       <FpjsProvider
        loadOptions={{
          apiKey:"nP4g7PCPvFHdZXzPFY4U"
        }}
      >
        <App />
      </FpjsProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");
