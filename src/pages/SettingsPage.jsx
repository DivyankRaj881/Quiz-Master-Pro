import { motion as Motion } from 'framer-motion'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/common/Card'
import { SettingsItem } from '../components/common/SettingsItem'
import { useSettings } from '../hooks/useSettings'
import { useAuth } from '../hooks/useAuth'
import { buttonVariants, containerVariants, slideUpVariants } from '../utils/animations'

export function SettingsPage() {
  const {
    settings,
    toggleTheme,
    toggleSound,
    resetProgress,
    updateDifficulty,
    updateTimePerQuestion,
    toggleShowHints,
    toggleShuffleQuestions,
    toggleImmediateResults,
  } = useSettings()
  const { logout, currentUser } = useAuth()

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout()
    }
  }

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all your progress? This action cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <Motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10"
    >
      <PageHeader title="Settings" subtitle="Configure application and account preferences." />

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <Card className="p-6">
          <Motion.h3
            variants={slideUpVariants}
            className="mb-6 text-lg font-semibold text-app-text"
          >
            Appearance
          </Motion.h3>

          <div className="space-y-4">
            <SettingsItem
              label="Theme"
              description="Switch between dark and light mode"
              action={
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card ${
                    settings.theme === 'dark' ? 'bg-primary-600' : 'bg-app-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Motion.button>
              }
            />

            <SettingsItem
              label="Sound Effects"
              description="Enable or disable sound effects"
              action={
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleSound}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card ${
                    settings.sound ? 'bg-primary-600' : 'bg-app-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.sound ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Motion.button>
              }
            />
          </div>
        </Card>

        <Card className="p-6">
          <Motion.h3
            variants={slideUpVariants}
            className="mb-6 text-lg font-semibold text-app-text"
          >
            Game Quiz Settings
          </Motion.h3>

          <div className="space-y-4">
            <SettingsItem
              label="Difficulty Level"
              description="Choose quiz difficulty level"
              action={
                <select
                  value={settings.difficulty}
                  onChange={(e) => updateDifficulty(e.target.value)}
                  className="rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm font-medium text-app-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              }
            />

            <SettingsItem
              label="Time Per Question"
              description="Seconds allowed per question"
              action={
                <select
                  value={settings.timePerQuestion}
                  onChange={(e) => updateTimePerQuestion(parseInt(e.target.value))}
                  className="rounded-lg border border-app-border bg-app-surface px-3 py-2 text-sm font-medium text-app-text focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="15">15s</option>
                  <option value="30">30s</option>
                  <option value="60">60s</option>
                  <option value="120">120s</option>
                </select>
              }
            />

            <SettingsItem
              label="Show Hints"
              description="Display hints during quiz"
              action={
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleShowHints}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card ${
                    settings.showHints ? 'bg-primary-600' : 'bg-app-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.showHints ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Motion.button>
              }
            />

            <SettingsItem
              label="Shuffle Questions"
              description="Randomize question order"
              action={
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleShuffleQuestions}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card ${
                    settings.shuffleQuestions ? 'bg-primary-600' : 'bg-app-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.shuffleQuestions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Motion.button>
              }
            />

            <SettingsItem
              label="Immediate Results"
              description="Show results after each question"
              action={
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={toggleImmediateResults}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-app-card ${
                    settings.immediateResults ? 'bg-primary-600' : 'bg-app-border'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.immediateResults ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </Motion.button>
              }
            />
          </div>
        </Card>

        <Card className="p-6">
          <Motion.h3
            variants={slideUpVariants}
            className="mb-6 text-lg font-semibold text-app-text"
          >
            Progress
          </Motion.h3>

          <SettingsItem
            label="Reset Progress"
            description="Clear all quiz answers and progress data"
            action={
              <Motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleResetProgress}
                className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-app-card"
              >
                Reset
              </Motion.button>
            }
          />
        </Card>

        {currentUser && (
          <Card className="p-6">
            <Motion.h3
              variants={slideUpVariants}
              className="mb-6 text-lg font-semibold text-app-text"
            >
              Account
            </Motion.h3>

            <SettingsItem
              label="Current User"
              description={currentUser.email}
              action={<span className="text-sm text-app-muted" />}
            />
            <SettingsItem
              label="Logout"
              description="Sign out of your account"
              action={
                <Motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleLogout}
                  className="rounded-lg border border-app-border bg-app-surface px-4 py-2 text-sm font-medium text-app-text hover:bg-app-border focus:outline-none focus:ring-2 focus:ring-app-border focus:ring-offset-2 focus:ring-offset-app-card"
                >
                  Logout
                </Motion.button>
              }
            />
          </Card>
        )}

        <Card className="p-6">
          <Motion.h3
            variants={slideUpVariants}
            className="mb-6 text-lg font-semibold text-app-text"
          >
            About
          </Motion.h3>

          <SettingsItem
            label="Version"
            description="Quiz Master v1.0.0"
            action={<span className="text-sm text-app-muted" />}
          />
          <SettingsItem
            label="Storage"
            description="Settings and preferences are stored locally in your browser"
            action={<span className="text-sm text-app-muted" />}
          />
        </Card>
      </Motion.div>
    </Motion.main>
  )
}
