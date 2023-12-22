import { useState, useEffect } from "react";

function AutomobileForm() {

    const [ color, setColor ] = useState('');
    const [ year, setYear ] = useState('');
    const [ vin, setVin ] = useState('');
    const [ model, setModel ] = useState('');
    const [ models, setModels ] = useState([]);
    const [ hasSubmitted, setHasSubmitted ] = useState(false);

  const handleColorChange = (e) => {
    const value = e.target.value;
    setColor(value);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    setYear(value);
  };

  const handleVinChange = (e) => {
    const value = e.target.value;
    setVin(value);
  };

  const handleModelChange = (e) => {
    const value = e.target.value;
    setModel(value);
  };

  //fetch models for dropdown
  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    try {
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setModels(data.models);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8100/api/automobiles/";

    const data = {};
    data.color = color;
    data.year = year;
    data.vin = vin;
    data.model_id = model;

    const fetchOptions = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const newAuto = await response.json();
            console.log(newAuto);
            setColor('');
            setYear('');
            setVin('');
            setModel('');
            setHasSubmitted(true);
        }
  } catch (err) {
    console.error(err);
  }

}

const successMessage = (!hasSubmitted) ? 'd-none' : 'alert alert-success mb-0';


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create an Automobile</h1>
          <form onSubmit={handleSubmit} id="create-automobile-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleColorChange}
                placeholder="color"
                required
                value={color}
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleYearChange}
                placeholder="year"
                required
                type="text"
                value={year}
                name="year"
                id="year"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              <input
                onChange={handleVinChange}
                placeholder="vin"
                required
                type="text"
                value={vin}
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>

            <div className="margin-bottom">
              <select
                onChange={handleModelChange}
                required
                name="model_id"
                id="model_id"
                value={model}
                className="form-select"
              >
                <option value="">Choose a model</option>
                {models.map((model) => {
                  return (
                    <option key={model.href} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
              </div>
              <button className="btn btn-primary mb-3">Create</button>

              <div className={successMessage}>
                  Automobile successfully created!
              </div>

            </form>
          </div>
        </div>
      </div>
    );
}

export default AutomobileForm;
