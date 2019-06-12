import { createIdGenerator } from '../services/idService'

const idGenerator = createIdGenerator()

export default class Message {
  constructor({
    text,
  }) {
    this.id = idGenerator()

    this.text = text
  }
}
