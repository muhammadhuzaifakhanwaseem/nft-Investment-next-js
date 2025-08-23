"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const UserContext = createContext()

export function UserProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  }

  const fetchUser = async () => {
    try {
      const token = getToken()
      if (!token) {
        setLoading(false)
        return
      }

      const res = await fetch("https://stocktitan.site/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (res.ok && data.user) {
        setUser(data.user)
      } else {
        setUser(null)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user")
      }
    } catch (err) {
      console.error("Fetch user failed:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  const token = getToken();

  return (
    <UserContext.Provider value={{ token, user, setUser, logout, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
