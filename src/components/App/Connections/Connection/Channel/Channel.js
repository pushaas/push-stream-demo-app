import React from 'react'

const Channel = ({ disabled, connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Channel">
      <input
        className="u-full-width"
        disabled={disabled}
        type="text"
        placeholder="channel"
        onChange={(e) => onUpdateConnectionInfo('channel', e.target.value)}
        value={connectionInfo.channel}
      />
    </div>
  )
}

export default Channel
