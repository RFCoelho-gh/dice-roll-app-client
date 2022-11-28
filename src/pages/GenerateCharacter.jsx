import {useState} from 'react';
import axios  from 'axios';
import {FormControl, FormLabel, Input, NumberInput, NumberInputField, NumberInputStepper,
     NumberIncrementStepper, NumberDecrementStepper, FormErrorMessage, FormHelperText,
     RadioGroup, HStack, Radio, Button as ChakraButton, ButtonGroup, Flex, Avatar,
     Box, Text, Badge, extendTheme
    } from '@chakra-ui/react'
import {Button, Form} from 'react-bootstrap';
import {randomNumber} from '../utilities/utility';
import {classLibrary} from '../library/CharOptions.library';
import './styles/Global.css'


function GenerateCharacter() {

    //PossibilitiesCalculator
    const [ancestryEntries, setAncestryEntries] = useState('?');
    const [backgroundEntries, setBackgroundEntries] = useState('?');
    const [classEntries, setClassEntries] = useState('?');
    const [deityEntries, setDeityEntries] = useState('?');
    const [allEntries, setAllEntries] = useState("Generate to Calculate")

    //* USER INPUT BASED
    const [firstName, setFirstName] = useState('Name');
    const [lastName, setLastName] = useState('Surname');
    const [gender, setGender] = useState('');
    const [level, setLevel] = useState(1);

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
    
            const ancestryName = response.data.results[RNG].name;

            //Setting Count for Possibilities

            const ancestryCount = response.data.count

            const ancestryDescription = response.data.results[RNG].content;

            const ancestryObject = {
                name: ancestryName,
                count: ancestryCount,
                description: ancestryDescription,
            };

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

            //FLAWS
            const ancestryFlawOne = response.data.results[RNG].data.flaws[0].value[0]
            if (ancestryFlawOne) {
                switch (ancestryFlawOne) {
                    case 'str':
                        defaultSTR-=2;
                        break;
                    case 'dex':
                        defaultDEX-=2;
                        break;
                    case 'con':
                        defaultCON-=2;
                        break;
                    case 'int':
                        defaultINT-=2;
                        break;
                    case 'wis':
                        defaultWIS-=2;
                        break;
                    case 'cha':
                        defaultCHA-=2;
                        break;
                    default:
    
                };
            };

            return ancestryObject;
            
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

            const backgroundName = response.data.results[RNG].name;

            const backgroundCount = response.data.count;

            const backgroundDescription = response.data.results[RNG].content;

            //Setting Count for Possibilities
            setBackgroundEntries(response.data.count)

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

            const backgroundObject = {
                name: backgroundName,
                count: backgroundCount,
                description: backgroundDescription,
            };

            return backgroundObject;
            
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
    
            const className = response.data.results[RNG].name;

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

            //Setting Count for Possibilities
            setClassEntries(response.data.count)

            const classCount = response.data.count

            //Taking Description with HTML

            const classDescription = response.data.results[RNG].content;

            //*Returning Object

            const classObject = {
                name: className,
                count: classCount,
                description: classDescription,
            };

            return classObject;
            
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
    
            const deityName = response.data.results[RNG].name;

            //*Setting Count for Possibilities Calc
            const deityCount = response.data.count

            //Taking Description with HTML
            const deityDescription = response.data.results[RNG].content;

            //*RETURNING OBJECT

            const deityObject = {
                name: deityName,
                count: deityCount,
                description: deityDescription,
            };

            return deityObject;

            //return randomDeity;
            
        } catch (err) {

            console.log(err);
        };
    };

    //!RANDOM 4BOOST

    function randoomBoost (){

        //This function takes all Default Values,
        //randomizes four unique entries out of six,
        //and increases them each by 2

        const defaultArr = [defaultSTR, defaultDEX, defaultCON, defaultINT, defaultWIS, defaultCHA];

        for (let i = 0; i < 4; i++) {

            let rng = randomNumber(0, defaultArr.length-1)

            defaultArr[rng]+=2

            const index = defaultArr.indexOf(defaultArr[rng]);
            if (index > -1) { // only splices when rngPick is found
                defaultArr.splice(index, 1);
            };
            
          };
    };

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
            setBackground(resultBackground.name);
            setDeity(resultDeity.name);
            setCharClass(resultClass.name);
            setAncestry(resultAncestry.name);
            
            //Applying Random Boosters
            randoomBoost();
            
            //Updating Attributes based on Results
            setStrength(defaultSTR);
            setDexterity(defaultDEX);
            setConstitution(defaultCON);
            setIntelligence(defaultINT);
            setWisdom(defaultWIS);
            setCharisma(defaultCHA);
            
            //Updating Results
/*             console.log(allEntries);
            console.log(`${ancestryEntries} * ${backgroundEntries} * ${classEntries} * ${deityEntries}`)
            setAllEntries(ancestryEntries * backgroundEntries * classEntries * deityEntries); */

            setDeityEntries(resultDeity.count)
            setAllEntries(resultDeity.count * resultClass.count * resultBackground.count * resultAncestry.count)

            console.log(resultAncestry)


            

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
                <Text align='start' fontSize='sm'><span className='text-bold'># Results (All):</span> {allEntries}</Text>
                <Text align='start' fontSize='sm'><span className='text-bold'># Results (w/o Deity):</span> {allEntries / deityEntries}</Text>


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