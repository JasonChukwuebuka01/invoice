import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Invoice from './pages/Invoice.jsx';
import InvoiceDetails from './pages/invoiceDetail.jsx';
import './index.css';
import { ThemeProvider } from './context/themeContext.jsx';
import { InvoiceProvider } from './context/InvoiceContext.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Invoice />,
      },
      {
        path: "invoice/:id",
        element: <InvoiceDetails />,
      },
    ],
  },
]);




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <InvoiceProvider>
        <RouterProvider router={router} />
      </InvoiceProvider>
    </ThemeProvider>
  </StrictMode>
);