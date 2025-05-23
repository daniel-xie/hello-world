import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function MeditationTimer() {
  const [duration, setDuration] = useState(10)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const bellRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      setIsPaused(false)
      bellRef.current?.play()
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, isPaused, timeLeft])

  const handleStartPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setTimeLeft(duration * 60);
      setIsRunning(true);
      bellRef.current?.play();
    } else if (isRunning && !isPaused) {
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else if (isPaused) {
      setIsPaused(false);
    } else {
        setHasStarted(false);
    }
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg bg-gray-50/30 text-center space-y-6 relative overflow-hidden h-[300px]">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 inset-0 flex flex-col justify-center"
          >
            <h1 className="text-2xl font-bold">Meditation Timer</h1>
            <div className="space-y-2">
              <p className="text-muted-foreground">Duration: {duration} minutes</p>
              <Slider
                min={1}
                max={120}
                step={1}
                defaultValue={[duration]}
                onValueChange={(val) => setDuration(val[0])}
              />
            </div>
            <Button onClick={handleStartPause}>Start</Button>
          </motion.div>
        ) : (
          <motion.div
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 inset-0 flex flex-col justify-center"
          >
            <h1 className="text-2xl font-bold">Time Remaining</h1>
            <div className="text-5xl font-mono text-primary">{formatTime(timeLeft)}</div>
            <Button onClick={handleStartPause}>
              {isPaused ? "Resume" : isRunning ? "Pause" : "Start Again"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <audio ref={bellRef} src={`${import.meta.env.BASE_URL}sounds/meditate/bell.mp3`} preload="auto" />
    </div>
  )
}
