import PushStream from '../../external/PushStream'

const newConnection = () => {
  return new PushStream()
}

export default {
  newConnection,
}
