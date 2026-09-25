import { createBrowserRouter } from "react-router-dom";
import Mainroute from "../pages/Mainroute";
import Homepage from "../pages/Homepage";

import Menupage from "../pages/Menupage";
import Contactpage from "../pages/Contactpage";
import Orderpage from "../pages/Orderspage";
import BasketPage from "../pages/Basketpage/BasketPage";
import RestaurantMenuPage from '../pages/RestaurantMenuPage/RestaurantMenuPage.jsx';
import SearchResults from "../pages/SearchResults/SearchResults.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import UploadImage from '../pages/UploadImage/UploadImage.jsx';
import CategoryPage from '../pages/CategoryPage/CategoryPage.jsx';
import AdminPage from '../pages/AdminPage/AdminPage.jsx';
import AddProduct from '../pages/AddProduct/AddProduct.jsx';
import PaymentResult from '../pages/PaymentResult.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import RouteError from '../pages/RouteError/RouteError.jsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Mainroute />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "menu",
        element: <Menupage />,
      },
      {
        path: "orders",
        element: <Orderpage />,
      },
      {
        path: "payment-result",
        element: <PaymentResult />,
      },
      {
        path: "contact",
        element: <Contactpage />,
      },
      {
        path: "basket",
        element: <BasketPage />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantMenuPage />,
      },
      {
        path: "search",
        element: <SearchResults/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element:<Register/>
      },
      {
        path: "upload-image",
        element: <UploadImage/>
      },
      {
        path: '/category/:category',
        element: <CategoryPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'admin/products/add',
        element: <AddProduct />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
], {
  // Keep routes rooted at "/" locally while supporting the GitHub Pages
  // deployment path configured in vite.config.js (/FoodOrdering/).
  basename: import.meta.env.BASE_URL,
});

export default routes;
