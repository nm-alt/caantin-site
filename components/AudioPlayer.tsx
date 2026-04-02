'use client'

import { useState, useRef, useEffect } from 'react'

// Fixed waveform shape — seeded so it looks like a real call recording
const BARS = [
  0.28, 0.45, 0.72, 0.55, 0.38, 0.85, 0.62, 0.48, 0.58, 0.76,
  0.42, 0.31, 0.67, 0.88, 0.53, 0.61, 0.44, 0.79, 0.70, 0.52,
  0.91, 0.64, 0.40, 0.49, 0.73, 0.82, 0.59, 0.43, 0.94, 0.68,
  0.51, 0.63, 0.33, 0.77, 0.71, 0.54, 0.46, 0.87, 0.65, 0.78,
  0.50, 0.69, 0.41, 0.60, 0.92, 0.55, 0.74, 0.83, 0.62, 0.39,
  0.47, 0.86, 0.73, 0.61, 0.80, 0.42, 0.35, 0.70, 0.53, 0.76,
]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(134)
  const [available, setAvailable] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      setCurrentTime(audio.currentTime)
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onDuration = () => { if (!isNaN(audio.duration)) setDuration(audio.duration) }
    const onEnded = () => setPlaying(false)
    const onError = () => setAvailable(false)

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('durationchange', onDuration)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('durationchange', onDuration)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || !available) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setAvailable(false))
    }
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !available || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  return (
    <div className="border border-white/15 rounded-lg p-5 md:p-6">
      <audio ref={audioRef} src="/call-sample.mp3" preload="metadata" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <p className="type-label text-white/40 text-[10px] tracking-[0.16em]">
          LIVE CALL RECORDING
        </p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
          <span className="type-label text-white/30 text-[10px] tracking-[0.12em]">
            {available ? 'SWAHILI · KENYA · 2:14' : 'TRANSCRIPT ONLY'}
          </span>
        </div>
      </div>

      {/* Waveform */}
      <div
        className="flex items-end gap-[2px] h-10 mb-4 cursor-pointer group"
        onClick={seek}
        role="slider"
        aria-label="Call playback position"
        aria-valuenow={Math.round(progress * 100)}
      >
        {BARS.map((h, i) => {
          const past = i / BARS.length < progress
          return (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors duration-75 ${
                past ? 'bg-white/75' : 'bg-white/18'
              }`}
              style={{ height: `${h * 100}%` }}
            />
          )
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={toggle}
          disabled={!available}
          aria-label={playing ? 'Pause' : 'Play call recording'}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white/70 hover:bg-white/8 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed"
        >
          {playing ? (
            <svg width="8" height="10" viewBox="0 0 8 10" fill="white">
              <rect x="0" y="0" width="3" height="10" rx="0.5" />
              <rect x="5" y="0" width="3" height="10" rx="0.5" />
            </svg>
          ) : (
            <svg width="9" height="10" viewBox="0 0 9 10" fill="white" style={{ marginLeft: '1px' }}>
              <path d="M0 0L9 5L0 10V0Z" />
            </svg>
          )}
        </button>
        <span className="type-mono text-white/35 text-xs tabular-nums">
          {fmt(currentTime)} / {fmt(duration)}
        </span>
        {!available && (
          <span className="type-label text-white/20 text-[10px] tracking-widest ml-auto">
            ADD /call-sample.mp3 TO ENABLE
          </span>
        )}
      </div>

      {/* Outcome */}
      <div className="border-t border-white/10 pt-4">
        <p className="type-mono text-white/40 text-[11px] tracking-[0.08em]">
          OUTCOME — Promise to pay · ₦15,000 on 5 April
        </p>
      </div>
    </div>
  )
}
