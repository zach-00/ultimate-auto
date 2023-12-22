import React, { useState, useEffect } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    const url = "http://localhost:8090/api/customers/";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  if (customers === undefined) {
    return null;
  }

  return (
    <>
      <h1 className="p-3">Customers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            return (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.phone}</td>
                <td>{customer.address_street}</td>
                <td>{customer.address_city}</td>
                <td>{customer.address_state}</td>
                <td>{customer.address_zip}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default CustomerList;
