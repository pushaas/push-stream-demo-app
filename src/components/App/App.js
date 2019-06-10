import React, { Component } from 'react'

import Header from './Header'
import Connections from './Connections'

import idService from '../../services/idService'
import pushStreamService from '../../services/pushStreamService'

import ConnectionInfo from '../../models/ConnectionInfo'

import PushStream from '../../external/PushStream'

class App extends Component {
  state = {
    connectionsInfo: [],
  }

  componentDidMount() {
    this.pushStream = pushStreamService.newConnection()
  }

  handleAddConnectionInfo = () => {
    const connectionInfo = new ConnectionInfo({
      id: idService.generateId(),
      state: PushStream.CLOSED,
    })

    this.setState({
      connectionsInfo: [...this.state.connectionsInfo, connectionInfo],
    })
  }

  handleUpdateConnectionInfo = (connectionInfo, field, value) => {
    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.map(c => c === connectionInfo ? { ...connectionInfo, [field]: value } : connectionInfo )],
    })
  }

  handleRemoveConnectionInfo = (connectionInfo) => {
    this.setState({
      connectionsInfo: [...this.state.connectionsInfo.filter(c => c !== connectionInfo)],
    })
  }

  handleConnect = (connectionInfo) => {
    console.log('### handleConnect', connectionInfo)
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
