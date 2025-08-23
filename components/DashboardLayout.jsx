'use client'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
const DashboardLayout = ({ children }) => {
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        const token = localStorage.getItem("auth_token")
        if (pathname === "/login" || pathname === "/register" || pathname === "/") {
            return
        }
        if (!token) {
            router.push("/login")
        }
    }, [router, pathname])
    return (
        <>
            {children}
        </>
    )
}
export default DashboardLayout
