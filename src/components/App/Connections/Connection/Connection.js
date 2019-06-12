import React from 'react'

import Channel from './Channel'
import ToggleConnect from './ToggleConnect'
import Host from './Host'
import Logs from './Logs'
import Messages from './Messages'
import Mode from './Mode'
import NewMessage from './NewMessage'
import Port from './Port'
import RemoveConnectionInfo from './RemoveConnectionInfo'

import {
  isClosed,
} from '../../../../services/pushStreamService'

const Connection = ({
  connectionInfo,
  onConnect,
  onDisconnect,
  onRemoveConnectionInfo,
  onSendMessage,
  onUpdateConnectionInfo,
}) => {
  // fields
  const fieldsDisabled = !isClosed(connectionInfo)
  const host = <Host disabled={fieldsDisabled} connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
  const port = <Port disabled={fieldsDisabled} connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
  const channel = <Channel disabled={fieldsDisabled} connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />
  const mode = <Mode disabled={fieldsDisabled} connectionInfo={connectionInfo} onUpdateConnectionInfo={onUpdateConnectionInfo} />

  // buttons
  const toggleConnect = <ToggleConnect connectionInfo={connectionInfo} onConnect={onConnect} onDisconnect={onDisconnect} />
  const removeConnectionInfo = <RemoveConnectionInfo onRemoveConnectionInfo={onRemoveConnectionInfo} />

  // data
  const logs = <Logs connectionInfo={connectionInfo} />
  const messages = <Messages connectionInfo={connectionInfo} />

  return (
    <div className="Connection">
      <p><label>Connection {connectionInfo.id}</label></p>

      <div className="row">
        <div className="three columns">{host}</div>
        <div className="three columns">{port}</div>
        <div className="three columns">{channel}</div>
        <div className="three columns">{mode}</div>
      </div>

      <div className="row">
        <div className="offset-by-three three columns">{toggleConnect}</div>
        <div className="three columns">{removeConnectionInfo}</div>
      </div>

      <div className="row">
        <div className="six columns">{logs}</div>
        <div className="six columns">{messages}</div>
      </div>

      <NewMessage connectionInfo={connectionInfo} onSendMessage={onSendMessage} />

      <hr/>
    </div>
  )
}

export default Connection
