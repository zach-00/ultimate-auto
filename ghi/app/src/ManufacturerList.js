import { useState, useEffect } from "react";

function ManufacturerList(props) {
  const [manufacturers, setManufacturers] = useState([]);

  async function getManufacturers() {
    const response = await fetch("http://localhost:8100/api/manufacturers/");
    if (response.ok) {
      const { manufacturers } = await response.json();
      setManufacturers(manufacturers);
    } else {
      console.error("An error occured fetching the data");
    }
  }

  useEffect(() => {
    getManufacturers();
  }, []);

  if (manufacturers === undefined) {
    return null;
  }

  return (
    <>
      <table className="table table-striped" id="table" data-classes="table">
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
                <td>{manufacturer.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ManufacturerList;
