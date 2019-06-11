import idService from '../services/idService'

import PushStream from '../external/PushStream'

const idGenerator = idService.createIdGenerator()

class ConnectionInfo {
  constructor({
    channel = '',
    host = '',
    mode = '',
    port = '',
    state = PushStream.CLOSED,
  }) {
    this.id = idGenerator()

    this.channel = channel
    this.host = host
    this.mode = mode
    this.port = port
    this.state = state

    this.logs = []
    this.messages = []
  }
}

export default ConnectionInfo
