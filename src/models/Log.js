import { createIdGenerator } from '../services/idService'

const idGenerator = createIdGenerator()

export default class Log {
  constructor({
    text,
  }) {
    this.id = idGenerator()

    this.text = text
  }
}
