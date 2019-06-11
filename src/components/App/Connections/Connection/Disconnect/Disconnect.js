import React from 'react'

const Disconnect = ({ onDisconnect }) => {
  return (
    <button
      className="Disconnect u-full-width"
      onClick={onDisconnect}
    >
      disconnect
    </button>
  )
}

export default Disconnect
