import { NavLink } from "react-router-dom";

function MainPage() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">UltimateAuto</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
      </div>
        <div className="d-flex p-2 justify-content-evenly">
          <div className="col">
        <div className="card">
          <img src="https://www.paulmankin.com/wp-content/uploads/2023/11/getty-images-GA_xyNg_zOs-unsplash.jpg" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Sales Department</h5>
            <NavLink to="sales/add/" className="btn btn-primary">Go to Sales</NavLink>
          </div>
        </div>
        </div>


        <div className="col">
        <div className="card">
          <img src="https://www.freedomwarranty.com/wp-content/uploads/Freedom-Warranty-LLC_-Extended-Service-Contract-A-Necessity-with-the-Rise-in-Auto-Repair-Cost_IMAGE1-1.jpeg" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Service Appointment</h5>
            <NavLink to="appointments/create/" className="btn btn-primary">Schedule Appointment</NavLink>
          </div>
        </div>
        </div>

        </div>
    </div>
  );
}

export default MainPage;
