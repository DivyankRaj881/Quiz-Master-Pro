import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const isDisabled = useMemo(
    () =>
      form.name.trim() === '' ||
      form.email.trim() === '' ||
      form.password === '' ||
      form.confirmPassword === '',
    [form.confirmPassword, form.email, form.name, form.password],
  )

  const validate = () => {
    const nextErrors = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Name must be at least 2 characters.'
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }
    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const result = signup({
      name: form.name,
      email: form.email,
      password: form.password,
    })
    if (!result.ok) {
      setErrors((prev) => ({ ...prev, email: result.error }))
      return
    }

    navigate('/dashboard')
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid w-full overflow-hidden rounded-3xl border border-app-border/80 bg-app-card shadow-premium lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-app-surface via-primary-700 to-cyan-500 p-8 lg:block">
          <h1 className="text-3xl font-bold tracking-tight text-slate-50">Create your account</h1>
          <p className="mt-4 max-w-sm text-sm text-cyan-50/90">
            Start with QuizMaster Pro and launch engaging assessments for your learners today.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-100">Signup for QuizMaster Pro</h2>
          <p className="mt-2 text-sm text-app-muted">Create your account in a few steps.</p>

          <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
            <label className="grid gap-2">
              <span className="text-sm text-slate-200">Full name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="rounded-xl border border-app-border bg-app-surface px-4 py-3 text-slate-100 outline-none transition focus:border-primary-500"
                placeholder="Divya Sharma"
              />
              {errors.name ? <span className="text-xs text-rose-400">{errors.name}</span> : null}
            </label>

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
                  placeholder="Create a password"
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

            <label className="grid gap-2">
              <span className="text-sm text-slate-200">Confirm password</span>
              <div className="flex items-center rounded-xl border border-app-border bg-app-surface focus-within:border-primary-500">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-3 text-slate-100 outline-none"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="mr-2 rounded-lg px-3 py-1 text-xs font-medium text-primary-300 hover:bg-primary-900/40"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword ? (
                <span className="text-xs text-rose-400">{errors.confirmPassword}</span>
              ) : null}
            </label>

            <button
              type="submit"
              disabled={isDisabled}
              className="mt-2 rounded-xl bg-gradient-to-r from-primary-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-app-bg transition hover:from-primary-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Account
            </button>
          </form>

          <p className="mt-5 text-sm text-app-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-300 hover:text-primary-200">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
