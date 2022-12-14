// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import ServerList from '../components/ServerList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ViewServersPage({ setServerToEdit, servers, setServers, loadServers }) {
    const history = useHistory();

    useEffect(() => {
        loadServers();
    }, []);

    const onDelete = async _id => {
        const response = await fetch(`/servers/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            setServers(servers.filter(e => e._id !== _id));
            loadServers();
        } else {
            console.error(`Failed to delete server with id = ${_id}, status code = ${response.status}`)
        } 
    }

    const onEdit = server => {
        setServerToEdit(server);
        history.push("/edit-server");
    }

    return (
        <>
            <Link to="/add-server">Go to Create Server Page</Link>
            <br></br>
            <h2>List of Servers</h2>
            <ServerList servers={servers} onDelete={onDelete} onEdit={onEdit}></ServerList>
        </>
    );
}

export default ViewServersPage;
