import React, { useState, useEffect } from "react";

function AutomobileList() {
  const [automobiles, setAutos] = useState([]);

  const getAutos = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAutos(data.autos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAutos();
  }, []);

  if (automobiles === undefined) {
    return null;
  }

  return (
    <>
      <h1>Automobiles</h1>
      <table className="table table-striped" id="table">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles.map((auto) => {
            return (
              <tr key={auto.vin}>
                <td>{auto.vin}</td>
                <td>{auto.model.manufacturer.name}</td>
                <td>{auto.model.name}</td>
                <td>{auto.year}</td>
                <td>{auto.color}</td>
                <td>{auto.sold ? "Sold" : "Available"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobileList;
