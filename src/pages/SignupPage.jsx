import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import {Heading, FormControl, FormLabel, Input, Button} from '@chakra-ui/react';
import {classicFour, randomNumber} from '../utilities/utility';
//import { FormControl } from "react-bootstrap";

function SignupPage() {

  const [rngClassic, setRngClassic] = useState(classicFour())

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/login");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <Heading className="paddingTop">User Signup</Heading>

      <form onSubmit={handleSignupSubmit}>

        <FormControl className="paddingLeft paddingDown">
          <FormLabel className="paddingLeft">Username:</FormLabel>
          <Input type="text" name="name" value={name} onChange={handleName} width={351} placeholder={rngClassic}></Input>
        </FormControl>

        <FormControl className="paddingLeft paddingDown">
          <FormLabel className="paddingLeft">Email:</FormLabel>
          <Input type="email" name="email" value={email} onChange={handleEmail} width={351} placeholder={`${rngClassic.toLowerCase()}@adventurer.com`}></Input>
        </FormControl>

        <FormControl className="paddingLeft paddingDown">
          <FormLabel className="paddingLeft">Password:</FormLabel>
          <Input type='password' name="password" value={password} onChange={handlePassword} width={351} placeholder="**********"></Input>
        </FormControl>

        <div className="paddingTopBot15">
          <Button type="submit" colorScheme='green' size='lg'>
            Sign Up!
          </Button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <hr />
        <p className="text-bold paddingTopBot">Already have account?</p>
        <Button colorScheme='blue' size='sm'><Link to={"/login"}> Log in</Link></Button>

      </form>

    </div>
  );
}

export default SignupPage;
