import React from 'react'

import {
  modeEventSource,
  modeLongPolling,
  modeStream,
  modeWebSocket,
} from '../../../../../constants/modes'

const ConnectionMode = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="ConnectionMode">
      <select
        value={connectionInfo.method}
        onChange={(e) => onUpdateConnectionInfo('mode', e.target.value)}
      >
        <option value={modeEventSource}>{modeEventSource}</option>
        <option value={modeLongPolling}>{modeLongPolling}</option>
        <option value={modeStream}>{modeStream}</option>
        <option value={modeWebSocket}>{modeWebSocket}</option>
      </select>
    </div>
  )
}

export default ConnectionMode
