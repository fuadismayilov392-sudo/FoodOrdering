import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import './index.css'
import {DataProvider} from "./Context/DataContext.jsx";
import { AuthProvider } from './Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </DataProvider>
)
