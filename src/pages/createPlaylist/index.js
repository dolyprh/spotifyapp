import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/index.tsx";
import Playlist from "../../components/Playlist";
import PlaylistItem from "../../components/createPlaylist/index.js";
import { login } from '../../redux/authSlice';
import { GetUserSpotify } from "../../auth/spotifyAPI";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebar";
import './style.css';
import { Flex, Spacer, Box, Heading, Button } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function CreatePlaylist() {
  const [tracks, setTracks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedTrackURI, setSelectedTrackURI] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get('#access_token');

        if(accessToken !== null) {
            
            const getUser = async () => {
                try{
                    const response = await GetUserSpotify(accessToken);
                    dispatch(login({
                        accessToken: accessToken,
                        user: response
                    }));
                } catch(error) {
                    console.log(error)
                }
            }; 
            getUser();
        }

    }, [])

    const filterSelectedTrack = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri))
    }

    useEffect(() => {
        if(!isSearch) {
            const selectedTracks = filterSelectedTrack();
            setTracks(selectedTracks);
        }
    }, [])
    
    const handleSearch = (searchTracks) => {
        setIsSearch(true);
        
        const selectedSearchTracks = searchTracks.filter(
            (track) => selectedTrackURI.includes(track.uri)
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };
    

    const toggleSelect = (track) => {
        const uri = track.uri;
        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
            setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

  return (
     <>
     <div>
          <Flex bg={'rgb(45, 45, 45)'}>
              <Box>
                  <Heading fontSize={26}>Spotify Apps</Heading>
              </Box>
              <Spacer />
              <Box >
              <Button h='2.25rem' w={'5rem'} size='sm'
                      variant="contained"   
                      type="submit"
                      border={"none"}
                      borderRadius={10}
                      color="#fff"
                      fontWeight={"bold"}
                      bg="red"
                      m={10}
                      cursor={'pointer'}
                    >Logout</Button>
              </Box>
          </Flex>
      </div>
      <div className="container">
              <div className="sidebar-pages">
                  <Router>
                      <div className='content'>
                          <Sidebar />
                          <Switch>
                              <Route path="/trending" component={SearchBar} />
                              <Route path="/search" component={PlaylistItem} />
                          </Switch>
                      </div>
                  </Router>
              </div>

              <div className="content-pages">
                  <div className="content-spotify">
                      <SearchBar onSuccess={(tracks) => handleSearch(tracks)} />
                      <PlaylistItem uris={selectedTrackURI} />
                  </div>

                  {tracks.length === 0 && <p>No tracks</p>}

                  <div className="track-list">
                      {tracks.map((track) => (
                          <Playlist
                              key={track.id}
                              url={track.album.images[2].url}
                              title={track.name}
                              artist={track.artists[0].name}
                              album={track.album.name}
                              duration_ms={track.duration_ms}
                              toggleSelect={() => toggleSelect(track)} />
                      ))}
                  </div>
              </div>
          </div></>
  )
}

export default CreatePlaylist;