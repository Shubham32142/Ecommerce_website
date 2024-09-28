/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import ProductList from "./Components/ProductList.jsx";
import { store } from "./Components/Store.js";
import "./index.css";

// Lazy loading components
const ProductItem = lazy(() => import("./Components/ProductItem.jsx"));
const Cart = lazy(() => import("./Components/Cart.jsx"));
const ErrorElement = lazy(() => import("./Components/ErrorElement.jsx"));
const AboutUs = lazy(() => import("./Components/AboutUs.jsx"));
const ContactUs = lazy(() => import("./Components/Contact.jsx"));
const Checkout = lazy(() => import("./Components/Checkout.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: (
      <Suspense fallback={<div>Loading....</div>}>
        <ErrorElement />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "products/:productId",
        element: (
          <Suspense fallback={<div>Loading.....</div>}>
            <ProductItem />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "cart",
    element: (
      <Suspense fallback={<div>Loading....</div>}>
        <Cart />
      </Suspense>
    ),
  },
  {
    path: "aboutus",
    element: (
      <Suspense fallback={<div>Loading....</div>}>
        <AboutUs />
      </Suspense>
    ),
  },
  {
    path: "contact",
    element: (
      <Suspense fallback={<div>Loading.....</div>}>
        <ContactUs />
      </Suspense>
    ),
  },
  {
    path: "checkout",
    element: (
      <Suspense fallback={<div>Loading....</div>}>
        {" "}
        <Checkout />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
