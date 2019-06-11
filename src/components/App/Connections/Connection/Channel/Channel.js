import React from 'react'

const Channel = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Channel">
      <input
        type="text"
        placeholder="Channel"
        onChange={(e) => onUpdateConnectionInfo('channel', e.target.value)}
        value={connectionInfo.channel}
      />
    </div>
  )
}

export default Channel
