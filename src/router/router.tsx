import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";
import UserComponent from "../Features/User/UserComponent";
import Home from "../Components/Home";
import SellerGuestLayout from "../Layouts/SellerGuestLayout";
import CreateSellerComponent from "../Features/Seller/Create/CreateSellerComponent";
import SellerLayout from "../Layouts/SellerLayout";
import HomeSellerComponent from "../Features/Seller/Home/HomeSellerComponent";
import ShowProductComponent from "../Features/Seller/Products/Show/ShowProductComponent";
import CreateProductComponent from "../Features/Seller/Products/Create/CreateProductComponent";
import BuyerGuestLayout from "../Layouts/BuyerGuestLayout";
import CreateBuyerComponent from "../Features/Buyer/Create/CreateBuyerComponent";
import BuyerLayout from "../Layouts/BuyerLayout";
import HomeBuyerComponent from "../Features/Buyer/Home/HomeBuyerComponent";
import ProductDetailsComponent from "../Features/Buyer/Product/ProductDetailsComponent";
import GetBuyerOrdersComponent from "../Features/Order/Buyer/Get/GetBuyerOrdersComponent";
import LoginComponent from "../Features/User/Login/LoginComponent";
import GetSellerOrdersComponent from "../Features/Order/Seller/Get/GetSellerOrdersComponent";
import SellerProfileComponent from "../Features/Seller/Profile/SellerProfileComponent";
import NotificationsPage from "../Features/Notification/Get/NotificationPage";

export const router = createBrowserRouter([
  {
    path: "guest",
    element: <GuestLayout />,
    children: [
      {
        path: "user",
        element: <UserComponent />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
    ],
  },
  {
    path: "seller",
    element: <SellerGuestLayout />,
    children: [
      {
        path: "create",
        element: <CreateSellerComponent />,
      },
    ],
  },

  {
    path: "buyer",
    element: <BuyerGuestLayout />,
    children: [
      {
        path: "create",
        element: <CreateBuyerComponent />,
      },

    ],
  },

  {
    path: "seller",
    element: <SellerLayout />,
    children: [
      {
        path: "home",
        element: <HomeSellerComponent />,
      },
      {
        path: "products",
        element: <ShowProductComponent />,
      },
      {
        path: "product/new",
        element: <CreateProductComponent />,
      },
      {
        path: "orders",
        element: <GetSellerOrdersComponent />,
      },
       {
        path: "profile",
        element: <SellerProfileComponent />,
      },
       {
        path: "notifications",
        element: <NotificationsPage />,
      },
    ],
  },
  {
    path: "buyer",
    element: <BuyerLayout />,
    children: [
      {
        path: "home",
        element: <HomeBuyerComponent />,
      },
      {
        path: "details/:id",
        element: <ProductDetailsComponent />,
      },
      {
        path: "orders",
        element: <GetBuyerOrdersComponent />,
      },
       {
        path: "notifications",
        element: <NotificationsPage />,
      },
    ],
  },
]);
