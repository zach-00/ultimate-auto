import React, { useState } from "react";

function SalespersonForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8090/api/salespeople/";

    const data = {};
    data.first_name = firstName;
    data.last_name = lastName;
    data.employee_id = employeeId;

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newSalesperson = await response.json();
      setFirstName("");
      setLastName("");
      setEmployeeId("");
    } else {
      console.error(response.status);
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleEmployeeIdChange = (e) => {
    const value = e.target.value;
    setEmployeeId(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add a Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-salesperson-form">
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
                onChange={handleEmployeeIdChange}
                placeholder="employee_id"
                required
                type="text"
                value={employeeId}
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalespersonForm;
