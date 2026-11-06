import { useEffect, useState } from 'react'

function secondsUntilMidnight() {
  const now = new Date()
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)
  return Math.max(0, Math.floor((midnight - now) / 1000))
}

// Feature: seconds left today, ticking once per second.
// Returns "HH:MM:SS" until today's specials end at midnight.
export function useCountdown() {
  const [seconds, setSeconds] = useState(secondsUntilMidnight)

  useEffect(() => {
    const id = setInterval(() => setSeconds(secondsUntilMidnight()), 1000)
    return () => clearInterval(id) // cleanup so the timer never leaks
  }, [])

  const pad = (n) => String(n).padStart(2, '0')
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}
