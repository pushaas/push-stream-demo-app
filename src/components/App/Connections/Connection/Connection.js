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

      <div className="Connection_form row">
        <div className="three column"><Host connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
        <div className="three column"><Port connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
        <div className="three column"><Channel connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
        <div className="three column"><Mode connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} /></div>
      </div>

      <div className="Connection_actions row">
        <div className="three column"></div>
        <div className="two column "><Connect onConnect={onConnect} /></div>
        <div className="two column"><Disconnect onDisconnect={onDisconnect} /></div>
        <div className="two column"><RemoveConnectionInfo onRemoveConnectionInfo={onRemoveConnectionInfo} /></div>
        <div className="three column"></div>
      </div>

      <div className="Connection_data row">
        <div className="six column"><Messages connectionInfo={connectionInfo} /></div>
        <div className="six column"><Logs connectionInfo={connectionInfo} /></div>
      </div>

      <div className="Connection_data row">
        <div className="six column"><NewMessage onSendMessage={onSendMessage} /></div>
        <div className="six column"></div>
      </div>

      <hr/>
    </div>
  )
}

export default Connection
