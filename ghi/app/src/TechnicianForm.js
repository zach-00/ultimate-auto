import React, { useState } from 'react';

function TechnicianForm() {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ employeeId, setEmployeeId ] = useState('');
    const [ hasSubmitted, setHasSubmitted ] = useState(false);

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (e) => {
        const value = e.target.value;
        setEmployeeId(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8080/api/technicians/';

        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;


        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
          const response = await fetch(url, fetchOptions);
          if (response.ok) {
              const technician = await response.json();
              setFirstName('');
              setLastName('');
              setEmployeeId('');
              setHasSubmitted(true);
          }
      } catch (err) {
        console.error(err);
      }
    }

    const successMessage = (!hasSubmitted) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Technician</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">

              <div className="form-floating mb-3">
                <input onChange={handleFirstNameChange} placeholder="first_name" required value={firstName} type="text" name="first_name" id="first_name" className="form-control"/>
                <label htmlFor="first_name">First Name</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleLastNameChange} placeholder="last_name" required type="text" value={lastName} name="last_name" id="last_name" className="form-control"/>
                <label htmlFor="last_name">Last Name</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleEmployeeIdChange} placeholder="employee_id" required type="text" value={employeeId} name="employee_id" id="employee_id" className="form-control"/>
                <label htmlFor="employee_id">Employee ID</label>
              </div>

              <button className="btn btn-primary mb-3">Create</button>

            </form>

            <div className={successMessage} id="success-message">
                Technician successfully created!
            </div>

          </div>
        </div>
      </div>
    );
}

export default TechnicianForm;
