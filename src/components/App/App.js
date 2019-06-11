import React, { Component } from 'react'

import Header from './Header'
import Connections from './Connections'

import pushStreamService from '../../services/pushStreamService'

import ConnectionInfo from '../../models/ConnectionInfo'
import Log from '../../models/Log'
import Message from '../../models/Message'

import { modeEventSource } from '../../constants/modes'

class App extends Component {
  state = {
    connectionsInfo: [],
    suggestions: {
      connectionInfo: {
        channel: 'test',
        host: 'localhost',
        mode: modeEventSource,
        port: '9080',
      },
    },
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
  handleSendMessage = (connectionInfo, message) => {
    connectionInfo.pushStream.sendMessage(message)
  }

  updateConnectionInfoSuggestions = (field, value) => {
    this.setState({
      suggestions: {
        ...this.state.suggestions,
        connectionInfo: { ...this.state.suggestions.connectionInfo, [field]: value }
      }
    })
  }

  handleAddConnectionInfo = () => {
    const connectionInfo = new ConnectionInfo({
      ...this.state.suggestions.connectionInfo,
    })

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo, connectionInfo],
    })
  }

  handleUpdateConnectionInfo = (connectionInfo, field, value) => {
    this.updateConnectionInfoSuggestions(field, value)

    const updated = { ...connectionInfo, [field]: value }
    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c )],
    })
  }

  handleAddConnectionLog = (connectionInfo, log) => {
    const updated = { ...connectionInfo, logs: [...connectionInfo.logs, log] }
    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c )],
    })
  }

  handleAddConnectionMessage = (connectionInfo, message) => {
    const updated = { ...connectionInfo, messages: [...connectionInfo.messages, message] }
    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c )],
    })
  }

  handleRemoveConnectionInfo = (connectionInfo) => {
    this.handleDisconnect(connectionInfo)

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.filter(c => c !== connectionInfo)],
    })
  }

  handleConnect = (connectionInfo) => {
    if (connectionInfo.pushStream) {
      this.handleAddConnectionLog(connectionInfo, new Log({ text: `[handleConnect] already connected` }))
      return
    }

    const settings = {
      host: connectionInfo.hostname,
      port: connectionInfo.port,
      modes: connectionInfo.mode,
      onchanneldeleted: (a, b, c) => console.log('### onchanneldeleted', a, b, c),
      onmessage: (message, b, c) => console.log('### onmessage', message, b, c) || this.handleAddConnectionMessage(connectionInfo, new Message({ text: message })),
      onerror: (a, b, c) => console.log('### onerror', a, b, c),
      onstatuschange: (status) => this.handleAddConnectionLog(connectionInfo, new Log({ text: `[onstatuschange] ${status}` })),
    }
    connectionInfo.pushStream = pushStreamService.newConnection(settings)
    connectionInfo.pushStream.addChannel(connectionInfo.channel)
    connectionInfo.pushStream.connect()
  }

  handleDisconnect = (connectionInfo) => {
    if (!connectionInfo.pushStream) {
      this.handleAddConnectionLog(connectionInfo, new Log({ text: `[handleDisconnect] already disconnected` }))
      return
    }
    connectionInfo.pushStream.disconnect()
    delete connectionInfo.pushStream
  }

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
