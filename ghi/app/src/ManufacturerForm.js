import React, { useState } from "react";

function ManufacturerForm(props) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
    };

    const url = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      const newManufacturer = await response.json();
      setName("");
      setSubmitted(true);
    } else {
      console.log("An error occured fetching the data");
    }
  };

  function handleNameChange(event) {
    const { value } = event.target;
    setName(value);
  }

  const successMessage = !submitted ? "d-none" : "alert alert-success mb-0";

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a Manufacturer</h1>
              <form onSubmit={handleSubmit} id="create-presentation-form">
                <div className="form-floating mb-3">
                  <input
                    onChange={handleNameChange}
                    placeholder="Manufacturer Name"
                    required
                    type="text"
                    value={name}
                    name="name"
                    id="name"
                    className="form-control"
                  />
                  <label>Manufacturer Name</label>
                </div>
                <button className="btn btn-primary mb-3">Create</button>

                <div className={successMessage}>
                  Manufacturer successfully created!
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManufacturerForm;
