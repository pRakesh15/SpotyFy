# Music Player Application

## Description
A React-based music player application with SCSS styling and React-Bootstrap components. The application is designed to be interactive, fluid, and responsive, featuring animations and a dynamic background that changes based on the current song's cover image.

## Features
- **Dummy Data**: Uses a JSON object with key-value pairs to load dummy song data. the data  is
- 
  


   export const songsData = [

    {
      id: 1,
      title: "Tum Hi Ho",
      artistName: "Arijit Singh",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b2736404721c1943d5069f0805f3",
      musicUrl: "https://example.com/music/tum-hi-ho.mp3",
      duration: "4:22",
      background: "rgb(40, 20, 80)",
    },
    {
      id: 2,
      title: "Kesariya",
      artistName: "Arijit Singh",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh8sWhXqO8PApS1KtZ0p_3JvzqMWd7HrpJeg&s",
      musicUrl: "https://example.com/music/kesariya.mp3",
      duration: "3:48",
      background: "rgba(84, 90, 30, 0.88)",
    },
    {
      id: 3,
      title: "Shayad",
      artistName: "Arijit Singh",
      thumbnail: "https://i1.sndcdn.com/artworks-qP61TxPBD2zZdZQd-WzvJiQ-t500x500.jpg",
      musicUrl: "https://example.com/music/shayad.mp3",
      duration: "4:10",
      background: "rgb(20, 60, 100)",
    },
    {
      id: 4,
      title: "Channa Mereya",
      artistName: "Arijit Singh",
      thumbnail: "https://i.scdn.co/image/ab67616d0000b273045f73dc8a716c781c5e1812",
      musicUrl: "https://example.com/music/channa-mereya.mp3",
      duration: "4:45",
      background: "rgb(30, 70, 90)",
    },
    {
      id: 5,
      title: "Tera Ban Jaunga",
      artistName: "Akhil Sachdeva, Tulsi Kumar",
      thumbnail: "https://i1.sndcdn.com/artworks-000560550684-k8zk6b-t500x500.jpg",
      musicUrl: "https://example.com/music/tera-ban-jaunga.mp3",
      duration: "3:56",
      background: "rgb(80, 60, 30)",
    },
    {
      id: 6,
      title: "Raataan Lambiyan",
      artistName: "Jubin Nautiyal, Asees Kaur",
      thumbnail: "https://c.saavncdn.com/222/Raataan-Lambiyan-From-Shershaah--Hindi-2021-20210729181107-500x500.jpg",
      musicUrl: "https://example.com/music/raataan-lambiyan.mp3",
      duration: "3:50",
      background: "rgb(100, 50, 30)",
    },
    {
      id: 7,
      title: "Tujh Mein Rab Dikhta Hai",
      artistName: "Roop Kumar Rathod",
      thumbnail: "https://i1.sndcdn.com/artworks-qhvReBPMvNPNNgnk-AeKh5A-t500x500.jpg",
      musicUrl: "https://example.com/music/tujh-mein-rab.mp3",
      duration: "5:10",
      background: "rgb(50, 80, 100)",
    },
    {
      id: 8,
      title: "Ae Dil Hai Mushkil",
      artistName: "Arijit Singh",
      thumbnail: "https://m.media-amazon.com/images/I/7124o8EBsQL._AC_UF1000,1000_QL80_.jpg",
      musicUrl: "https://example.com/music/ae-dil-hai-mushkil.mp3",
      duration: "4:37",
      background: "rgb(70, 30, 50)",
    },
  ];
  

  

- **Responsive Design**: Adapts to different screen sizes, prioritizing the player on smaller screens with a menu button for navigation.
- **Dynamic Background**: The background gradient changes according to the song's cover image.
- **Animations & Transitions**: Includes smooth animations for list loading, background transitions, and other interactions.
- **Persistent Music Playback**: The music continues playing even if the user navigates to another tab.
- **Search Functionality**: Users can search for tracks based on the title.
- **Recently Played Section**: Stores and displays the last 10 played songs using Session Storage.
- **Favorites Feature**: Users can mark songs as favorites using the three-dot menu, and favorites are stored in Local Storage.

## Tech Stack
- **Frontend**: React.js
- **Styling**: SCSS, React-Bootstrap
- **State Management**: React useState & useEffect hooks
- **Storage**: Local Storage, Session Storage

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/music-player.git
   cd music-player
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Project Structure
```
/music-player
│── public
│── src
│   │── components   # UI Components (Player, SongList, Search, etc.)
│   │── assets       # Images, Icons, etc.
│   │── styles       # SCSS files
│   │── utils        # Helper functions, storage handling
│   │── App.js       # Main application file
│   │── index.js     # Entry point
│── package.json
│── README.md
```

## Usage
- **Playing a Song**: Click on a song from the list.
- **Mark as Favorite**: Click on the three dots and select 'Add to Favorites'.
- **View Recently Played**: Switch to the 'Recently Played' tab.
- **Search for a Song**: Use the search bar to find a song by title.

## Future Enhancements
- Add actual music streaming support
- Implement user authentication
- Improve UI with more interactive elements



