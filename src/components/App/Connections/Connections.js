import React from 'react'

import AddConnectionInfo from './AddConnectionInfo'
import Connection from './Connection'

const Header = ({
  connectionsInfo,
  onAddConnectionInfo,
  onConnect,
  onDisconnect,
  onRemoveConnectionInfo,
  onUpdateConnectionInfo,
}) => {
  return (
    <div className="Connections">
      <AddConnectionInfo onAddConnectionInfo={onAddConnectionInfo} />
      {connectionsInfo.map(c => (<Connection
        key={c.id}
        connectionInfo={c}
        onConnect={() => onConnect(c)}
        onDisconnect={() => onDisconnect(c)}
        onRemoveConnectionInfo={() => onRemoveConnectionInfo(c)}
        onUpdateConnectionInfo={(field, value) => onUpdateConnectionInfo(c, field, value)}
      />))}
    </div>
  )
}

export default Header
