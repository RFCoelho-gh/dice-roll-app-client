import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import { Stack, Skeleton, Heading } from '@chakra-ui/react'
import './styles/Global.css'

function CharacterDetails() {

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true) //!Flag

    const {id} = useParams();

    const getChar = async () => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/character/${id}`)

            setCharacter(response.data);

            setLoading(false);

            console.log(response.data);
            
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() =>{
        getChar();
    }, []);


  return (
    <div>

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
            
            <div>
                <Heading>{character.firstName} {character.lastName}</Heading>
                <hr />
                <p className='text-bold'>{character.ancestry}</p>
                <p>{character.descriptions.ancestryDescription.split(".")[0]
                    .replaceAll("<p>","").replaceAll("<em>","").replaceAll("<h1>","").replaceAll("</h1>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("</p>","").replaceAll("<hr />","")}.</p>
                <hr />
                <p className='text-bold'>{character.background}</p>
                <p>{character.descriptions.backgroundDescription.split(".")[0]
                    .replaceAll("<p>","").replaceAll("<em>","").replaceAll("<h1>","").replaceAll("</h1>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("</p>","").replaceAll("<hr />","")}.</p>
                <hr />
                <p className='text-bold'>{character.charClass}</p>
                <p>{character.descriptions.classDescription.split(".")[0]
                    .replaceAll("<p>","").replaceAll("<em>","").replaceAll("<h1>","").replaceAll("</h1>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("</p>","").replaceAll("<hr />","")}.</p>
                <hr />
                <p className='text-bold'>Follower of {character.descriptions.deityDescription.split('[')[0]
                    .replaceAll("<p>","").replaceAll("<em>","").replaceAll("<h1>","").replaceAll("</h1>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("</p>","").replaceAll("<hr />","")}</p>
                <p>{character.descriptions.deityDescription.split(">")[3].split(".")[0].replaceAll("<p>","")
                    .replaceAll("<p>","").replaceAll("<em>","").replaceAll("<h1>","").replaceAll("</h1>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("</p>","").replaceAll("<hr />","")}.</p>
                <hr />
                
            </div>

        )}        

    </div>
  )
}

export default CharacterDetails