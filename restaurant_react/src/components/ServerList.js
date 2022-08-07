// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import Server from './Server';

function ServerList({ servers, onDelete, onEdit }) {
    return (
        <table id="servers">
            <thead>
                <tr>
                    <th>serverID</th>
                    <th>serverName</th>
                    <th>hireDate</th>
                    <th>wagePerHour</th>
                    <th>isFullTime</th>
                </tr>
            </thead>
            <tbody>
                {servers.map((server, i) => <Server server={server} onDelete={onDelete} onEdit={onEdit} key={i} />)}
            </tbody>
        </table>
    );
}

export default ServerList;
