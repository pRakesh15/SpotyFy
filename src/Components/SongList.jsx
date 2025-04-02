
const SongList = ({
  songs,
  currentSong,
  onSongSelect,
  isPlaying,
}) => {
    return (
        <div className="song-list-container">
          <ul className="song-list">
            {songs.length === 0 ? (
              <div className="no-songs">No songs found</div>
            ) : (
              songs.map((song, index) => (
                <li
                  key={song.id}
                  className={`song-item ${currentSong.id === song.id ? "active" : ""}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => onSongSelect(song)}
                >
                  <div className="song-info">
                    <div className="song-thumbnail">
                      <img
                        src={song.thumbnail || "/placeholder.svg?height=40&width=40"}
                        alt={song.title}
                      />
                      {currentSong.id === song.id && isPlaying && (
                        <div className="playing-indicator">
                          <div className="bar"></div>
                          <div className="bar"></div>
                          <div className="bar"></div>
                        </div>
                      )}
                    </div>
                    <div className="song-details">
                      <p className="song-title">{song.title}</p>
                      <p className="song-artist">{song.artistName}</p>
                    </div>

                  </div>
                  <div className="song-duration">{song.duration}</div>
                </li>
              ))
            )}
          </ul>
          <div>
        
          </div>
        </div>
      );
      
};

export default SongList;
