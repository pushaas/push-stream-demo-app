import { modeEventSource } from '../constants/modes'

class ConnectionInfo {
  constructor({
    id,
    state,
    host = '',
    mode = modeEventSource,
  }) {
    this.id = id
    this.state = state
    this.host = host
    this.mode = mode
  }
}

export default ConnectionInfo
