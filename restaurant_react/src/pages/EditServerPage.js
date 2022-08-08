// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function EditServerPage({ serverToEdit }) {
    const [serverID, setServerID] = useState(serverToEdit.serverID);
    const [serverName, setServerName] = useState(serverToEdit.serverName);
    const [hireDate, setHireDate] = useState(serverToEdit.hireDate);
    const [wagePerHour, setWagePerHour] = useState(serverToEdit.wagePerHour);
    const [isFullTime, setIsFullTime] = useState(serverToEdit.isFullTime);

    const history = useHistory();

    const editServer = async () => {
        const editedServer = { serverID:Number(serverID), serverName, hireDate, wagePerHour:Number(wagePerHour), isFullTime:Number(isFullTime)};       
        const response = await fetch(`/servers/${serverToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedServer),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 200){
            alert("Successfully edited the server!");
        } else {
            alert(`Failed to edit server, status code = ${response.status}`);
        }
        history.push("/view-servers");
    };

    return (
        <div>
            <h1>Edit Server</h1>
            <input
                type="text"
                value={serverName}
                onChange={e => setServerName(e.target.value)} />
            <input
                type="date"
                value={hireDate}
                onChange={e => setHireDate(e.target.value)} />
            <input
                type="number"
                value={wagePerHour}
                onChange={e => setWagePerHour(e.target.value)} />
            <select name="isFullTime" onChange={e => setIsFullTime(e.target.value)} value={isFullTime}>
                <option value={0}>No</option>
                <option value={1}>Yes</option>
            </select>
            <button
                onClick={editServer}
            >Save</button>
        </div>
    );
}

export default EditServerPage;
