import React from 'react';

function ServerName({ server }) {
    return (
        <option value={server.serverName}>{server.serverName}</option>
    );
}

export default ServerName;