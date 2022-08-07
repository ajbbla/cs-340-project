// citation: react framework adapted from Oregon State University, CS290, Module 5 - React and Module 9 - Full Stack MERN Apps, Spring 2022

import React from 'react';
import { MdDeleteForever, MdEdit } from 'react-icons/md';

function Server({ server, onDelete, onEdit }) {
    return (
        <tr>
            <td>{server.serverID}</td>
            <td>{server.serverName}</td>
            <td>{server.hireDate}</td>
            <td>{server.wagePerHour}</td>
            <td>{server.isFullTime}</td>
            <td><MdEdit onClick={() => onEdit(server)} /></td>
            <td>< MdDeleteForever onClick={() => onDelete(server.serverID)} /></td>
        </tr>
    );
}

export default Server;