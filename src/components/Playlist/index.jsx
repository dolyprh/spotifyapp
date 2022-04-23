import { useState } from 'react';
import './style.css'


function Playlist({url, title, artist, toggleSelect, album, duration_ms}) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };

    function msToMinutesAndSeconds(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
    return (
        <div className='container'>
            <div className='card-playlist'>
                <div className='playlist-item-img'>
                    <img src={url} alt={title} />
                </div>
                <div className='playlist-item-decs'>
                    <span>{title}</span>
                    <p>{artist}</p>
                    <p>{album}</p>
                    <p>{msToMinutesAndSeconds(duration_ms)}</p>
                    <button className="btn-select" onClick={handleSelect}>
                        {isSelected ? "Deselect" : "Select"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Playlist;
