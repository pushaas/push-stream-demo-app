import React from 'react'

import Connect from './Connect'
import ConnectionHost from './ConnectionHost'
import ConnectionMode from './ConnectionMode'
import Disconnect from './Disconnect'
import RemoveConnectionInfo from './RemoveConnectionInfo'

const Connection = ({
  connectionInfo,
  onConnect,
  onDisconnect,
  onRemoveConnectionInfo,
  onUpdateConnectionInfo,
}) => {
  return (
    <div className="Connection">
      <h2>Connection {connectionInfo.id}</h2>

      <div className="Connection_form">
        <ConnectionHost connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
        <ConnectionMode connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
      </div>

      <div className="Connection_actions">
        <Connect onConnect={onConnect} />
        <Disconnect onDisconnect={onDisconnect} />
        <RemoveConnectionInfo onRemoveConnectionInfo={onRemoveConnectionInfo} />
      </div>
    </div>
  )
}

export default Connection
