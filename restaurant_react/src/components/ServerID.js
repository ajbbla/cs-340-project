import React from 'react';

function ServerID({ serverID, server }) {
    return (
        <option value={server.serverID}>{server.serverID}</option>
    );
}

export default ServerID;