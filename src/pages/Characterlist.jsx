import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Flex, Avatar, Box, Text, Badge} from '@chakra-ui/react';

function Characterlist() {

    const [characters, setCharacters] = useState([]);

    const getCharacters = async () => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/characterlist/global`);

            console.log(response);

            setCharacters(response.data);
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCharacters();
    }, []);

  return (
    <div>
        <h1>List of Characters</h1>


        {characters.map((character) => {
            return (
                <Flex>
                    <Avatar src='a'/>
                    <Box ml='3'>
                        <Text align='start' fontWeight='bold'>
                            {character.firstName} <Badge ml="1" colorScheme="yellow">{character.charClass}</Badge>
                        </Text>
                        <Text align='start'>
                            <Link to={`/characterlist/${character._id}`}>See more</Link>
                        </Text>
                    </Box>
                </Flex>
                
              );
            })}

    </div>
  )
}

export default Characterlist

/* return (
    <div>
        <h1>List of Characters</h1>

        {characters.map((character) => {
            return (
                <div key={character._id}>
                  <Link to={`/characterlist/${character._id}`}>
                    <h3>{character.firstName}</h3>
                  </Link>
                </div>
              );
            })}
    </div>
  ) */