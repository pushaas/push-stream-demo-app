import React from 'react'

const Port = ({ disabled, connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Port">
      <input
        className="u-full-width"
        disabled={disabled}
        type="text"
        placeholder="port"
        onChange={(e) => onUpdateConnectionInfo('port', e.target.value)}
        value={connectionInfo.port}
      />
    </div>
  )
}

export default Port
