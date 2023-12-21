import { useState, useEffect } from 'react';

function TechnicianList() {

    const [ technicians, setTechnicians ] = useState([]);

    const fetchTechnicians = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchTechnicians();
    }, []);


    const handleDelete = async (e) => {
        const id = e.target.value;
        const url = `http://localhost:8080/api/technicians/${id}`;

        const fetchOptions = {
            method: 'DELETE'
        };

        const response = await fetch(url, fetchOptions);
        if (response.ok) {
            const confirmation = await response.json();
            console.log(confirmation);
            fetchTechnicians();
        }

    }


    return (
        <>
        <h1>Technicians</h1>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                </tr>
            </thead>
            <tbody>

                {technicians.map(tech => {
                    return (
                <tr key={tech.id}>
                    <td>{tech.employee_id}</td>
                    <td>{tech.first_name}</td>
                    <td>{tech.last_name}</td>
                    <td><button onClick={handleDelete} value={tech.id} className="btn btn-danger">Remove</button></td>
                </tr>
                    );
                })}

            </tbody>
        </table>
        </>
    );
}

export default TechnicianList;
