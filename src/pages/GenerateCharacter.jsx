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

    //const possibleResults = (ancestryEntries * backgroundEntries * classEntries * deityEntries );
    const possibleResults = (30 * 300 * 19 * 222 );

    //* USER INPUT BASED
    const [firstName, setFirstName] = useState('Name');
    const [lastName, setLastName] = useState('Surname');
    const [gender, setGender] = useState('');
    const [level, setLevel] = useState(randomNumber(1, 20));

    const [rollCounter, setRollCounter] = useState(0);

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleLevel = (e) => setLevel(e.target.value);

    //* RNG RESULT BASED
    const [ancestry, setAncestry] = useState('?????');
    const [background, setBackground] = useState('?????');
    const [charClass, setCharClass] = useState('?????');
    const [deity, setDeity] = useState('?????');
    

    //* ATTRIBUTE BASED

    let defaultSTR = 10;
    let defaultDEX = 10;
    let defaultCON = 10;
    let defaultINT = 10;
    let defaultWIS = 10;
    let defaultCHA = 10;

    

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
            
            //console.log(response.data.results[RNG].data.flaws);
    
            const randomAncestry = response.data.results[RNG].name;

            //Setting Attributes
            //BOOSTS

            const ancestryBoostOne = response.data.results[RNG].data.boosts[0].value[0]
            switch (ancestryBoostOne) {
                case 'str':
                    defaultSTR+=2;
                    break;
                case 'dex':
                    defaultDEX+=2;
                    break;
                case 'con':
                    defaultCON+=2;
                    break;
                case 'int':
                    defaultINT+=2;
                    break;
                case 'wis':
                    defaultWIS+=2;
                    break;
                case 'cha':
                    defaultCHA+=2;
                    break;
            };

            const ancestryBoostTwo = response.data.results[RNG].data.boosts[1].value[0]
            switch (ancestryBoostTwo) {
                case 'str':
                    defaultSTR+=2;
                    break;
                case 'dex':
                    defaultDEX+=2;
                    break;
                case 'con':
                    defaultCON+=2;
                    break;
                case 'int':
                    defaultINT+=2;
                    break;
                case 'wis':
                    defaultWIS+=2;
                    break;
                case 'cha':
                    defaultCHA+=2;
                    break;
            };

            return randomAncestry;
            
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

            const backgroundBoostOne = response.data.results[RNG].data.boosts[0].value[0]
            switch (backgroundBoostOne) {
                case 'str':
                    defaultSTR+=2;
                    break;
                case 'dex':
                    defaultDEX+=2;
                    break;
                case 'con':
                    defaultCON+=2;
                    break;
                case 'int':
                    defaultINT+=2;
                    break;
                case 'wis':
                    defaultWIS+=2;
                    break;
                case 'cha':
                    defaultCHA+=2;
                    break;
            };

            const backgroundBoostTwo = response.data.results[RNG].data.boosts[1].value[0]
            switch (backgroundBoostTwo) {
                case 'str':
                    defaultSTR+=2;
                    break;
                case 'dex':
                    defaultDEX+=2;
                    break;
                case 'con':
                    defaultCON+=2;
                    break;
                case 'int':
                    defaultINT+=2;
                    break;
                case 'wis':
                    defaultWIS+=2;
                    break;
                case 'cha':
                    defaultCHA+=2;
                    break;
            };

            return randomBackground
            
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

            console.log(`Hit is: ${response.data.results[RNG].data.keyAbility.value[0]}`)

            const classBoostOne = response.data.results[RNG].data.keyAbility.value[0]
            switch (classBoostOne) {
                case 'str':
                    defaultSTR+=2;
                    break;
                case 'dex':
                    defaultDEX+=2;
                    break;
                case 'con':
                    defaultCON+=2;
                    break;
                case 'int':
                    defaultINT+=2;
                    break;
                case 'wis':
                    defaultWIS+=2;
                    break;
                case 'cha':
                    defaultCHA+=2;
                    break;
            };

            return randomClass
            
        } catch (err) {

            console.log(err);
        };

    };

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

            return randomDeity;
            
        } catch (err) {

            console.log(err);
        };
    };

    //!RANDOM 4BOOST

    function randoomBoost (){

        

        const defaultArr = [defaultSTR, defaultDEX, defaultCON, defaultINT, defaultWIS, defaultCHA];

        console.log(`LETS DALE ARRAY DEFAULT ${defaultArr}`)

        for (let i = 0; i < 4; i++) {
            let pickedAtr = defaultArr[randomNumber(0, defaultArr.length)];
            console.log(`Jesus, I was picked! My value is ${pickedAtr}`)
            pickedAtr+=2;
            console.log(`But now it became ${pickedAtr}!`)

            const index = defaultArr.indexOf(pickedAtr);
            if (index > -1) { // only splice array when item is found
                defaultArr.splice(index, 1); // 2nd parameter means remove one item only
                console.log(`I feel smaller: ${defaultArr}`)
            };

            
          }


    
    }

    //!RANDOMIZE EVERYTHING

    async function randomizeAll (){

        
        try {

            //Resetting Defaults to 10

            defaultSTR = 10;
            defaultDEX = 10;
            defaultCON = 10;
            defaultINT = 10;
            defaultWIS = 10;
            defaultCHA = 10;

            //Activating primitive Spinners
            setAncestry('•••••')
            setBackground('•••••')
            setCharClass('•••••')
            setDeity('•••••')

            setStrength('••');
            setDexterity('••');
            setConstitution('••');
            setIntelligence('••');
            setWisdom('••');
            setCharisma('••');

            //Updating Counter
            setRollCounter(rollCounter+1);
            
            //Retrieving new Random result
            const resultDeity = await randomizeDeity();
            const resultBackground = await randomizeBackground();
            const resultClass = await randomizeClass();
            const resultAncestry = await randomizeAncestry();
            
            //Updating State with Results
            setBackground(resultBackground);
            setDeity(resultDeity);
            setCharClass(resultClass);
            setAncestry(resultAncestry);

            //Calling Random Boosters
            randoomBoost();

            //Updating Attributes based on Results
            setStrength(defaultSTR);
            setDexterity(defaultDEX);
            setConstitution(defaultCON);
            setIntelligence(defaultINT);
            setWisdom(defaultWIS);
            setCharisma(defaultCHA);
            
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
                <Text align='start' fontSize='sm'>total possible results: {possibleResults}</Text>
                {/* <Text align='start' fontSize='sm'>Ancestries: {possibleResults}</Text>
                <Text align='start' fontSize='sm'>total possible results: {possibleResults}</Text>
                <Text align='start' fontSize='sm'>total possible results: {possibleResults}</Text>
                <Text align='start' fontSize='sm'>total possible results: {possibleResults}</Text> */}


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