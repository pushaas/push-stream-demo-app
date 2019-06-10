import React from 'react'

const ConnectionHost = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="ConnectionHost">
      <input
        placeholder="PushStream host"
        onChange={(e) => onUpdateConnectionInfo('host', e.target.value)}
        value={connectionInfo.host}
      />
    </div>
  )
}

export default ConnectionHost
