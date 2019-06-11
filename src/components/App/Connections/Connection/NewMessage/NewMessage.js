import React, { Component } from 'react'

class NewMessage extends Component {
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
    return (
      <div className="NewMessage">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.text} onChange={this.handleChangeText} />
          <button type="submit">send</button>
        </form>
      </div>
    )
  }
}

export default NewMessage
