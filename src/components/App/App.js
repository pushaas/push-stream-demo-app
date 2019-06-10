import React, { Component } from 'react'

import Header from './Header'
import Connections from './Connections'

import pushStreamService from '../../services/pushStreamService'

import ConnectionInfo from '../../models/ConnectionInfo'

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

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.map(c => c === connectionInfo ? { ...connectionInfo, [field]: value } : c )],
    })
  }

  handleRemoveConnectionInfo = (connectionInfo) => {
    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.filter(c => c !== connectionInfo)],
    })
  }

  handleConnect = (connectionInfo) => {
    // TODO fill settings
    const settings = {}
    connectionInfo.pushStream = pushStreamService.newConnection(settings)
    connectionInfo.pushStream.connect()
  }

  handleDisconnect = (connectionInfo) => {
    console.log('### handleDisconnect', connectionInfo)
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
          onUpdateConnectionInfo={this.handleUpdateConnectionInfo}
        />
      </div>
    )
  }
}

export default App
