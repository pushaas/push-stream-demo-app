import React, { Component } from 'react'

import Header from './Header'
import Connections from './Connections'

import { newConnection } from '../../services/pushStreamService'

import ConnectionInfo from '../../models/ConnectionInfo'
import Log from '../../models/Log'
import Message from '../../models/Message'

import { modeEventSource } from '../../constants/modes'

const pushStreamInstances = {}
const getPushStreamInstance = (id) => pushStreamInstances[id]
const deletePushStreamInstance = (id) => delete pushStreamInstances[id]

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
    const { id } = connectionInfo
    const pushStreamInstance = getPushStreamInstance(id)
    if (!pushStreamInstance) {
      return
    }
    pushStreamInstance.sendMessage(message)
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

  handleUpdateConnectionInfo = (connectionInfo, field, value, cb) => {
    this.updateConnectionInfoSuggestions(field, value)

    const updated = { ...connectionInfo, [field]: value }
    this.setState({
      connectionsInfo: this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c ),
    }, cb)
  }

  handleAddConnectionLog = (id, log) => {
    const connectionInfo = this.state.connectionsInfo.find(c => c.id === id)
    const updated = { ...connectionInfo, logs: [...connectionInfo.logs, log] }
    this.setState({
      connectionsInfo: this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c ),
    })
  }

  handleAddConnectionMessage = (id, message) => {
    const connectionInfo = this.state.connectionsInfo.find(c => c.id === id)
    const updated = { ...connectionInfo, messages: [...connectionInfo.messages, message] }
    this.setState({
      connectionsInfo: this.state.connectionsInfo.map(c => c === connectionInfo ? updated : c ),
    })
  }

  handleRemoveConnectionInfo = (connectionInfo) => {
    this.handleDisconnect(connectionInfo)

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.filter(c => c !== connectionInfo)],
    })
  }

  handleConnect = (connectionInfo) => {
    const { id } = connectionInfo


    if (pushStreamInstances[id]) {
      this.handleAddConnectionLog(id, new Log({ text: `[handleConnect] already connected` }))
      return
    }

    const settings = {
      host: connectionInfo.hostname,
      port: connectionInfo.port,
      modes: connectionInfo.mode,
      onchanneldeleted: (a, b, c) => console.log('### onchanneldeleted', a, b, c),
      onmessage: (message, messageId, channel) => this.handleAddConnectionMessage(id, new Message({ text: message })),
      onerror: (a, b, c) => console.log('### onerror', a, b, c),
      onstatuschange: (status) => {
        const connectionInfoNow = this.state.connectionsInfo.find(c => c.id === id)
        this.handleUpdateConnectionInfo(connectionInfoNow, 'status', status, () => {
          this.handleAddConnectionLog(id, new Log({ text: `[onstatuschange] ${status}` }))
        })
      },
    }

    const pushStreamInstance = newConnection(settings)
    pushStreamInstance.addChannel(connectionInfo.channel)
    pushStreamInstance.connect()
    pushStreamInstances[id] = pushStreamInstance
  }

  handleDisconnect = (connectionInfo) => {
    const { id } = connectionInfo
    const pushStreamInstance = getPushStreamInstance(id)

    if (!pushStreamInstance) {
      this.handleAddConnectionLog(id, new Log({ text: `[handleDisconnect] already disconnected` }))
      return
    }

    pushStreamInstance.disconnect()
    deletePushStreamInstance(id)
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
