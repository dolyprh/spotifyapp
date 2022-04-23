import React, { useState } from 'react'
import { searchTrack } from '../../auth/spotifyAPI'
import { useSelector } from 'react-redux'
import { TRootState } from '../../redux/store'
import { Input, InputGroup, Button} from '@chakra-ui/react'

interface Props {
  onSuccess:  (tracks: any[]) => void;
}

  const SearchBar: React.FC<Props> = ({ onSuccess }) => {
    const [search, setSearch] = useState<string>('');
    const accessToken:string =  useSelector((state: TRootState ) => state.auth.accessToken, );


  const handleInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setSearch(target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        const response = await searchTrack(search, accessToken);
        const tracks = response.tracks.items;
        onSuccess(tracks);
    } catch(error) {
        alert(error)
    }
  }
  return (
    <div>
        <form data-testid="SearchBar" className='form-Input-Search' onSubmit={ handleSubmit }>  
            <div className='container-searchBar'>
              <h3>Search Playlist</h3>
              <InputGroup size={'md'}>
                <Input
                      onChange={handleInput}
                      type="text"
                      name="query"
                      variant='filled' 
                      borderRadius={10}
                      padding={10}
                      w="70%"
                      outline={"none"}
                      focusBorderColor='lime'
                />
                    <Button h='2.25rem' w={'5rem'} size='sm'
                      variant="contained"   
                      type="submit"
                      border={"none"}
                      borderRadius={10}
                      color="#fff"
                      fontWeight={"bold"}
                      bg="rgb(78, 245, 56)"
                      cursor={'pointer'}
                    >Search</Button>
               </InputGroup>
            </div>
        </form>
    </div>
  )
}

export default SearchBar;