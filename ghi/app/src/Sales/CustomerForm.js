import React, { useState } from "react";

function CustomerForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  const handleStreetChange = (e) => {
    const value = e.target.value;
    setStreet(value);
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
  };

  const handleZipChange = (e) => {
    const value = e.target.value;
    setZip(value);
  };

  const handleStateChange = (e) => {
    const value = e.target.value;
    setState(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/customers/";

    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.phone = phone;
    data.address_street = street;
    data.address_city = city;
    data.address_state = state;
    data.address_zip = zip;

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(fetchConfig);

    const response = await fetch(url, fetchConfig);
    console.log(response);
    if (response.ok) {
      const newCustomer = await response.json();
      console.log(newCustomer);
      setFirstName("");
      setLastName("");
      setPhone("");
      setStreet("");
      setCity("");
      setState("");
      setZip("");
    } else {
      console.error(response.status);
    }
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleFirstNameChange}
                  placeholder="first_name"
                  required
                  value={firstName}
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="form-control"
                />
                <label htmlFor="first_name">First Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handleLastNameChange}
                  placeholder="last_name"
                  required
                  type="text"
                  value={lastName}
                  name="last_name"
                  id="last_name"
                  className="form-control"
                />
                <label htmlFor="last_name">Last Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  onChange={handlePhoneChange}
                  placeholder="phone"
                  required
                  type="text"
                  value={phone}
                  name="phone"
                  id="phone"
                  className="form-control"
                />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStreetChange}
                  placeholder="street"
                  required
                  type="text"
                  value={street}
                  name="address_street"
                  id="address_street"
                  className="form-control"
                />
                <label htmlFor="street">Street</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleCityChange}
                  placeholder="city"
                  required
                  type="text"
                  value={city}
                  name="address_city"
                  id="address_city"
                  className="form-control"
                />
                <label htmlFor="city">City</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleStateChange}
                  placeholder="state"
                  required
                  type="text"
                  value={state}
                  name="address_state"
                  id="address_state"
                  className="form-control"
                />
                <label htmlFor="state">State</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleZipChange}
                  placeholder="zip"
                  required
                  type="text"
                  value={zip}
                  name="address_zip"
                  id="address_zip"
                  className="form-control"
                />
                <label htmlFor="zip">ZIP</label>
              </div>

              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerForm;
