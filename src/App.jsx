import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Categories } from './pages/Categories'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Leaderboard } from './pages/Leaderboard'
import { Login } from './pages/Login'
import { NotFoundPage } from './pages/NotFoundPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { ProfilePage } from './pages/ProfilePage'
import { Quiz } from './pages/Quiz'
import { Result } from './pages/Result'
import { SettingsPage } from './pages/SettingsPage'
import { Signup } from './pages/Signup'
import { AppProviders } from './app/providers/AppProviders'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { PageTransition } from './components/common/PageTransition'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
