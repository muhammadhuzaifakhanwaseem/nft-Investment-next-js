"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { deleteCookie, getCookie } from "cookies-next"
import { useRouter } from "next/navigation"

const UserContext = createContext()

export function UserProvider({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const token = getCookie("auth_token")
  const fetchUser = async () => {
    try {
      if (!token) {
        setUser(null)
        return
      }
      const res = await fetch("https://stocktitan.site/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (res.ok) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = async () => {
    deleteCookie("auth_token")
    deleteCookie("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading, fetchUser, token }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
