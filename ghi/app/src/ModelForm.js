import { useState, useEffect } from "react";
import './index.css';

function ModelForm() {

    const [ manufacturers, setManufacturers ] = useState([]);

    const [ modelName, setModelName ] = useState('');

    const [ pictureUrl, setPictureUrl ] = useState('');

    const [ manufacturer, setManufacturer ] = useState('');

    const handleModelNameChange = (e) => {
        const value = e.target.value;
        setModelName(value);
    }

    const handlePictureUrlChange = (e) => {
        const value = e.target.value;
        setPictureUrl(value);
    }

    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturer(value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
      try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
      } catch (err) {
        console.error(err);
      }
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8100/api/models/';

        const data = {};
        data.name = modelName;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                const newModel = await response.json();
                console.log(newModel);
                setModelName('');
                setPictureUrl('');
                setManufacturer('');
            }
      } catch (err) {
        console.error(err);
      }

    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a Model</h1>
            <form onSubmit={handleSubmit} id="create-model-form">

              <div className="form-floating mb-3">
                <input onChange={handleModelNameChange} placeholder="model_name" required value={modelName} type="text" name="model_name" id="model_name" className="form-control"/>
                <label htmlFor="model_name">Model name</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handlePictureUrlChange} placeholder="picture_url" required type="url" value={pictureUrl} name="picture_url" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture URL</label>
              </div>

            <div className="margin-bottom">
              <select onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" value={manufacturer} className="form-select">
                  <option value="">Choose a manufacturer</option>
                  {manufacturers.map(manufacturer => {
                    return (
                    <option key={manufacturer.href} value={manufacturer.id}>{manufacturer.name}</option>
                    );
                  })}
              </select>
              </div>
              <button className="btn btn-primary">Create</button>

            </form>
          </div>
        </div>
      </div>
    );
}


export default ModelForm;
