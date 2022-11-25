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
    const [firstName, setFirstName] = useState('Name');
    const [lastName, setLastName] = useState('Surname');
    const [gender, setGender] = useState('');
    const [level, setLevel] = useState(randomNumber(1, 20));

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleLevel = (e) => setLevel(e.target.value);

    //* RNG RESULT BASED
    const [ancestry, setAncestry] = useState('?????');
    const [background, setBackground] = useState('?????');
    const [charClass, setCharClass] = useState('?????');
    const [deity, setDeity] = useState('?????');
    const [rollCounter, setRollCounter] =useState(0);

    //* ATTRIBUTE BASED

    const [strength, setStrength] = useState(10);
    const [dexterity, setDexterity] = useState(10);
    const [constitution, setConstitution] = useState(10);
    const [intelligence, setIntelligence] = useState(10);
    const [wisdom, setWisdom] = useState(10);
    const [charisma, setCharisma] = useState(10);


    //!RANDOM ANCESTRY
    async function randomizeAncestry(){

        try {
            const response = await axios.get(`https://api.pathfinder2.fr/v1/pf2/ancestry`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_PF2_API_KEY}`
                }
            });
    
            // -2 here due to Empty Ancestry slot
            const RNG = randomNumber(0, response.data.results.length-2)

            //console.log(response.data.results[RNG].name);

            
            //console.log(response.data.results[RNG].data.flaws);
    
            const randomAncestry = response.data.results[RNG].name;

            setAncestry(randomAncestry)

            //Setting Attributes
            //BOOSTS

            const ancestryBoostOne = response.data.results[RNG].data.boosts[0].value[0]
            switch (ancestryBoostOne) {
                case 'str':
                    setStrength(strength+2)
                    break;
                case 'dex':
                    setDexterity(dexterity+2)
                    break;
                case 'con':
                    setConstitution(constitution+2)
                    break;
                case 'int':
                    setIntelligence(intelligence+2)
                    break;
                case 'wis':
                    setWisdom(wisdom+2)
                    break;
                case 'cha':
                    setCharisma(charisma+2)
                    break;
            };

            const ancestryBoostTwo = response.data.results[RNG].data.boosts[1].value[0]
            switch (ancestryBoostTwo) {
                case 'str':
                    setStrength(strength+2)
                    break;
                case 'dex':
                    setDexterity(dexterity+2)
                    break;
                case 'con':
                    setConstitution(constitution+2)
                    break;
                case 'int':
                    setIntelligence(intelligence+2)
                    break;
                case 'wis':
                    setWisdom(wisdom+2)
                    break;
                case 'cha':
                    setCharisma(charisma+2)
                    break;
            };

            
        } catch (err) {
            console.log(err);
        }

    }

    //!RANDOM BACKGROUND

    async function randomizeBackground(){

        try {
            const response = await axios.get(`https://api.pathfinder2.fr/v1/pf2/background`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_PF2_API_KEY}`
                }
            });
    
            const RNG = randomNumber(0, response.data.results.length-1)
    
            const randomBackground = response.data.results[RNG].name;
    
            setBackground(randomBackground);
            
        } catch (err) {
            console.log(err);
        }


    }

    //!RANDOM CLASS

    async function randomizeClass(){

        try {
            const response = await axios.get(`https://api.pathfinder2.fr/v1/pf2/class`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_PF2_API_KEY}`
                }
            });
    
            // -2 here due to Empty Class slot
            const RNG = randomNumber(0, response.data.results.length-2)
    
            const randomClass = response.data.results[RNG].name;
    
            setCharClass(randomClass);
            
        } catch (err) {

            console.log(err);
            
        }


    }

    //!RANDOM DEITY

    async function randomizeDeity(){

        try {
            const response = await axios.get(`https://api.pathfinder2.fr/v1/pf2/deity`, {
                headers: {
                    Authorization: `${process.env.REACT_APP_PF2_API_KEY}`
                }
            });
    
            const RNG = randomNumber(0, response.data.results.length-1)
    
            const randomDeity = response.data.results[RNG].name;
    
            setDeity(randomDeity);
            
        } catch (err) {

            console.log(err);
            
        }


    }

    //!RANDOMIZE EVERYTHING

    async function randomizeAll (){

        //RESET ALL
        setStrength(10);
        setDexterity(10);
        setConstitution(10);
        setIntelligence(10);
        setWisdom(10);
        setCharisma(10);
        setAncestry('•••••')
        setBackground('•••••')
        setCharClass('•••••')
        setDeity('•••••')

        try {
            

    
            setRollCounter(rollCounter+1);
    
            await randomizeClass();
            await randomizeAncestry();
            await randomizeBackground();
            await randomizeDeity();
            
        } catch (err) {
            console.log(err);
        };


    };


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
                Randomize ALL - 🎲{rollCounter}
                </ChakraButton>

               <br />

                <Flex>
                    <Avatar src='a' />
                    <Box ml='3'>
                        <Text align='start' fontWeight='bold'>
                        {firstName} {lastName}
                            <Badge ml='1' colorScheme='green'>
                            {charClass}
                            </Badge>
                        </Text>
                        <Text align='start' fontSize='sm'>{ancestry}, {background}</Text>
                        <Text align='start' fontSize='sm'>Follower of {deity}</Text>
                        <Text align='start' fontSize='sm'>STR: {strength} | DEX: {dexterity} | CON: {constitution}</Text>
                        <Text align='start' fontSize='sm'>INT: {intelligence} | WIS: {wisdom} | CHA: {charisma}</Text>
                    </Box>
                </Flex>

            </form>

        </div>
    )

}

export default GenerateCharacter;