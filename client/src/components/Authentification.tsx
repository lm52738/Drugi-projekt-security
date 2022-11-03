import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  Checkbox
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlockUi from "react-block-ui";
import 'react-block-ui/style.css';
  

const Authentification = () => {
    const navigate = useNavigate();

    const externalUrl = process.env.RENDER_EXTERNAL_URL;
    const port = externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
    const host = externalUrl !== undefined ? `${externalUrl}/` : `https://localhost:${port}/`;
    
    
    const [authError, setAuthError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [mistakeCount, setMistakeCount] = useState(0);
    const [blocking, setBlocking] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);
    const handleChangeCheck = () => setCheckbox(!checkbox);
    const handleChangePass = (event:any) => setPassword(event.target.value);
    const handleChangeEmail = (event:any) => setEmail(event.target.value);

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        console.log(checkbox);
        console.log(email);
        console.log(password);

        const path = checkbox ? 'good' : 'bad';
        await axios.post( host + path, {
            email,
            password
        }).then( response => {
            console.log("response");
            if (response.data.session) {
                localStorage.setItem("session", JSON.stringify(response.data.session));
            }
              
            navigate('/data');
        }).catch (error => {
            // 5 dopuštenih pokušaja
            console.log("error");
            if (checkbox) setMistakeCount(mistakeCount+1);
            const message = error.response.data.error;

            setAuthError(message);
        });
        
    };

    useEffect(() => {
        console.log(mistakeCount);
        if (mistakeCount === 5) {
            setBlocking(true);
            setTimeout(() => {
                setBlocking(false);
                setMistakeCount(0);
            },60000);
            
        }
    },[mistakeCount])

    return (
        <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        justifyContent="center"
        alignItems="center"
        >
        <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
        >
            <Avatar />
            <Heading>Welcome</Heading>
            <Box minW={{ base: "90%", md: "468px" }}>
            <BlockUi tag="div" blocking={blocking}>
            <form onSubmit={handleSubmit}>
                <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
                >
                <Stack spacing={5} direction='row'>
                    <Checkbox colorScheme='green' onChange={handleChangeCheck}>
                        Security
                    </Checkbox>
                </Stack>
                <FormControl>
                    <InputGroup>
                    <Input type="email" placeholder="email address" onChange={handleChangeEmail}/>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input
                        type={showPassword ? "text" : "password"}
                        onChange={handleChangePass}
                        placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                </FormControl>
                {authError != null && <Box color="red.400">{authError}</Box>}
                <Button
                    type="submit"
                    variant="solid"
                    width="full"
                >
                    Login
                </Button>
                </Stack>
            </form>
            </BlockUi>
            </Box>
            { blocking && <Box color="red.400">Sorry, there have been more than 5 failed login attempts for this account. It is temporarily blocked. Try again later or request a new password.</Box>}
        </Stack>
        </Flex>
    );
};

export default Authentification;
