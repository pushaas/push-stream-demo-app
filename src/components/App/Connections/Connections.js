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

      {connectionsInfo.map(c => (<Connection
        key={c.id}
        connectionInfo={c}
        onConnect={() => onConnect(c)}
        onDisconnect={() => onDisconnect(c)}
        onRemoveConnectionInfo={() => onRemoveConnectionInfo(c)}
        onSendMessage={(message) => onSendMessage(c, message)}
        onUpdateConnectionInfo={(field, value) => onUpdateConnectionInfo(c, field, value)}
      />))}
    </div>
  )
}

export default Header
