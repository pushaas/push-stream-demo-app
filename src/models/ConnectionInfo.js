import idService from '../services/idService'

import PushStream from '../external/PushStream'

const idGenerator = idService.createIdGenerator()

class ConnectionInfo {
  constructor({
    channel = '',
    host = '',
    mode = '',
    port = '',
    status = PushStream.CLOSED,
  }) {
    this.id = idGenerator()

    this.channel = channel
    this.host = host
    this.mode = mode
    this.port = port
    this.status = status

    this.logs = []
    this.messages = []
  }
}

export default ConnectionInfo
