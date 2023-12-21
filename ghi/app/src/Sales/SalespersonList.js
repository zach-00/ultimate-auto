import React, { useState, useEffect } from "react";

function SalespersonList() {
  const [salespeople, setSalespeople] = useState([]);

  const getSalespeople = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salesperson);
    } else {
      console.error("An error occured fetching the data");
    }
  };

  useEffect(() => {
    getSalespeople();
  }, []);

  if (salespeople === undefined) {
    return null;
  }

  return (
    <>
      <h1 className="p-3">Salespeople</h1>
      <table className="table table-striped" id="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {salespeople.map((salesperson) => {
            return (
              <tr key={salesperson.employee_id}>
                <td>{salesperson.employee_id}</td>
                <td>{salesperson.first_name}</td>
                <td>{salesperson.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default SalespersonList;
