import { useState, useEffect } from 'react';

function AppointmentForm() {

    const [ technicians, setTechnicians ] = useState([]);
    const [ technician, setTechnician ] = useState('');
    const [ vin, setVin ] = useState('');
    const [ customer, setCustomer ] = useState('');
    const [ date, setDate ] = useState('');
    const [ time, setTime ] = useState('');
    const [ reason, setReason ] = useState('');

    const handleVinChange = (e) => {
        const value = e.target.value;
        setVin(value);
    }

    const handleCustomerChange = (e) => {
        const value = e.target.value;
        setCustomer(value);
    }

    const handleDateChange = (e) => {
        const value = e.target.value;
        setDate(value);
    }

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTime(value);
    }

    const handleTechnicianChange = (e) => {
        const value = e.target.value;
        setTechnician(value);
    }

    const handleReasonChange = (e) => {
        const value = e.target.value;
        setReason(value);
    }


    const fetchTechnicians = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setTechnicians(data.technicians);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTechnicians();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = 'http://localhost:8080/api/appointments/';
        const data = {};

        data.vin = vin;
        data.customer = customer;
        data.date_time = `${date}T${time}`;
        data.technician = technician;
        data.reason = reason;
        data.status = "Created";

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await fetch(url, fetchOptions);
            if (response.ok) {
                const appointment = await response.json();
                console.log(appointment);
                setVin('');
                setCustomer('');
                setDate('');
                setTime('');
                setTechnician('');
                setReason('');
            }
        } catch (err) {
            console.error(err);
        }

    }



    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Service Appointment</h1>
            <form onSubmit={handleSubmit} id="create-technician-form">

              <div className="form-floating mb-3">
                <input onChange={handleVinChange} placeholder="vin" required value={vin} type="text" name="vin" id="vin" className="form-control"/>
                <label htmlFor="vin">Automobile VIN</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleCustomerChange} placeholder="customer" required type="text" value={customer} name="customer" id="customer" className="form-control"/>
                <label htmlFor="customer">Customer</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleDateChange} placeholder="date" required type="date" value={date} name="date" id="date" className="form-control"/>
                <label htmlFor="date">Date</label>
              </div>

              <div className="form-floating mb-3">
                <input onChange={handleTimeChange} placeholder="time" required type="time" value={time} name="time" id="time" className="form-control"/>
                <label htmlFor="time">Time</label>
              </div>

              <div className="margin-bottom">
                <select onChange={handleTechnicianChange} className="form-select" id="technician">
                <option value="">Choose a Technician</option>
                {technicians.map(tech => {
                    return (
                        <option key={tech.id} value={tech.employee_id}>{tech.first_name} {tech.last_name}</option>
                    );
                })}
                </select>
             </div>

              <div className="form-floating mb-3">
                <input onChange={handleReasonChange} placeholder="reason" required type="text" value={reason} name="reason" id="reason" className="form-control"/>
                <label htmlFor="reason">Reason</label>
              </div>

              <button className="btn btn-primary">Create</button>

            </form>
          </div>
        </div>
      </div>
    );
}

export default AppointmentForm;
