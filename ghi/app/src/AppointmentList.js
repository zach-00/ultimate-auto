import { useState, useEffect } from "react";

function AppointmentList() {

    const [ appointments, setAppointments ] = useState([]);

    const fetchAppointments = async() => {
        const url = 'http://localhost:8080/api/appointments/';

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleCancel = async (e) => {
        const id = e.target.value;
        const url = `http://localhost:8080/api/appointments/${id}/cancel/`;

        const data = {
            status: "Canceled"
        };

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                const canceledAppt = await response.json();
                console.log(canceledAppt);
                fetchAppointments();
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleFinish = async (e) => {
        const id = e.target.value;
        const url = `http://localhost:8080/api/appointments/${id}/finish/`;

        const data = {
            status: 'Finished'
        };

        const fetchOptions = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                const finishedAppt = await response.json();
                console.log(finishedAppt);
                fetchAppointments();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <div className="container margin-bottom">
            <h1>Service Appointments</h1>
        </div>
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">VIN</th>
                    <th scope="col">VIP?</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Technician</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>

                {appointments.map(appointment => {
                    if (appointment.status === 'Created') {
                    return (
                <tr key={appointment.id}>
                    <td>{appointment.vin}</td>
                    <td>??????</td>
                    <td>{appointment.customer}</td>
                    <td>{appointment.date_time.slice(0, 10)}</td>
                    <td>{appointment.date_time.slice(11, 16)}</td>
                    <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                    <td>{appointment.reason}</td>
                    <td>
                        <button onClick={handleCancel} value={appointment.id} className="btn btn-danger">Cancel</button>
                        <button onClick={handleFinish} value={appointment.id} className="btn btn-success">Finished</button>
                    </td>
                </tr>
                    );
                    }
                })}

            </tbody>
        </table>
        </>
    );
}

export default AppointmentList;
