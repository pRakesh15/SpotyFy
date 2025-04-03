import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Heart as HeartFill, ChevronDown } from "lucide-react";
import "../Styles/Player.scss";

const Player = ({ song, isPlaying, onTogglePlay, onNext, onPrevious, audioRef, isFavorite, onToggleFavorite }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 786);

  // Update responsive state on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 786);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update progress bar
  useEffect(() => {
    if (audioRef.current) {
      const updateProgress = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration) {
          setProgress((current / duration) * 100);
          setCurrentTime(current);
          setDuration(duration);
        }
      };
      audioRef.current.addEventListener("timeupdate", updateProgress);
      return () => audioRef.current?.removeEventListener("timeupdate", updateProgress);
    }
  }, [audioRef]);

  // Play/pause when isPlaying changes
  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play().catch(console.error) : audioRef.current.pause();
    }
  }, [isPlaying, song, audioRef]);

  // Format time (seconds to MM:SS)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={`player ${isMobile ? "mobile-player" : ""} ${isExpanded ? "expanded" : ""}`}>
      {isMobile && !isExpanded ? (
        // Mobile Bottom Bar View
        <div className="player-bar" onClick={() => setIsExpanded(true)}>
          <img src={song.thumbnail || "/placeholder.svg"} alt={song.title} className="player-bar-thumbnail" />
          <div className="player-bar-info">
            <h3 className="player-bar-title">{song.title}</h3>
          </div>
          <button className="control-button" onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
            {isFavorite ? <HeartFill className="icon favorite" /> : <Heart className="icon" />}
          </button>
          <button className="control-button" onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}>
            {isPlaying ? <Pause className="icon" /> : <Play className="icon" />}
          </button>
          <button className="control-button">
            <Volume2 className="icon" />
          </button>
        </div>
      ) : (
        // Full Player View
        <>
        {isMobile && (
          <button className="back-button" onClick={() => setIsExpanded(false)}>
            <ChevronDown size={24} />
          </button>
        )}
          <div className="song-info">
            <h2 className="song-title">{song.title}</h2>
            <p className="song-artist">{song.artistName}</p>
          </div>

          <div className="album-cover">
            <img src={song.thumbnail || "/placeholder.svg"} alt={song.title} className="cover-image" />
          </div>

          <div className="progress-container">
            <div className="song-progress">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="controls">
            <button className="control-button" onClick={onToggleFavorite}>
              {isFavorite ? <HeartFill className="icon favorite" /> : <Heart className="icon" />}
            </button>

            <div className="main-controls">
              <button className="control-button" onClick={onPrevious}><SkipBack className="icon" /></button>
              <button className="play-button" onClick={onTogglePlay}>
                {isPlaying ? <Pause className="icon" /> : <Play className="icon" />}
              </button>
              <button className="control-button" onClick={onNext}><SkipForward className="icon" /></button>
            </div>

            <button className="control-button"><Volume2 className="icon" /></button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
