import React from 'react'

const Port = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Port">
      <input
        placeholder="Port"
        onChange={(e) => onUpdateConnectionInfo('port', e.target.value)}
        value={connectionInfo.port}
      />
    </div>
  )
}

export default Port
