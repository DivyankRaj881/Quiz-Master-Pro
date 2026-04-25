import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isDisabled = useMemo(
    () => form.email.trim() === '' || form.password.trim() === '',
    [form.email, form.password],
  )

  const validate = () => {
    const nextErrors = {}

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setAuthError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const result = login(form.email, form.password)
    if (!result.ok) {
      setAuthError(result.error)
      return
    }
    navigate('/dashboard')
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full overflow-hidden rounded-3xl border border-app-border/80 bg-app-card shadow-premium lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-primary-700 via-primary-600 to-cyan-500 p-8 lg:block">
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Welcome back</h1>
          <p className="mt-4 max-w-sm text-sm text-cyan-50/90">
            Continue building high-performing quizzes and monitor learner outcomes in real time.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-100">Login to QuizMaster Pro</h2>
          <p className="mt-2 text-sm text-app-muted">Use your account credentials to continue.</p>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className="grid gap-2">
              <span className="text-sm text-slate-200">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-xl border border-app-border bg-app-surface px-4 py-3 text-slate-100 outline-none transition focus:border-primary-500"
                placeholder="you@company.com"
              />
              {errors.email ? <span className="text-xs text-rose-400">{errors.email}</span> : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm text-slate-200">Password</span>
              <div className="flex items-center rounded-xl border border-app-border bg-app-surface focus-within:border-primary-500">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-3 text-slate-100 outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="mr-2 rounded-lg px-3 py-1 text-xs font-medium text-primary-300 hover:bg-primary-900/40"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password ? <span className="text-xs text-rose-400">{errors.password}</span> : null}
            </label>

            {authError ? <p className="text-sm text-rose-400">{authError}</p> : null}

            <button
              type="submit"
              disabled={isDisabled}
              className="mt-2 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-app-bg transition hover:from-primary-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Login
            </button>
          </form>

          <p className="mt-5 text-sm text-app-muted">
            No account yet?{' '}
            <Link to="/signup" className="font-medium text-primary-300 hover:text-primary-200">
              Create one
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
