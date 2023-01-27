import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";
import {classicFour} from '../utilities/utility';
import {Input, Button, Heading, FormControl, 
  FormLabel} from '@chakra-ui/react';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // Send a request to the server using axios
    /* 
    axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`)
      .then((response) => {})
    */

    // Or using a service
    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        // and at last navigate to the home page
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      
      <Heading className="paddingTop">User Login</Heading>

      <form onSubmit={handleLoginSubmit}>
        <FormControl className="paddingLeft paddingDown">
          <FormLabel className="paddingLeft">Email:</FormLabel>
          <Input type='email' name="email" value={email} onChange={handleEmail} width={351} placeholder={`${classicFour().toLowerCase()}@adventurer.com`} />
        </FormControl>
        <FormControl className="paddingLeft paddingDown">
          <FormLabel className="paddingLeft">Password:</FormLabel>
          <Input type='password' name="password" value={password} onChange={handlePassword} width={351} placeholder="**********"/>
        </FormControl>
        <div className="paddingTopBot15">
          <Button colorScheme='green' size='lg' type="submit">
            Login!
          </Button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <hr />
      <p className="text-bold paddingTopBot">Don't have an account yet?</p>
      <Button colorScheme='blue' size='sm'><Link to={"/signup"}> Sign Up</Link></Button>
    </div>
  );
}

export default LoginPage;
