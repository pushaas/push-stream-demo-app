import React from 'react'

const Host = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Host">
      <input
        className="u-full-width"
        type="text"
        placeholder="pushstream host"
        onChange={(e) => onUpdateConnectionInfo('host', e.target.value)}
        value={connectionInfo.host}
      />
    </div>
  )
}

export default Host
