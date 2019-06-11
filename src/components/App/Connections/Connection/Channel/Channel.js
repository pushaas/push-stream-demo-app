import React from 'react'

const Channel = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Channel">
      <input
        className="u-full-width"
        type="text"
        placeholder="channel"
        onChange={(e) => onUpdateConnectionInfo('channel', e.target.value)}
        value={connectionInfo.channel}
      />
    </div>
  )
}

export default Channel
