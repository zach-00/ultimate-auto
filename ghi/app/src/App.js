import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import AutomobileList from "./AutomobileList";
import ModelList from "./ModelList";
import ModelForm from "./ModelForm";
import AutomobileForm from "./AutomobileForm";
import SalespersonList from "./Sales/SalespersonList";
import SalespersonForm from "./Sales/SalespersonForm";
import CustomerList from "./Sales/CustomerList";
import CustomerForm from "./Sales/CustomerForm";
import SalesList from "./Sales/SalesList";
import SalesForm from "./Sales/SalesForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers/">
            <Route index element={<ManufacturerList />} />
            <Route path="create/" element={<ManufacturerForm />} />
          </Route>

          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="create" element={<ModelForm />} />
          </Route>

          <Route path="automobiles/">
            <Route index element={<AutomobileList />} />
            <Route path="create/" element={<AutomobileForm />} />
          </Route>
          <Route path="salespeople/">
            <Route index element={<SalespersonList />} />
            <Route path="add/" element={<SalespersonForm />} />
          </Route>
          <Route path="customers/">
            <Route index element={<CustomerList />} />
            <Route path="add/" element={<CustomerForm />} />
          </Route>
          <Route path="sales/">
            <Route index element={<SalesList />} />
            <Route path="add/" element={<SalesForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
