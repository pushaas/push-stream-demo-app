import React from 'react'

import Channel from './Channel'
import Connect from './Connect'
import Disconnect from './Disconnect'
import Host from './Host'
import Logs from './Logs'
import Messages from './Messages'
import Mode from './Mode'
import NewMessage from './NewMessage'
import Port from './Port'
import RemoveConnectionInfo from './RemoveConnectionInfo'

import {
  isClosed,
  isConnecting,
  isOpen,
} from '../../../../services/pushStreamService'

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
      <p><label>Connection {connectionInfo.id}</label></p>

      <div className="row">
        <div className="three columns"><Host connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
        <div className="three columns"><Port connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
        <div className="three columns"><Channel connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
        <div className="three columns"><Mode connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
      </div>

      <div className="row">
        <div className="offset-by-three two columns"><Connect onConnect={onConnect} /></div>
        <div className="two columns"><Disconnect onDisconnect={onDisconnect} /></div>
        <div className="two columns"><RemoveConnectionInfo onRemoveConnectionInfo={onRemoveConnectionInfo} /></div>
      </div>

      {isOpen(connectionInfo) ? (
        <div className="row">
          <div className="six columns"><Logs connectionInfo={connectionInfo} /></div>
          <div className="six columns"><Messages connectionInfo={connectionInfo} /></div>
        </div>
      ) : null}

      {isOpen(connectionInfo) ? (<NewMessage onSendMessage={onSendMessage} />) : null}

      <hr/>
    </div>
  )
}

export default Connection
