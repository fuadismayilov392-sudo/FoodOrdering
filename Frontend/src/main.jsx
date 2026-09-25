import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import './index.css'
import {DataProvider} from "./Context/DataContext.jsx";
import { AuthProvider } from './Context/AuthContext.jsx';

// GitHub Pages serves 404.html for direct visits to SPA routes (for example,
// /FoodOrdering/menu). Restore the original client-side URL before React
// Router starts matching routes.
const redirect = new URLSearchParams(window.location.search).get('redirect');
if (redirect?.startsWith('/')) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  window.history.replaceState(null, '', `${basePath}${redirect}`);
}

createRoot(document.getElementById('root')).render(
  <DataProvider>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </DataProvider>
)
