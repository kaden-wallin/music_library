import { useState } from "react"

function GalleryItem() {
    const [viewDetails, setViewDetails] = useState(false)
    const simpleView = () => {
        return (
            <div>
                <h3>{props.item.trackName}</h3>
                <h4>{props.item.collectionName}</h4>
            </div>
        )
    }

    const detailsView = () => {
        return (
            <div>
                <h2>{props.item.trackName}</h2>
                <h3>{props.item.collectionName}</h3>
                <h4>{props.item.primaryGenreName}</h4>
                <h4>{props.item.releaseDate}</h4>
            </div>
        )
    }

    return (
        <div onClick={() => setViewDetails(!viewDetails)} style={{
        display: 'inline-block' }}>
            <p>Gallery Item</p>
        </div>
    )
}

export default GalleryItem