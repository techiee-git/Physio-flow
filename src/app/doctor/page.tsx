'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut, User } from '@/lib/auth'
import DoctorDashboard from '@/app/components/DoctorDashboard'

export default function DoctorPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const currentUser = await getCurrentUser()
        if (!currentUser || currentUser.role !== 'doctor') {
            router.push('/login')
            return
        }
        setUser(currentUser)
        setLoading(false)
    }

    const handleLogout = async () => {
        await signOut()
        router.push('/login')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400">Loading Doctor Portal...</p>
                </div>
            </div>
        )
    }

    return <DoctorDashboard user={user} onLogout={handleLogout} />
}
