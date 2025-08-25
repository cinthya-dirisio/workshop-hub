import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import "./App.css";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>
);
