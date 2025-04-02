import { useState } from "react"
import '../Styles/SearchBar.scss' // Import the SCSS file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="search-container">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={query}
          onChange={handleChange}
          className="search-input"
        />
      </div>
    </div>
  )
}

export default SearchBar
