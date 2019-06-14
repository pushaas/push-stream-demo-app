import PushStream from '../../external/PushStream'

export const isClosed = (connectionInfo) => connectionInfo.status === PushStream.CLOSED
export const isConnecting = (connectionInfo) => connectionInfo.status === PushStream.CONNECTING
export const isOpen = (connectionInfo) => connectionInfo.status === PushStream.OPEN

const pushStreamInstances = {}
export const deletePushStreamInstance = (id) => delete pushStreamInstances[id]
export const getPushStreamInstance = (id) => pushStreamInstances[id]
export const newPushStreamInstance = (settings) => new PushStream(settings)
export const setPushStreamInstance = (id, pushStreamInstance) => { pushStreamInstances[id] = pushStreamInstance }

const statuses = {
  [PushStream.CLOSED]: 'CLOSED',
  [PushStream.CONNECTING]: 'CONNECTING',
  [PushStream.OPEN]: 'OPEN',
}
export const translateStatus = (status) => (statuses[status])

export const LOG_LEVEL_DEBUG = 'debug'
export const LOG_LEVEL_INFO = 'info'
export const LOG_LEVEL_ERROR = 'error'
export const setLogLevel = (level) => { PushStream.LOG_LEVEL = level }
