// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function CreateServerPage() {
    const [serverName, setServerName] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [wagePerHour, setWagePerHour] = useState('');
    const [isFullTime, setIsFullTime] = useState('');

    const history = useHistory();

    const addServer = async () => {
        const newServer = { serverName, hireDate, wagePerHour:Number(wagePerHour), isFullTime:Number(isFullTime) };
        const response = await fetch('/servers', {
            method: 'POST',
            body: JSON.stringify(newServer),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the server!");
        } else {
            alert(`Failed to add server, status code = ${response.status}`);
        }
        history.push("/view-servers");
    };

    return (
        <div>
            <h1>Add Server</h1>
            <input
                type="text"
                placeholder="Enter serverName here"
                value={serverName}
                onChange={e => setServerName(e.target.value)} />
            <input
                type="date"
                placeholder="Enter hireDate here"
                value={hireDate}
                onChange={e => setHireDate(e.target.value)} />
            <input
                type="number"
                placeholder="Enter wagePerHour here"
                value={wagePerHour}
                onChange={e => setWagePerHour(e.target.value)} />
            <select name="isFullTime" onChange={e => setIsFullTime(e.target.value)} value={isFullTime}>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
            </select>
            <button
                onClick={addServer}
            >Add</button>
        </div>
    );
}

export default CreateServerPage;
