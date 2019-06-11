import idService from '../services/idService'

const idGenerator = idService.createIdGenerator()

export default class Message {
  constructor({
    text,
  }) {
    this.id = idGenerator()

    this.text = text
  }
}
