import React, { Component } from 'react'

import {
  isOpen,
} from '../../../../../services/pushStreamService'

class NewMessage extends Component {
  state = {
    text: '',
  }

  handleChangeText = (e) => {
    this.setState({ text: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state
    if (!text) {
      return
    }

    const { onSendMessage } = this.props
    onSendMessage(text)
    this.setState({ text: '' })
  }

  render() {
    const { connectionInfo } = this.props
    const disabled = !isOpen(connectionInfo)

    return (
      <div className="NewMessage">
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="offset-by-six four columns">
              <input
                className="u-full-width"
                disabled={disabled}
                type="text"
                value={this.state.text}
                onChange={this.handleChangeText}
              />
            </div>
            <div className="two columns">
              <button
                className="u-full-width"
                disabled={disabled}
                type="submit"
              >
                send
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default NewMessage
