import { createBrowserRouter } from "react-router-dom";
import Mainroute from "../pages/Mainroute";
import Homepage from "../pages/Homepage";

import Menupage from "../pages/MenuPage";
import Contactpage from "../pages/Contactpage";
import Orderpage from "../pages/Orderspage";
import BasketPage from "../pages/Basketpage/BasketPage";
import RestaurantMenuPage from '../pages/RestaurantMenuPage/RestaurantMenuPage.jsx';
import SearchResults from "../pages/SearchResults/SearchResults.jsx";

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
        path: "/restaurant/:id",
        element: <RestaurantMenuPage />,
      },
      {
        path: "search",
        element: <SearchResults/>
      }
    ],
  },
]);

export default routes;