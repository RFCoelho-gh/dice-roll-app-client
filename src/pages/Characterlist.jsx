import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Flex, Avatar, Box, Text, Badge, Spinner, IconButton, Heading} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import {classImgAssigner} from '../utilities/utility';

function Characterlist() {

    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCharacters = async () => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/characterlist/global`);

            setCharacters(response.data);

            setLoading(false);
            
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCharacters();
    }, []);

  return (
    <div>

        {loading && (
            <Spinner
            className='spinner'
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        )}

        {!loading && (
            <>
                <Heading>List of Characters</Heading>

                {characters.map((character) => {
                    return (
                        <>
                        <hr />
                        <Flex className='paddingTopBot'>
                            <Avatar src={classImgAssigner(character.charClass)}/>
                            <Box ml='3'>
                            <Flex>
                                <Text align='start' fontWeight='bold'>
                                    {character.firstName} <Badge ml="1" colorScheme="yellow">{character.charClass}</Badge>
                                </Text>
                                <Link to={`/characterlist/${character._id}`}>
                                    <IconButton align='start' colorScheme='gray' aria-label='see character details' size='xs' icon={<SearchIcon />} isRound='true' variant='outline'>
                                    </IconButton>
                                </Link>
                            </Flex>
                        <Text as="i" align='start'>
                            {character.ancestry}, {character.background}
                        </Text>
                    </Box>
                </Flex>
                <hr />
                </>
              );
            })}
            </>
        )}

    </div>
  )
}

export default Characterlist