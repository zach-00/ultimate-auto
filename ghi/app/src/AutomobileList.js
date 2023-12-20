import React, { useState, useEffect } from "react";

function AutomobileList() {
  const [automobiles, setAutos] = useState([]);

  const getAutos = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);

      // console.log("data.autos", data.autos);
      // console.log("automobiles:", automobiles);
    } else {
      console.error("An error occured fetching the data");
    }
  };

  useEffect(() => {
    getAutos();
  }, []);
  console.log("automobiles:", automobiles);


  if (automobiles === undefined) {
    return null;
  }

  return (
    <>
      <table className="table table-striped" id="table" data-classes="table">
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
                <td>{auto.sold}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AutomobileList;
