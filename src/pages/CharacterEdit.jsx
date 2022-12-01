import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper,
    NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage, FormHelperText,
    RadioGroup, HStack, Radio, Button as ChakraButton, ButtonGroup, Flex, Avatar,
    Box, Text, Badge, extendTheme, IconButton, Stack
} from '@chakra-ui/react'
import {DeleteIcon, ViewOffIcon, EditIcon} from '@chakra-ui/icons';
import {Link} from 'react-router-dom';

function CharacterEdit() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [level, setLevel] = useState(NaN);

    const {id} = useParams();
    const charId = id;
    const navigate = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleLevel = (e) => setLevel(e.target.value);

    const getChar = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/character/${charId}`);

            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setGender(response.data.gender);
            setLevel(response.data.level);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getChar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/character/${charId}`, {
                firstName,
                lastName,
                gender,
                level
            });

            setFirstName('');
            setLastName('');
            setGender('');
            setLevel('');

            navigate(`/characterlist/${charId}`)
            
        } catch (err) {
            console.log(err);
        }
    };

    const obliterateCharacter = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/character/${charId}`)
            navigate(`/characterlist`)
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit} >
                <FormControl isRequired>
                    <FormLabel optionalIndicator>First name</FormLabel>
                    <Input type='text' value={firstName} onChange={handleFirstName} placeholder="Type your character's name here." />
                </FormControl>

                <br />

                <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input type="text" value={lastName} onChange={handleLastName} placeholder="Optional entry.." />
                    <FormHelperText>Optional entry.</FormHelperText>
                </FormControl>

                <br />

                <FormControl as='fieldset'>
                    <FormLabel as='legend'>Gender</FormLabel>
                    <RadioGroup defaultValue={'other'} onChange={handleGender}>
                        <HStack spacing='24px'>
                            <Radio value='male'>Male</Radio>
                            <Radio value='female'>Female</Radio>
                            <Radio value='other'>Other</Radio>
                        </HStack>
                    </RadioGroup>
                    <FormHelperText>Optional entry.</FormHelperText>
                </FormControl>

                <br />

                <FormControl isRequired>
                    <FormLabel isRequired>Character Level (1-20)</FormLabel>
                        <NumberInput defaultValue={level} onChange={handleLevel} max={20} min={1} placeholder='Select your level'>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                        </NumberInput>
                </FormControl>
                <br />
                <div className='paddingLargeChild'>

                <IconButton type="submit" className='paddingLeft' align='start' colorScheme='gray' aria-label='see character details' size='lg' icon={<EditIcon />} isRound='true' variant='outline'>
                </IconButton>
                <Link to={`/characterlist/global`}>
                    <IconButton className='paddingLeft' align='start' colorScheme='gray' aria-label='see character details' size='sm' icon={<ViewOffIcon />} isRound='true' variant='outline'>
                    </IconButton>
                </Link>
                </div>


            </form>
            <br />
            <hr />
            <br />
            <IconButton onClick={obliterateCharacter} className='paddingLeft' align='start' colorScheme='red' aria-label='see character details' size='lg' icon={<DeleteIcon />} isRound='true' variant='solid'>
            </IconButton>
    </div>
  )
}

export default CharacterEdit