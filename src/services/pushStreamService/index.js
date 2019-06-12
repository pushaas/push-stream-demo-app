import PushStream from '../../external/PushStream'

export const isClosed = (connectionInfo) => connectionInfo.status === PushStream.CLOSED
export const isConnecting = (connectionInfo) => connectionInfo.status === PushStream.CONNECTING
export const isOpen = (connectionInfo) => connectionInfo.status === PushStream.OPEN

const pushStreamInstances = {}
export const deletePushStreamInstance = (id) => delete pushStreamInstances[id]
export const getPushStreamInstance = (id) => pushStreamInstances[id]
export const newPushStreamInstance = (settings) => new PushStream(settings)
export const setPushStreamInstance = (id, pushStreamInstance) => { pushStreamInstances[id] = pushStreamInstance }
