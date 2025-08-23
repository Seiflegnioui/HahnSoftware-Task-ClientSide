import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.tsx";
import { Provider } from "react-redux";
import { store } from "./Features/store.ts";
import AppContext from "./API/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
    <AppContext>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AppContext>
);
