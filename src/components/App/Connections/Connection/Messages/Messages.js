import React, { Component, Fragment } from 'react'

class Messages extends Component {
  state = {
    text: '',
  }

  handleChangeText = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { onSendMessage } = this.props
    onSendMessage(this.state.message)
    this.setState({ text: '' })
  }

  render() {
    const { connectionInfo } = this.props

    return (
      <div className="Messages">
        <h3>Messages</h3>
        <pre>
          {connectionInfo.messages.map(message => (<Fragment key={message.id}>{`${message.text}\n`}</Fragment>))}
        </pre>
        {connectionInfo.messages.map(message => (<p>{message}</p>))}
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChangeText} />
          <button type="submit">send</button>
        </form>
      </div>
    )
  }
}

export default Messages
