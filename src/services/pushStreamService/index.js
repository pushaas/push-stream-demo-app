import PushStream from '../../external/PushStream'

export const isClosed = (connectionInfo) => connectionInfo.status === PushStream.CLOSED
export const isConnecting = (connectionInfo) => connectionInfo.status === PushStream.CONNECTING
export const isOpen = (connectionInfo) => connectionInfo.status === PushStream.OPEN

export const newConnection = (settings) => {
  return new PushStream(settings)
}
