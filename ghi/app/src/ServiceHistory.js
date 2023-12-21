import { useEffect, useState } from "react";


function ServiceHistory() {

    const [ appointments, setAppointments ] = useState([]);

    const [ search, setSearch ] = useState('');
    console.log(search);

    const fetchAppointments = async () => {
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


    return (
        <>
        <h1> Service History</h1>

        <form className="form-inline">
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <input onChange={(e) => setSearch(e.target.value.toUpperCase())} className="form-control mr-sm-2" type="search" placeholder="Search by VIN..." aria-label="Search" />
                </div>
                <div className="col-sm">

                </div>
            </div>
        </div>
        </form>




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

                {appointments.filter((appt) => {
                    return search === '' ? appt : appt.vin.includes(search)
                }).map(appt => {
                    return (
                <tr key={appt.id}>
                    <td>{appt.vin}</td>
                    <td>??????</td>
                    <td>{appt.customer}</td>
                    <td>{appt.date_time.slice(0, 10)}</td>
                    <td>{appt.date_time.slice(11, 16)}</td>
                    <td>{appt.technician.first_name} {appt.technician.last_name}</td>
                    <td>{appt.reason}</td>
                    <td>{appt.status}</td>

                </tr>
                    );
                })}

            </tbody>
        </table>
        </>
    );
}

export default ServiceHistory;
