import { AuthProvider } from '../../context/AuthContext'
import { QuizProvider } from '../../context/QuizContext'
import { SettingsProvider } from '../../context/SettingsContext'

export function AppProviders({ children }) {
  return (
    <SettingsProvider>
      <AuthProvider>
        <QuizProvider>{children}</QuizProvider>
      </AuthProvider>
    </SettingsProvider>
  )
}
