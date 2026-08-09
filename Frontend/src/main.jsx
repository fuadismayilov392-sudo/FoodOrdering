import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import './index.css'
import {DataProvider} from "./Context/DataContext.jsx";

createRoot(document.getElementById('root')).render(
  <DataProvider>
  <RouterProvider router={routes} />
  </DataProvider>
)
