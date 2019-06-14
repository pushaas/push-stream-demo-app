import React, { Component } from 'react'

import Connections from './Connections'
import Footer from './Footer'
import Header from './Header'

import {
  deletePushStreamInstance,
  getPushStreamInstance,
  newPushStreamInstance,
  setPushStreamInstance,
  translateStatus,
} from '../../services/pushStreamService'

import {
  loadSuggestions,
  updateSuggestions,
} from '../../services/suggestionService'

import ConnectionInfo from '../../models/ConnectionInfo'
import Log from '../../models/Log'
import Message from '../../models/Message'

const suggestionsKey = 'connectionInfo'

class App extends Component {
  state = {
    connectionsInfo: [],
    suggestions: loadSuggestions(suggestionsKey),
  }

  findConnectionInfo(id, state) {
    const stateToUse = state ? state : this.state
    return stateToUse.connectionsInfo.find(c => c.id === id)
  }

  updateConnectionInfoSuggestions = (field, value) => {
    const fieldsWithSuggestion = ['channel', 'host', 'mode', 'port']
    if (!fieldsWithSuggestion.includes(field)) {
      return
    }

    this.setState((state) => ({
      suggestions: {
        ...state.suggestions,
        [field]: value,
      },
    }), () => updateSuggestions(suggestionsKey, this.state.suggestions))
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
    this.setState((state) => ({
      connectionsInfo: [...state.connectionsInfo, new ConnectionInfo({
        ...state.suggestions,
      })],
    }))
  }

  handleUpdateConnectionInfo = (id, field, value) => {
    this.updateConnectionInfoSuggestions(field, value)

    this.setState((state) => {
      const connectionInfo = this.findConnectionInfo(id, state)
      const updated = { ...connectionInfo, [field]: value }
      return {
        connectionsInfo: state.connectionsInfo.map(c => c.id === id ? updated : c ),
      }
    })
  }

  handleAddConnectionLog = (id, log) => {

    if (!this.findConnectionInfo(id)) {
      // se removida, não adiciona os últimos logs
      return
    }

    this.setState((state) => {
      const connectionInfo = this.findConnectionInfo(id, state)
      const updated = { ...connectionInfo, logs: [...connectionInfo.logs, log] }
      return {
        connectionsInfo: state.connectionsInfo.map(c => c.id === id ? updated : c ),
      }
    })
  }

  handleAddConnectionMessage = (id, message) => {
    this.setState((state) => {
      const connectionInfo = this.findConnectionInfo(id, state)
      const updated = { ...connectionInfo, messages: [...connectionInfo.messages, message] }
      return {
        connectionsInfo: state.connectionsInfo.map(c => c.id === id ? updated : c ),
      }
    })
  }

  handleRemoveConnectionInfo = (id) => {
    this.handleDisconnect(id)

    this.setState((state) => ({
      connectionsInfo: [...state.connectionsInfo.filter(c => c.id !== id)],
    }))
  }

  handleConnect = (id) => {
    if (getPushStreamInstance(id)) {
      this.handleAddConnectionLog(id, new Log({ text: `[handleConnect] already connected` }))
      return
    }

    const connectionInfo = this.findConnectionInfo(id)
    const settings = {
      host: connectionInfo.host,
      port: connectionInfo.port,
      modes: connectionInfo.mode,
      onchanneldeleted: (info) => {
        console.warn('[onchanneldeleted]', info)
        this.handleAddConnectionLog(id, new Log({ text: `[onchanneldeleted] ${JSON.stringify(info)}` }))
      },
      onmessage: (message, messageId, channel) => this.handleAddConnectionMessage(id, new Message({ text: message })),
      onerror: (err) => {
        console.error('[onerror]', err)
        this.handleAddConnectionLog(id, new Log({ text: `[onerror] ${JSON.stringify(err)}` }))
        deletePushStreamInstance(id)
      },
      onstatuschange: (status) => {
        this.handleAddConnectionLog(id, new Log({ text: `[onstatuschange] ${translateStatus(status)}` }))
        this.handleUpdateConnectionInfo(id, 'status', status)
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
        <Footer />
      </div>
    )
  }
}

export default App
