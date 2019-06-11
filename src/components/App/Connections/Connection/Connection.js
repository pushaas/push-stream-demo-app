import React from 'react'

import Channel from './Channel'
import Connect from './Connect'
import Disconnect from './Disconnect'
import Host from './Host'
import Logs from './Logs'
import Messages from './Messages'
import Mode from './Mode'
import Port from './Port'
import RemoveConnectionInfo from './RemoveConnectionInfo'

const Connection = ({
  connectionInfo,
  onConnect,
  onDisconnect,
  onRemoveConnectionInfo,
  onSendMessage,
  onUpdateConnectionInfo,
}) => {
  return (
    <div className="Connection">
      <p>Connection {connectionInfo.id}</p>

      <div className="Connection_form">
        <Host connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
        <Port connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
        <Channel connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
        <Mode connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
      </div>

      <div className="Connection_actions">
        <Connect onConnect={onConnect} />
        <Disconnect onDisconnect={onDisconnect} />
        <RemoveConnectionInfo onRemoveConnectionInfo={onRemoveConnectionInfo} />
      </div>

      <div className="Connection_data">
        <Messages connectionInfo={connectionInfo} onSendMessage={onSendMessage} />
        <Logs connectionInfo={connectionInfo} />
      </div>

      <hr/>
    </div>
  )
}

export default Connection
