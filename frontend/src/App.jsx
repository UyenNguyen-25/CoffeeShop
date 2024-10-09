/* eslint-disable react/jsx-key */
// import React from "react";
import { Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import { Outlet, useLocation } from "react-router-dom";
import { Skeleton } from "antd";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <Provider store={store}>
      <Toaster
        theme="light"
        position="top-right"
        richColors
        toastOptions={{ duration: 1000 }}
      />
      <Suspense fallback={<Skeleton />}>
        <Outlet />
      </Suspense>
    </Provider>
  );
}

export default App;
