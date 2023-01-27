import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import { Stack, Skeleton, Heading, Flex, Avatar, Badge, IconButton } from '@chakra-ui/react';
import {ViewOffIcon, EditIcon} from '@chakra-ui/icons';
import './styles/Global.css'
import { classImgAssigner } from '../utilities/utility';
import {Link} from 'react-router-dom';

function CharacterDetails() {

    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true) //Flag

    const {id} = useParams();

    const getChar = async () => {
        try {

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
            
            <div className='paddingToChild'>
                <Flex>
                    <Avatar src={classImgAssigner(character.charClass)} />
                    <Heading className='paddingSides'>{character.firstName} {character.lastName}</Heading>
                    <Link to={`/characterlist/global`}>
                        <IconButton className='paddingLeft' align='start' colorScheme='gray' aria-label='see character details' size='sm' icon={<ViewOffIcon />} isRound='true' variant='outline'>
                        </IconButton>
                    </Link>
                </Flex>
                <br />
                <Stack direction='row'>
                    <Badge variant='solid' colorScheme='teal'>
                    {character.ancestry}
                    </Badge>
                    <Badge variant='solid' colorScheme='teal'>
                    {character.background}
                    </Badge>
                    <Badge variant='solid' colorScheme='teal'>
                    {character.charClass}
                    </Badge>
                </Stack>
                <Stack direction='row'>
                    <Badge variant='outline' colorScheme='teal'>
                    Level {character.level}
                    </Badge>
                    <Badge variant='outline' colorScheme='teal'>
                    Follower of {character.deity}
                    </Badge>
                </Stack>
                <Stack direction='row'>
                    <Badge variant='outline' colorScheme={character.attributes.strength >= 12 ? 'blue' : 'red'}>
                    STR {character.attributes.strength}
                    </Badge>
                    <Badge variant='outline' colorScheme={character.attributes.dexterity >= 12 ? 'blue' : 'red'}>
                    DEX {character.attributes.dexterity}
                    </Badge>
                    <Badge variant='outline' colorScheme={character.attributes.constitution >= 12 ? 'blue' : 'red'}>
                    CON {character.attributes.constitution}
                    </Badge>
                    <Badge variant='outline' colorScheme={character.attributes.intelligence >= 12 ? 'blue' : 'red'}>
                    INT {character.attributes.intelligence}
                    </Badge>
                    <Badge variant='outline' colorScheme={character.attributes.wisdom >= 12 ? 'blue' : 'red'}>
                    WIS {character.attributes.wisdom}
                    </Badge>
                    <Badge variant='outline' colorScheme={character.attributes.charisma >= 12 ? 'blue' : 'red'}>
                    CHA {character.attributes.charisma}
                    </Badge>
                </Stack>
                <br />
                <hr />
                <p className='text-bold'>{character.ancestry}</p>
                <div
                dangerouslySetInnerHTML={{__html: character.descriptions.ancestryDescription.slice(0,200).replaceAll("<em>","").replaceAll("<hr />","")+" (...)"}}
                />
                <hr />
                <p className='text-bold'>{character.background}</p>
                <div
                dangerouslySetInnerHTML={{__html: character.descriptions.backgroundDescription.slice(0,200).replaceAll("<em>","").replaceAll("<hr />","")+" (...)"}}
                />
                <hr />
                <p className='text-bold'>{character.charClass}</p>
                <div
                dangerouslySetInnerHTML={{__html: character.descriptions.classDescription.slice(0,200).replaceAll("<em>","").replaceAll("<hr />","")+" (...)"}}
                />
                <hr />
                <p className='text-bold'>Follower of {character.deity}</p>
                <div
                dangerouslySetInnerHTML={{__html: character.descriptions.deityDescription.slice(0,200).replaceAll("<em>","").replaceAll("<hr />","")+" (...)"}}
                />
                <hr />

                <div>
                    <Link to={`/character/edit/${id}`}>
                        <IconButton className='paddingLeft' align='start' colorScheme='teal' aria-label='see character details' size='lg' icon={<EditIcon />} isRound='true' variant='solid'>
                        </IconButton>
                    </Link>
                </div>
            </div>

        )}        

    </div>
  )
}

export default CharacterDetails