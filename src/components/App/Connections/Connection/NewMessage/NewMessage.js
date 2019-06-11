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

    const { text } = this.state
    if (!text) {
      return
    }

    const { onSendMessage } = this.props
    onSendMessage(text)
    this.setState({ text: '' })
  }

  render() {
    return (
      <div className="NewMessage">
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="offset-by-six four columns">
              <input
                className="u-full-width"
                type="text"
                value={this.state.text}
                onChange={this.handleChangeText}
              />
            </div>
            <div className="two columns">
              <button
                className="u-full-width"
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
