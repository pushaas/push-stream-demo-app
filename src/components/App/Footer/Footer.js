import React, { Component } from 'react'

import {
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_ERROR,
  setLogLevel,
} from '../../../services/pushStreamService'

import {
  loadSuggestions,
  updateSuggestions,
  resetSuggestions,
} from '../../../services/suggestionService'

const suggestionsKey = 'logLevel'

class Footer extends Component {
  state = {
    logLevel: loadSuggestions(suggestionsKey),
  }

  handleChangeLogLevel = (e) => {
    const logLevel = e.target.value

    this.setState((state) => ({
      logLevel,
    }), () => {
      setLogLevel(logLevel)
      updateSuggestions(suggestionsKey, logLevel)
    })
  }

  render() {
    return (
      <footer className="Footer container">
        <div className="row">

          <div className="offset-by-three three columns">
            <label htmlFor="logLevel">Console log level</label>
            <select
              id="logLevel"
              className="u-full-width"
              value={this.state.logLevel}
              onChange={this.handleChangeLogLevel}
            >
              <option value={LOG_LEVEL_DEBUG}>{LOG_LEVEL_DEBUG}</option>
              <option value={LOG_LEVEL_INFO}>{LOG_LEVEL_INFO}</option>
              <option value={LOG_LEVEL_ERROR}>{LOG_LEVEL_ERROR}</option>
            </select>
          </div>

          <div className="three columns">
            <label htmlFor="resetSuggestions">Reset suggestions</label>
            <button
              id="resetSuggestions"
              className="u-full-width"
              value={this.state.logLevel}
              onClick={resetSuggestions}
            >
              reset
            </button>
          </div>

        </div>
      </footer>
    )
  }
}

export default Footer
