import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Heart as HeartFill } from "lucide-react";
import "../Styles/Player.scss";

const Player = ({ song, isPlaying, onTogglePlay, onNext, onPrevious, audioRef, isFavorite, onToggleFavorite }) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Toggle mobile player expansion
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  // Responsive logic
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className={`player ${isMobile ? (isExpanded ? "expanded" : "collapsed") : ""}`}>
      {isMobile && !isExpanded && (
        <div className="player-preview" onClick={toggleExpand}>
          <img src={song.thumbnail || "/placeholder.svg?height=50&width=50"} alt={song.title} className="preview-thumbnail" />
          <div className="preview-info">
            <h3 className="preview-title">{song.title}</h3>
            <p className="preview-artist">{song.artistName}</p>
          </div>
          <button className="play-button-small" onClick={(e) => { e.stopPropagation(); onTogglePlay(); }}>
            {isPlaying ? <Pause className="icon" /> : <Play className="icon" />}
          </button>
        </div>
      )}
      
      {(!isMobile || isExpanded) && (
        <>
          {isMobile && <button className="back-button" onClick={toggleExpand}>Back</button>}

          <div className="song-info">
            <h2 className="song-title">{song.title}</h2>
            <p className="song-artist">{song.artistName}</p>
          </div>

          <div className="album-cover">
            <img src={song.thumbnail || "/placeholder.svg?height=300&width=300"} alt={song.title} className="cover-image" />
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
