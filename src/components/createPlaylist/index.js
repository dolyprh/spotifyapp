import { useSelector } from "react-redux";
import { useState } from "react";
import { CreatePlaylist, addTrackToPlaylist } from "../../auth/spotifyAPI";
import React from 'react'
import {
  FormControl,
  FormLabel,
  Input, Textarea, Button
} from '@chakra-ui/react'

function PlaylistItem({ uris }) {
    
  const accessToken = useSelector((state) => state.auth.accessToken)
  const userId = useSelector((state) => state.auth.user.id)

  const [playlist, setPlaylist] = useState({
      title: "",
      description: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.info(name, value);
    setPlaylist({...playlist, [name]: value}) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const requestPlaylist = await CreatePlaylist(accessToken, userId, {
            name: playlist.title,
            description: playlist.description,
        });

        await addTrackToPlaylist( accessToken, requestPlaylist.id, uris);

        setPlaylist({
          title: "",
          description: "",
        });

        alert("create playlist berhasil")

            
    }catch(error) {
      alert(error)
    }
  };

  return (
      <form onSubmit={handleSubmit}>
        <FormControl isRequired size="sm" display={"grid"} mt={20}>
        <FormLabel htmlFor='first-name' fontWeight={"bold"} mb={20}>Create Playlist</FormLabel>

          <Input
            width={200}
            id='title' 
            aria-label="empty textarea"
            type={'text'}
            name='title'
            value={playlist.title}
            onChange={handleChange}
            fontFamily={"sans-serif"}
            borderRadius={10}
            padding={10}
            w="70%"
            outline={"none"}
            focusBorderColor='lime'
            />
          <Textarea
            id='desc' 
            width={200}
            name="description"
            value={playlist.description}
            mt={10}
            onChange={handleChange}
            fontFamily={"sans-serif"}
            borderRadius={10}
            padding={10}
            w="70%"
            outline={"none"}
            focusBorderColor='lime'
          />   
        </FormControl>
        <Button h='2.25rem' size='sm'
          variant="contained"   
          type="submit"
          border={"none"}
          borderRadius={10}
          p='10'
          color={'#fff'}
          fontFamily='sans-serif'
          fontWeight={'bold'}
          bg="rgb(78, 245, 56)"
          mt='20'
          cursor={'pointer'}
        >Create Playlist</Button>
      </form>

    // <div className="container-create">

    //     {/* <h3>Create Playlist</h3>
    //     <form className="form-input-playlist" onSubmit={handleSubmit}>
    //       <input
    //         aria-label="empty textarea"
    //         placeholder="Input"
    //         maxRow={4}
    //         type="text"
    //         name="title"
    //         id="title"
    //         value={playlist.title}
    //         onChange={handleChange}
    //         required
    //       />

    //       <textarea
    //         aria-label="empty textarea"
    //         placeholder="Description"
    //         maxRow={4}
    //         name="description"
    //         id="desc"
    //         value={playlist.description}
    //         onChange={handleChange}
    //         required
    //         rows={4}
    //       />

    //       <button className="btn-submit" type="submit">Submit</button>
    //     </form> */}
    // </div>
  )
}

export default PlaylistItem
