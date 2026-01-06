import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store/store.js";
import SocketProvider from "./socketProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

let persistor = persistStore(store);
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SocketProvider>
                <App />
                <Toaster />
            </SocketProvider>
        </PersistGate>
    </Provider>
);
