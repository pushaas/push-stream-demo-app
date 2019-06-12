import React from 'react'

import {
  isConnecting,
  isOpen,
} from '../../../../../services/pushStreamService'

const ToggleConnect = ({
  connectionInfo,
  onConnect,
  onDisconnect,
}) => {
  const disabled = isConnecting(connectionInfo)
  return (
    <button
      className={`ToggleConnect u-full-width ${disabled ? '' : 'button-primary'}`}
      disabled={disabled}
      onClick={isOpen(connectionInfo) ? onDisconnect : onConnect}
    >
      {isOpen(connectionInfo) ? 'disconnect' : 'connect'}
    </button>
  )
}

export default ToggleConnect
