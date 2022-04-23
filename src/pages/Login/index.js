import { config } from "../../auth/config";
import { GetUserSpotify } from "../../auth/spotifyAPI";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useHistory } from 'react-router-dom'
import { useEffect } from "react";
import React from 'react';
import { Box, Link } from "@chakra-ui/react";

export default function LoginApp() {

 

    const dispatch = useDispatch();
    const history = useHistory();
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
                    history.push('/create-playlist');
                } catch(error) {
                    console.log(error)
                }
            }; 
            getUser();
        }

    }, [])


    const getSpotifyLogin = () => {
        const state = Date.now().toString();
        const CLIENT_ID = config.CLIENT_ID
        return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&state=${state}&response_type=${config.RESPONSE_TYPE}&scope=${config.SCOPES}`
    }

  return (
    <div>
        <Box
            minHeight={'100vh'}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"white"}
            
        >
            <Link href={getSpotifyLogin()}
                textDecoration={"none"}
                color={"white"}
                bgColor={"rgb(25, 192, 55)"}
                p={10}
                width={"150px"}
                fontFamily={"sans-serif"}
                textAlign='center'
                borderRadius={50}
                fontWeight='semibold'
                >
                    
            Login</Link>
        </Box>
    </div>
  )
}
