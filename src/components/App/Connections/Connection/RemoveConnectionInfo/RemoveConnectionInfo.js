import React from 'react'

const RemoveConnectionInfo = ({ onRemoveConnectionInfo }) => {
  return (
    <button
      className="RemoveConnectionInfo u-full-width"
      onClick={onRemoveConnectionInfo}
    >
      remove
    </button>
  )
}

export default RemoveConnectionInfo
