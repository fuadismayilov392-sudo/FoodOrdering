import { createBrowserRouter } from "react-router-dom";
import Mainroute from "../pages/Mainroute";
import Homepage from "../pages/Homepage";

import Menupage from "../pages/MenuPage";
import Contactpage from "../pages/Contactpage";
import Orderpage from "../pages/Orderspage";
import BasketPage from "../pages/Basketpage/BasketPage";
import RestaurantMenuPage from '../pages/RestaurantMenuPage/RestaurantMenuPage.jsx';
import SearchResults from "../pages/SearchResults/SearchResults.jsx";
import Login from "../pages/Login/Login.jsx";
import Register from "../pages/Register/Register.jsx";
import UploadImage from '../pages/UploadImage/UploadImage.jsx';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Mainroute />,
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
      }
    ],
  },
]);

export default routes;