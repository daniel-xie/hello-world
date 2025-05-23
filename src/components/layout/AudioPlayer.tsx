import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect, type ChangeEvent } from "react";

interface AudioPlayerProps {
  title: string;
  artist: string;
  src: string;
  albumArt: string;
}

const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
};

export default function AudioPlayer({
  title,
  artist,
  src,
  albumArt,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    setVolume(value);
    audio.volume = value;
    audio.muted = value === 0;
    setIsMuted(value === 0);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  return (
    <Card className="w-full max-w-md border border-transparent rounded-none shadow-sm bg-gray-50/30">
      <CardContent className="p-4 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={albumArt}
            alt={`${title} album art`}
            className="w-24 h-24 object-cover border border-gray-200"
          />
          <div className="flex-1">
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground">{artist}</div>
            <div className="mt-2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none hover:bg-gray-50/30"
                onClick={togglePlayback}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              <div className="flex gap-[2px] ml-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-blue-500 transition-all duration-300 ease-in-out ${
                      isPlaying ? "h-4 animate-bounce" : "h-2"
                    }`}
                    style={isPlaying ? { animationDelay: `${i * 0.1}s` } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-none overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time + Volume Row */}
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <div>
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0 rounded-none hover:bg-gray-50/30"
              onClick={toggleMute}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 accent-blue-500"
            />
          </div>
        </div>

        <audio ref={audioRef} src={src} preload="auto" />
      </CardContent>
    </Card>
  );
}
