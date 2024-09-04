import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { Provider } from "react-redux";
import { store } from "./App/store.ts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_URL as string;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
