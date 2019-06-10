import PushStream from '../../external/PushStream'

const newConnection = (settings) => {
  return new PushStream(settings)
}

export default {
  newConnection,
}
