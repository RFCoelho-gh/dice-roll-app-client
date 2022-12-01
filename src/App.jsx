import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import GenerateCharacter from "./pages/GenerateCharacter";

/* import Navbar from "./components/Navbar"; */
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import CharacterDetails from "./pages/CharacterDetails";
import Characterlist from "./pages/Characterlist";
import CharacterEdit from "./pages/CharacterEdit";
/* import WithSubnavigation from "./components/ChakraNav"; */
import WithSubnavigation from "./components/OtherChakraNav";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
{/*       <WithSubnavigation/> */}
      <WithSubnavigation/>

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/generate-character" element={<GenerateCharacter/>} />

        <Route path="/characterlist/:id" element={<CharacterDetails/>} />

        <Route path="/characterlist/global" element={<Characterlist/>} />

        <Route path="/character/edit/:id" element={<CharacterEdit/>} /> 

        <Route path="/profile" element={
          <IsPrivate>
            <ProfilePage />
          </IsPrivate>
          }
        />

      <Route path="/signup" element={
          <IsAnon>
            <SignupPage />
          </IsAnon>
          }
        />

      <Route path="/login" element={
          <IsAnon>
            <LoginPage />
          </IsAnon>
          }
        />

      </Routes>
      </ChakraProvider>

    </div>
  );
}

export default App;
