import React from 'react'

import {
  modeEventSource,
  modeLongPolling,
  modeStream,
  modeWebSocket,
} from '../../../../../constants/modes'

const Mode = ({ connectionInfo, onUpdateConnectionInfo }) => {
  return (
    <div className="Mode">
      <select
        value={connectionInfo.mode}
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

export default Mode
