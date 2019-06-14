import debounce from 'lodash/debounce'

import { suggestionsKey } from '../../constants/localStorage'
import { modeEventSource } from '../../constants/modes'

const getDefaults = () => ({
  connectionInfo: {
    channel: 'test',
    host: 'localhost',
    mode: modeEventSource,
    port: '9080',
  },
})

export const clearSuggestions = () => localStorage.removeItem(suggestionsKey)

export const loadSuggestions = () => {
  const savedSuggestion = localStorage.getItem(suggestionsKey)
  if (savedSuggestion) {
    return JSON.parse(savedSuggestion)
  }
  return getDefaults()
}

export const saveSuggestions = debounce((suggestions) => {
  localStorage.setItem(suggestionsKey, JSON.stringify(suggestions))
}, 300)
