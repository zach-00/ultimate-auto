import React, { useState, useEffect } from 'react';

function ModelList() {

    const [ models, setModels ] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th className="text-center" scope="col">Name</th>
                    <th className="text-center" scope="col">Manufacturer</th>
                    <th className="text-center" scope="col">Picture</th>
                </tr>
            </thead>
            <tbody>

                {models.map(model => {
                    return (
                <tr key={model.href}>
                    <td className="text-center">{model.name}</td>
                    <td className="text-center">{model.manufacturer.name}</td>

                    <td className="text-center">
                        <img width="30%" src={model.picture_url}></img>
                    </td>

                </tr>
                    );
                })}

            </tbody>
        </table>
    );
}

export default ModelList;
