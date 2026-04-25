import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from './AuthContextInstance'

const USERS_KEY = 'qm_users'
const CURRENT_USER_KEY = 'qm_current_user'

function readUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]')
}

function readSessionUser() {
  return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) ?? 'null')
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedSession = readSessionUser()
    return storedSession?.isAuthenticated ? storedSession : null
  })

  const login = useCallback((email, password) => {
    const users = readUsers()
    const matchedUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.trim().toLowerCase() &&
        user.password === password,
    )

    if (!matchedUser) {
      return { ok: false, error: 'Invalid email or password.' }
    }

    const sessionUser = {
      id: matchedUser.id,
      firstName: matchedUser.firstName,
      lastName: matchedUser.lastName,
      name: matchedUser.name,
      email: matchedUser.email,
      dob: matchedUser.dob,
      phone: matchedUser.phone,
      country: matchedUser.country,
      address: matchedUser.address,
      city: matchedUser.city,
      zipCode: matchedUser.zipCode,
      isAuthenticated: true,
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser))
    setCurrentUser(sessionUser)
    return { ok: true, user: sessionUser }
  }, [])

  const signup = useCallback((payload) => {
    const users = readUsers()
    const email = payload.email.trim().toLowerCase()

    const userExists = users.some((user) => user.email.toLowerCase() === email)
    if (userExists) {
      return { ok: false, error: 'An account with this email already exists.' }
    }

    const newUser = {
      id: crypto.randomUUID(),
      firstName: payload.firstName?.trim() || '',
      lastName: payload.lastName?.trim() || '',
      name: payload.name?.trim() || '',
      email,
      password: payload.password,
      dob: payload.dob || '',
      phone: payload.phone || '',
      country: payload.country || '',
      address: payload.address || '',
      city: payload.city || '',
      zipCode: payload.zipCode || '',
      createdAt: new Date().toISOString(),
    }

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
    const sessionUser = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      name: newUser.name,
      email: newUser.email,
      dob: newUser.dob,
      phone: newUser.phone,
      country: newUser.country,
      address: newUser.address,
      city: newUser.city,
      zipCode: newUser.zipCode,
      isAuthenticated: true,
    }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser))
    setCurrentUser(sessionUser)
    return { ok: true, user: sessionUser }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(CURRENT_USER_KEY)
    setCurrentUser(null)
  }, [])

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser?.isAuthenticated),
      login,
      signup,
      logout,
    }),
    [currentUser, login, logout, signup],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
