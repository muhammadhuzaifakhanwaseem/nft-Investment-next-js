"use client"
import { redirect } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" })
        if (res.ok) {
          const data = await res.json()
          setUser(data.user)
          setToken(data.user?.login_token)
        } else {
          logout()
          redirect('/')
        }
      } catch {
        logout()
        redirect('/')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" })
    setUser(null)
    setToken(null)
    redirect('/')
  }

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, loading, logout }}>
      {loading ? <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div> : children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}