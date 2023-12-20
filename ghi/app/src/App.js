import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerList from "./ManufacturerList";
import AutomobileList from "./AutomobileList";
import ModelList from "./ModelList";
import ModelForm from "./ModelForm";
import AutomobileForm from "./AutomobileForm";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";

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

          <Route path="technicians">
            <Route index element={<TechnicianList />}/>
            <Route path="create" element={<TechnicianForm />}/>
          </Route>

          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="create" element={<AppointmentForm />}/>
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
