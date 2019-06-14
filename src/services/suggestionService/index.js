import debounce from 'lodash/debounce'

import { suggestionsKey } from '../../constants/localStorage'
import { modeEventSource } from '../../constants/modes'

import {
  LOG_LEVEL_ERROR,
} from '../pushStreamService'

const getDefaults = () => ({
  connectionInfo: {
    channel: 'test',
    host: 'localhost',
    mode: modeEventSource,
    port: '9080',
  },
  logLevel: LOG_LEVEL_ERROR,
})

export const resetSuggestions = () => localStorage.removeItem(suggestionsKey)

export const loadSuggestions = (key) => {
  const savedSuggestion = localStorage.getItem(suggestionsKey)
  const suggestion = savedSuggestion ? JSON.parse(savedSuggestion) : getDefaults()
  return key ? suggestion[key] : suggestion
}

const doSave = (suggestions) => localStorage.setItem(suggestionsKey, JSON.stringify(suggestions))

export const saveSuggestions = debounce((suggestions) => {
  doSave(suggestions)
}, 200)

export const updateSuggestions = debounce((key, value) => {
  const suggestions = loadSuggestions()
  const updated = {
    ...suggestions,
    [key]: value,
  }
  doSave(updated)
}, 200)
