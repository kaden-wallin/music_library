import { useEffect, useState, useRef, Fragment, Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './Components/Gallery';
import SearchBar from './Components/SearchBar';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Context/DataContext';
import { SearchContext } from './Context/SearchContext';
import { createResource as fetchData } from './helper';
import Spinner from './Spinner';

function App() {
  const [data, setData] = useState(null)
  const [message, setMessage] = useState("Search for Music!")
  const searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (searchInput) {
        setData(fetchData(searchInput))
    }
  }, [searchInput])


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

  const renderGallery = () => {
    if(data){
        return (
          <Suspense fallback={<Spinner />}>
            <Gallery data={data}/>
          </Suspense>
        )
    }
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
              {renderGallery()}
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
