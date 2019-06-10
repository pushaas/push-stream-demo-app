import React from 'react'

const AddConnectionInfo = ({ onAddConnectionInfo }) => {
  return (
    <div className="AddConnectionInfo">
      <button onClick={onAddConnectionInfo}>add connection</button>
    </div>
  )
}

export default AddConnectionInfo
