import { SearchContext } from "../Context/SearchContext"
import { useContext } from "react"

function SearchBar() {
    const { term, handleSearch } = useContext(SearchContext)

    return (
        <form>
            <input type="text" placeholder="Enter a search term here" ref={term} />
            <input type="submit"  onClick={e => handleSearch(e, term.current.value)} />
        </form>
    )
}

export default SearchBar