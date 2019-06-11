import React from 'react'

const Host = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Host">
      <input
        type="text"
        placeholder="PushStream host"
        onChange={(e) => onUpdateConnectionInfo('host', e.target.value)}
        value={connectionInfo.host}
      />
    </div>
  )
}

export default Host
