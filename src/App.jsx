import { useEffect, useState, useRef, Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Context/DataContext';
import { SearchContext } from './Context/SearchContext'

function App() {
  const [data, setData] = useState([])
  const [message, setMessage] = useState("Search for Music!")
  const searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) => {
    e.preventDefault()
      const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
          setData(resData.results)
          setMessage('')
        } else {
          setMessage('Artist not found!')
        }
      }
      fetchData()
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>
              <SearchContext.Provider value={{
              term: searchInput,
              handleSearch: handleSearch
              }}>
              <SearchBar handleSearch={handleSearch} />
              </SearchContext.Provider>
              <DataContext.Provider value={data} >
              <Gallery />
              </DataContext.Provider>
            </Fragment>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
