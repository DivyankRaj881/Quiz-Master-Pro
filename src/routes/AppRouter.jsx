import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { QuizPage } from '../pages/QuizPage'
import { ResultsPage } from '../pages/ResultsPage'
import { SettingsPage } from '../pages/SettingsPage'
import { ProfilePage } from '../pages/ProfilePage'
import { LeaderboardPage } from '../pages/LeaderboardPage'
import { GameTutorialPage } from '../pages/GameTutorialPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/game-tutorial" element={<GameTutorialPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
