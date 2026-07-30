import { createBrowserRouter } from "react-router-dom";
import Mainroute from "../pages/Mainroute";
import Homepage from "../pages/Homepage";

import Menupage from "../pages/MenuPage";
import Contactpage from "../pages/Contactpage";
import Orderpage from "../pages/Orderspage";

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
    ],
  },
]);

export default routes;