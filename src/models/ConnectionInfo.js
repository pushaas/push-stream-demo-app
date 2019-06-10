import idService from '../services/idService'

import PushStream from '../external/PushStream'

class ConnectionInfo {
  constructor({
    channel = '',
    host = '',
    mode = '',
    port = '',
    state = PushStream.CLOSED,
  }) {
    this.id = idService.generateId()

    this.channel = channel
    this.host = host
    this.mode = mode
    this.port = port
    this.state = state
  }
}

export default ConnectionInfo
