import {Image, Box} from '@chakra-ui/react';
import { Link } from "react-router-dom";


function HomePage() {
  return (
    <div>
      <Link to="/generate-character">
        <Box boxSize='sm' align="center">
          <Image src='https://media.tenor.com/QzbsNWVr6zMAAAAj/jp-james-perrett.gif' alt='Roll Initiative Gif' />
        </Box>
      </Link>
    </div>
  );
}

export default HomePage;
