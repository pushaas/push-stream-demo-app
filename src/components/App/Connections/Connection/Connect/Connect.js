import React from 'react'

const Connect = ({ onConnect }) => {
  return (
    <button
      className="Connect u-full-width"
      onClick={onConnect}
    >
      connect
    </button>
  )
}

export default Connect
