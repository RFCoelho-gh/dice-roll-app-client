import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import { Stack, Skeleton } from '@chakra-ui/react'

function CharacterDetails() {

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true) //!Flag


    const {id} = useParams();

    const getChar = async () => {
        try {
            //https://api.pathfinder2.fr/v1/pf2/ancestry?name=Tengu

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/character/${id}`)

            setCharacter(response.data);

            setLoading(false);
            
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() =>{
        getChar();
    }, []);




  return (
    <div>

        <h1>Character Details</h1>

        {loading && (
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        )}

        {!loading && (
            <h2>{character.firstName}{character.lastName}</h2>

        )}        

    </div>
  )
}

export default CharacterDetails