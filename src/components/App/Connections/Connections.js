import React from 'react'

import AddConnectionInfo from './AddConnectionInfo'
import Connection from './Connection'

const Header = ({
  connectionsInfo,
  onAddConnectionInfo,
  onConnect,
  onDisconnect,
  onRemoveConnectionInfo,
  onSendMessage,
  onUpdateConnectionInfo,
}) => {
  return (
    <div className="Connections container">
      <AddConnectionInfo onAddConnectionInfo={onAddConnectionInfo} />

      <hr/>

      {connectionsInfo.map((c) => {
        const { id } = c
        return (
          <Connection
            key={id}
            connectionInfo={c}
            onConnect={() => onConnect(id)}
            onDisconnect={() => onDisconnect(id)}
            onRemoveConnectionInfo={() => onRemoveConnectionInfo(id)}
            onSendMessage={(message) => onSendMessage(id, message)}
            onUpdateConnectionInfo={(field, value) => onUpdateConnectionInfo(id, field, value)}
          />
        )
      })}
    </div>
  )
}

export default Header
