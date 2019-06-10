import React from 'react'

const Disconnect = ({ onDisconnect }) => {
  return (
    <div className="Disconnect">
      <button onClick={onDisconnect}>disconnect</button>
    </div>
  )
}

export default Disconnect
