import { createContext, useEffect, useState } from 'react'

const SETTINGS_KEY = 'qm_settings'

const defaultSettings = {
  theme: 'dark',
  sound: true,
  difficulty: 'medium',
  timePerQuestion: 30,
  showHints: true,
  shuffleQuestions: true,
  immediateResults: false,
}

function readSettings() {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY)
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

const SettingsContext = createContext()

export { SettingsContext }

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(readSettings)

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = settings.theme
  }, [settings.theme])

  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const toggleTheme = () => {
    updateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark')
  }

  const toggleSound = () => {
    updateSetting('sound', !settings.sound)
  }

  const resetProgress = () => {
    // Clear quiz-related data from localStorage
    localStorage.removeItem('qm_answers')
    localStorage.removeItem('qm_current_quiz')
    // You might want to add more quiz-related keys here
    alert('Progress has been reset!')
  }

  const updateDifficulty = (difficulty) => {
    updateSetting('difficulty', difficulty)
  }

  const updateTimePerQuestion = (time) => {
    updateSetting('timePerQuestion', time)
  }

  const toggleShowHints = () => {
    updateSetting('showHints', !settings.showHints)
  }

  const toggleShuffleQuestions = () => {
    updateSetting('shuffleQuestions', !settings.shuffleQuestions)
  }

  const toggleImmediateResults = () => {
    updateSetting('immediateResults', !settings.immediateResults)
  }

  const value = {
    settings,
    updateSetting,
    toggleTheme,
    toggleSound,
    resetProgress,
    updateDifficulty,
    updateTimePerQuestion,
    toggleShowHints,
    toggleShuffleQuestions,
    toggleImmediateResults,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}