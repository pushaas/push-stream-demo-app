import React, { Component } from 'react'

import Header from './Header'
import Connections from './Connections'

import {
  deletePushStreamInstance,
  getPushStreamInstance,
  newPushStreamInstance,
  setPushStreamInstance,
} from '../../services/pushStreamService'

import {
  loadSuggestions,
  saveSuggestions,
} from '../../services/suggestionService'

import ConnectionInfo from '../../models/ConnectionInfo'
import Log from '../../models/Log'
import Message from '../../models/Message'

class App extends Component {
  state = {
    connectionsInfo: [],
    suggestions: loadSuggestions(),
  }

  findConnectionInfo(id) {
    return this.state.connectionsInfo.find(c => c.id === id)
  }

  updateConnectionInfoSuggestions = (field, value) => {
    const suggestions = {
      ...this.state.suggestions,
      connectionInfo: { ...this.state.suggestions.connectionInfo, [field]: value }
    }

    saveSuggestions(suggestions)

    this.setState({
      suggestions,
    })
  }

  /*
    ---------------
    lifecycle
    ---------------
  */
  componentDidMount() {
    this.handleAddConnectionInfo()
  }

  /*
    ---------------
    handlers
    ---------------
  */
  handleSendMessage = (id, message) => {
    const pushStreamInstance = getPushStreamInstance(id)
    if (!pushStreamInstance) {
      return
    }
    pushStreamInstance.sendMessage(message)
  }

  handleAddConnectionInfo = () => {
    const connectionInfo = new ConnectionInfo({
      ...this.state.suggestions.connectionInfo,
    })

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo, connectionInfo],
    })
  }

  handleUpdateConnectionInfo = (id, field, value, cb) => {
    this.updateConnectionInfoSuggestions(field, value)

    const connectionInfo = this.findConnectionInfo(id)
    const updated = { ...connectionInfo, [field]: value }
    this.setState({
      connectionsInfo: this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c ),
    }, cb)
  }

  handleAddConnectionLog = (id, log) => {
    const connectionInfo = this.findConnectionInfo(id)

    if (!connectionInfo) {
      // se removida, não adiciona os últimos logs
      return
    }

    const updated = { ...connectionInfo, logs: [...connectionInfo.logs, log] }
    this.setState({
      connectionsInfo: this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c ),
    })
  }

  handleAddConnectionMessage = (id, message) => {
    const connectionInfo = this.findConnectionInfo(id)
    const updated = { ...connectionInfo, messages: [...connectionInfo.messages, message] }
    this.setState({
      connectionsInfo: this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c ),
    })
  }

  handleRemoveConnectionInfo = (id) => {
    this.handleDisconnect(id)

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.filter(c => c.id !== id)],
    })
  }

  handleConnect = (id) => {
    if (getPushStreamInstance(id)) {
      this.handleAddConnectionLog(id, new Log({ text: `[handleConnect] already connected` }))
      return
    }

    const connectionInfo = this.findConnectionInfo(id)
    const settings = {
      host: connectionInfo.hostname,
      port: connectionInfo.port,
      modes: connectionInfo.mode,
      onchanneldeleted: (a, b, c) => console.log('### onchanneldeleted', a, b, c),
      onmessage: (message, messageId, channel) => this.handleAddConnectionMessage(id, new Message({ text: message })),
      onerror: (a, b, c) => console.log('### onerror', a, b, c),
      onstatuschange: (status) => {
        this.handleUpdateConnectionInfo(id, 'status', status, () => {
          // TODO usar setState com function
          this.handleAddConnectionLog(id, new Log({ text: `[onstatuschange] ${status}` }))
        })
      },
    }

    const pushStreamInstance = newPushStreamInstance(settings)
    pushStreamInstance.addChannel(connectionInfo.channel)
    pushStreamInstance.connect()
    setPushStreamInstance(id, pushStreamInstance)
  }

  handleDisconnect = (id) => {
    const pushStreamInstance = getPushStreamInstance(id)

    if (!pushStreamInstance) {
      this.handleAddConnectionLog(id, new Log({ text: `[handleDisconnect] already disconnected` }))
      return
    }

    pushStreamInstance.disconnect()
    deletePushStreamInstance(id)
  }

  /*
    ---------------
    render
    ---------------
  */
  render() {
    return (
      <div className="App">
        <Header />
        <Connections
          connectionsInfo={this.state.connectionsInfo}
          onAddConnectionInfo={this.handleAddConnectionInfo}
          onConnect={this.handleConnect}
          onDisconnect={this.handleDisconnect}
          onRemoveConnectionInfo={this.handleRemoveConnectionInfo}
          onSendMessage={this.handleSendMessage}
          onUpdateConnectionInfo={this.handleUpdateConnectionInfo}
        />
      </div>
    )
  }
}

export default App
