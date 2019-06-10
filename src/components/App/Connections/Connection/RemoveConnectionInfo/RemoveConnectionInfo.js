import React from 'react'

const RemoveConnectionInfo = ({ onRemoveConnectionInfo }) => {
  return (
    <div className="RemoveConnectionInfo">
      <button onClick={onRemoveConnectionInfo}>remove</button>
    </div>
  )
}

export default RemoveConnectionInfo
