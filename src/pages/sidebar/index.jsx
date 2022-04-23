import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Sidebar = () => {
    return(
        <div className='sidebar'>
            <ul>
                <li>
                    <Link to="/#search" className='link' 
                        color="primary"
                        underline="none"
                    >Seacrh Playlist</Link>
                </li>
                <li>
                    <Link to="/#create-play" className='link'
                        color="primary"
                        underline="none"
                    >Create Playlist</Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;