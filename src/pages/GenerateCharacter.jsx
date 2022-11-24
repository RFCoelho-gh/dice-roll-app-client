import {useState} from 'react';
import axios  from 'axios';
import {FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper,
     NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage, FormHelperText,
     RadioGroup, HStack, Radio, Button as ChakraButton, ButtonGroup, Flex, Avatar,
     Box, Text, Badge
    } from '@chakra-ui/react'
import {Button, Form} from 'react-bootstrap';
import {randomNumber} from '../utilities/utility';
import {classLibrary} from '../library/CharOptions.library';


function GenerateCharacter() {

    //* USER INPUT BASED
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [level, setLevel] = useState(randomNumber(1, 20));

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleLevel = (e) => setLevel(e.target.value);

    //* RNG RESULT BASED
    const [ancestry, setAncestry] = useState('');
    const [background, setBackground] = useState('');
    const [charClass, setCharClass] = useState('');
    const [deity, setDeity] = useState('');

    
    async function getOneFromLibrary (category){



        try {

            const RNG = randomNumber(1, 20);

            console.log(RNG);

/*          axios.defaults.headers['PF2_KEY'] = `${process.env.PF2_API_KEY}`;

            const response = await axios.get(`https://api.pathfinder2.fr/v1/pf2/ancestry`);

            console.log(response); */

            
            
        } catch (err) {
            console.log(err);
        };

    };

    function randomizeAll (){
        const randomClass = classLibrary[randomNumber(1, classLibrary.length)]

        setCharClass(randomClass);

    };



    const getAll = async () => {
        
    }


    return (
        <div>

            <form >
                {/* //! FIRST NAME INPUT */}
                <FormControl isRequired>
                    <FormLabel optionalIndicator>First name</FormLabel>
                    <Input type='text' value={firstName} onChange={handleFirstName} placeholder="Type your character's name here." />
                </FormControl>

                <br />

                {/* //! LAST NAME INPUT */}
                <FormControl>
                    <FormLabel>First name</FormLabel>
                    <Input type="text" value={lastName} onChange={handleLastName} placeholder="Optional entry.." />
                    <FormHelperText>Optional entry.</FormHelperText>
                </FormControl>

                <br />

                {/* //! GENDER INPUT */}
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

                {/* //! LEVEL INPUT */}
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

                <ChakraButton onClick={randomizeAll} type="button" colorScheme='red' size='lg'>
                Randomize ALL
                </ChakraButton>

               <br />

                <Flex>
                    <Avatar src='a' />
                    <Box ml='3'>
                        <Text fontWeight='bold'>
                        Segun Adebayo
                            <Badge ml='1' colorScheme='green'>
                            {charClass}
                            </Badge>
                        </Text>
                        <Text fontSize='sm'>{ancestry} {background}</Text>
                    </Box>
                </Flex>

            </form>

        </div>
    )

}

export default GenerateCharacter;