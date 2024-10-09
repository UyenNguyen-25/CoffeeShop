import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import { lazy } from "react";
import HomePage from "./pages/ShoppingPages/HomePage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import AnonymousLayout from "./auth/AnonymousLayout";
import Login from "./auth/Login/LoginPage";
import ForgotPassword from "./auth/ForgotPassword/ForgotPassword";
import DashboardLayout from "./components/layouts/DashboardLayout";
import ProductDetail from "./pages/ShoppingPages/ProductsPage/ProductDetail/ProductDetail";
import OrderPage from "./pages/ShoppingPages/OrderPage";
import RequestReturn from "./pages/ShoppingPages/OrderPage/OrderTracking/RequestReturn";
import ReasonReturn from "./pages/ShoppingPages/OrderPage/OrderTracking/ReasonReturn";
import CartPage from "./pages/ShoppingPages/CartPage/CartPage";
import ProductManagement from "./pages/DashboardPages/ProductManagement";
import OrderManagement from "./pages/DashboardPages/OrderManagement";
import UserManagement from "./pages/DashboardPages/UserManagement";
import ProductsPage from "./pages/ShoppingPages/ProductsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import SetNewPassword from "./auth/ForgotPassword/SetNewPassword";
import ResetToken from "./routes/ResetRoute/index.";
import OrderConfirmationPage from "./pages/ShoppingPages/OrderPage/OrderConfirmation";
import OrderDetailUser from "./pages/ShoppingPages/OrderPage/OrderDetail/OrderDetail";
import Dashboard from "./pages/DashboardPages/Dashboard";
import Prefetch from "./routes/Prefetch";
import BrandManagement from "./pages/DashboardPages/BrandManagement";
import ErrorBoundary from "./components/common/Error";
import BlogPage from "./pages/ShoppingPages/BlogPage";
import CoffeeMixer from "./pages/ShoppingPages/MixCoffeePage";
import CheckLoginRoute from "./routes/CheckLoginRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "products",
            element: <ProductsPage />,
          },
          {
            path: "product/:id",
            element: <ProductDetail />,
          },
          {
            path: "purchase",
            element: <OrderPage />,
          },
          { path: "order/order-detail/:orderId", element: <OrderDetailUser /> },
          {
            path: "purchase/request-return",
            element: <RequestReturn />,
          },
          {
            path: "purchase/request-return/reason",
            element: <ReasonReturn />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "blog",
            element: <BlogPage />,
          },
          {
            path: "mix-coffee",
            element: <CoffeeMixer />,
          },
          {
            path: "order-confirmation",
            element: <OrderConfirmationPage />,
          },

        ],
      },
      {
        element: (
          <ResetToken>
            <AnonymousLayout />
          </ResetToken>
        ),
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "set-new-password",
            element: <SetNewPassword />,
          },
        ],
      },
      {
        element: (
          <ProtectedRoute>
            <CheckLoginRoute>
              <Prefetch>
                <DashboardLayout />
              </Prefetch>
            </CheckLoginRoute>
          </ProtectedRoute>
        ),
        path: "dashboard",
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "products-management",
            element: <ProductManagement />,
          },
          {
            path: "orders-management",
            element: <OrderManagement />,
          },
          {
            path: "brands-management",
            element: <BrandManagement />,
          },
          {
            path: "users-management",
            shouldRevalidate: ({ currentUrl, nextUrl }) =>
              currentUrl.pathname !== nextUrl.pathname,
            element: <UserManagement />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorBoundary />
  }
]);

export default router;
