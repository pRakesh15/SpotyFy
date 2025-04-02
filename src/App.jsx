import { useState, useEffect, useRef } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import Sidebar from "./Components/SideBar"
import SongList from "./Components/SongList"
import Player from "./Components/Player"
import SearchBar from "./Components/SearchBar"
import { songsData } from "./Data/Songs.js"
import "./Styles/App.scss"


const App = () => {
  const [songs, setSongs] = useState(songsData)
  const [currentSong, setCurrentSong] = useState(songsData[0]) 
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeTab, setActiveTab] = useState("forYou")
  const [recentlyPlayed, setRecentlyPlayed] = useState([])
  const [favorites, setFavorites] = useState([])
  const [filteredSongs, setFilteredSongs] = useState(songsData)
  const audioRef = useRef(null)
  const [dominantColor, setDominantColor] = useState("rgb(30, 30, 30)")

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    const storedRecentlyPlayed = sessionStorage.getItem("recentlyPlayed")
    if (storedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(storedRecentlyPlayed))
    }
  }, [])

  // Save favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  // Save recently played to sessionStorage when updated
  useEffect(() => {
    sessionStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed))
  }, [recentlyPlayed])

  // Handle song selection
  const handleSongSelect = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)

    // Add to recently played
    const updatedRecentlyPlayed = [song, ...recentlyPlayed.filter((s) => s.id !== song.id)].slice(0, 10)
    setRecentlyPlayed(updatedRecentlyPlayed)
  }

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Play next song
  const playNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    handleSongSelect(songs[nextIndex])
  }

  // Play previous song
  const playPrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    handleSongSelect(songs[prevIndex])
  }

  // Toggle favorite
  const toggleFavorite = (song) => {
    const isFavorite = favorites.some((fav) => fav.id === song.id)

    console.log(favorites);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== song.id))
    } else {
      setFavorites([...favorites, song])
    }
  }

  // Handle search
  const handleSearch = (query) => {
    if (!query) {
      setFilteredSongs(songsData)
      return
    }

    const filtered = songsData.filter((song) => song.title.toLowerCase().includes(query.toLowerCase()))
    setFilteredSongs(filtered)
  }

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab)

    if (tab === "forYou") {
      setFilteredSongs(songsData)
    } else if (tab === "favorites") {
      setFilteredSongs(favorites)
    } else if (tab === "recentlyPlayed") {
      setFilteredSongs(recentlyPlayed)
    }
  }

  // Simulate background color change based on current song
  useEffect(() => {
    // In a real app, you would analyze the image to get the dominant color
    // Here we're just using a predefined color for each song
    const colors = {
      1: "rgb(40, 20, 80)",
      2: "rgb(174,175,15)",
      3: "rgb(20, 60, 100)",
      4: "rgb(42,42,3)",
      5: "rgb(218,218,216)", //34567
      6: "rgb(100, 50, 30)",
      7: "rgb(50, 80, 100)",
      8: "rgb(70, 30, 50)",
    }

    setDominantColor(colors[currentSong.id] || "rgb(30, 30, 30)")
  }, [currentSong])

  return (
    <div
      className="app-container"
      style={{
        background: `linear-gradient(to bottom, ${dominantColor}, rgb(10, 10, 10))`,
      }}
    >
      <Container fluid className="h-100">
        <Row className="h-100">
          {/* Sidebar - hidden on small screens */}
          <Col md={2} className={`sidebar-container p-0 ${showSidebar ? "d-block" : "d-none d-md-block"}`}>
            <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
          </Col>
  
          {/* Main content */}
          <Col md={showSidebar ? 5 : 7} xs={12} className="main-content">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="main-title">
                {activeTab === "forYou" ? "For You" : activeTab === "favorites" ? "Favorites" : "Recently Played"}
              </h1>
              <Button variant="link" className="menu-toggle d-md-none" onClick={() => setShowSidebar(!showSidebar)}>
                {showSidebar ? "Hide Menu" : "Show Menu"}
              </Button>
            </div>
  
            <SearchBar onSearch={handleSearch} />
  
            <SongList
              songs={filteredSongs}
              currentSong={currentSong}
              onSongSelect={handleSongSelect}
              isPlaying={isPlaying}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </Col>
  
          {/* Player - Increased width */}
          <Col md={5} className="player-container p-0">
            <Player
              song={currentSong}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onNext={playNext}
              onPrevious={playPrevious}
              audioRef={audioRef}
              isFavorite={favorites.some((fav) => fav.id === currentSong.id)}
              onToggleFavorite={() => toggleFavorite(currentSong)}
            />
          </Col>
        </Row>
      </Container>
  
      {/* Hidden audio element for playing music */}
      <audio ref={audioRef} src={currentSong.musicUrl} onEnded={playNext} autoPlay={isPlaying} />
    </div>
  );
  
}

export default App

