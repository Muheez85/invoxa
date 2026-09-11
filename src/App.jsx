import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayouts from "./layout/DashboardLayouts";

import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetails from "./pages/InvoiceDetails";
import Settings from "./pages/Settings";

import EditInvoice from "./pages/EditInvoice";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayouts />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/invoices" element={<Invoices />} />

          <Route path="/invoices/new" element={<CreateInvoice />} />
          <Route
                path="/invoices/:id/edit"
                element={<EditInvoice />}
              />
         <Route path="/invoices/:id" element={<InvoiceDetails />} />  
        

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;

