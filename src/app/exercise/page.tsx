'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut, User } from '@/lib/auth'

export default function ExercisePage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [exerciseStarted, setExerciseStarted] = useState(false)
    const [exerciseLoading, setExerciseLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const currentUser = await getCurrentUser()
        if (!currentUser || currentUser.role !== 'patient') {
            router.push('/login')
            return
        }
        setUser(currentUser)
        setLoading(false)
    }

    const handleBack = () => {
        router.push('/patient')
    }

    const handleLogout = async () => {
        await signOut()
        router.push('/login')
    }

    const startExercise = async () => {
        setExerciseLoading(true)
        setError('')

        try {
            // Request camera access
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 1280, height: 720 },
                audio: false
            })

            setExerciseStarted(true)
            setExerciseLoading(false)

            // Create exercise UI
            const container = document.getElementById('exercise-container')
            if (container) {
                container.innerHTML = `
                    <div style="position: fixed; inset: 0; background: #0a1628; display: flex; flex-direction: column;">
                        <div style="position: relative; flex: 1;">
                            <video id="exerciseVideo" autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
                            <canvas id="exerciseCanvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform: scaleX(-1);"></canvas>
                            
                            <div style="position: absolute; top: 24px; right: 24px; background: rgba(94,243,140,0.2); backdrop-filter: blur(20px); border: 2px solid rgba(94,243,140,0.3); border-radius: 20px; padding: 16px 24px; text-align: center;">
                                <div style="font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; color: #5EF38C;">REPS</div>
                                <div id="repValue" style="font-size: 2.8rem; font-weight: 700; color: white;">0</div>
                            </div>
                            
                            <div style="position: absolute; top: 24px; left: 24px; background: rgba(15,30,50,0.95); padding: 10px 16px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 10px;">
                                <span style="width: 10px; height: 10px; background: #5EF38C; border-radius: 50%; box-shadow: 0 0 12px #5EF38C;"></span>
                                <span style="color: rgba(255,255,255,0.7); font-size: 0.85rem;">Camera Active</span>
                            </div>
                            
                            <div id="feedback" style="position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%); background: rgba(15,30,50,0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 50px; padding: 14px 24px; color: white; font-size: 1rem;">
                                Position yourself in the frame and start exercising!
                            </div>
                        </div>
                        
                        <div style="position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px;">
                            <button id="stopBtn" style="display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(242,95,92,0.2); border: 1px solid rgba(242,95,92,0.4); border-radius: 30px; color: #F25F5C; font-size: 0.9rem; font-weight: 600; cursor: pointer;">
                                ⬛ Stop Exercise
                            </button>
                        </div>
                    </div>
                `

                const video = document.getElementById('exerciseVideo') as HTMLVideoElement
                const stopBtn = document.getElementById('stopBtn') as HTMLButtonElement

                video.srcObject = stream
                await video.play()

                stopBtn.onclick = () => {
                    stream.getTracks().forEach(t => t.stop())
                    setExerciseStarted(false)
                    if (container) container.innerHTML = ''
                }
            }
        } catch (err: any) {
            console.error('Failed to start exercise:', err)
            setError(err.message || 'Failed to access camera. Please allow camera permissions.')
            setExerciseLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin"></span>
                    Loading...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Exercise Container */}
            <div id="exercise-container" className={exerciseStarted ? "fixed inset-0 z-40" : "hidden"}></div>

            {/* Start Screen */}
            {!exerciseStarted && (
                <>
                    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-white/10 rounded-full text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                            Back
                        </button>

                        <div className="flex items-center gap-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                PhysioFlow Exercise
                            </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-white/20 rounded-full text-slate-300 hover:bg-red-500/10 hover:border-red-500 hover:text-red-400 transition-all"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="pt-24 px-6 pb-6 min-h-screen flex flex-col items-center justify-center">
                        <div className="text-center max-w-lg">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-3xl mb-8">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>

                            <h1 className="text-4xl font-bold mb-4">Exercise Session</h1>
                            <p className="text-slate-400 text-lg mb-8">
                                Welcome, {user?.name}! Click the button below to start your physiotherapy session.
                            </p>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={startExercise}
                                disabled={exerciseLoading}
                                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-400 rounded-xl text-slate-900 text-lg font-bold flex items-center justify-center gap-3 mx-auto hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {exerciseLoading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin"></span>
                                        Starting Camera...
                                    </>
                                ) : (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polygon points="5,3 19,12 5,21"></polygon>
                                        </svg>
                                        Start Exercise
                                    </>
                                )}
                            </button>

                            <div className="mt-8 p-6 bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl text-left">
                                <h3 className="font-semibold text-cyan-400 mb-3">What to expect:</h3>
                                <ul className="text-slate-300 text-sm space-y-2">
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                                        Camera access for exercise monitoring
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                                        Follow along with your assigned exercises
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                                        Track your progress and repetitions
                                    </li>
                                </ul>
                            </div>

                            <p className="mt-6 text-slate-500 text-sm">
                                💡 AI pose detection coming soon!
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
