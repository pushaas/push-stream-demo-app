import React from 'react'

const Port = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Port">
      <input
        className="u-full-width"
        type="text"
        placeholder="port"
        onChange={(e) => onUpdateConnectionInfo('port', e.target.value)}
        value={connectionInfo.port}
      />
    </div>
  )
}

export default Port
