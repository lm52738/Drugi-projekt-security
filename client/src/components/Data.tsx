import React, { useState } from 'react';
import '../App.css';
import {
    Flex,
    Heading,
    Stack,
    Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Box,
  Text,
  Select,
  FormControl,
  InputGroup,
  Button,
  HStack,
  Checkbox,
  } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Data = () => {

    const navigate = useNavigate();

    const externalUrl = "https://fer-security-app.onrender.com";
    const port = 4080;
    const host = externalUrl !== undefined ? `${externalUrl}/data/` : `https://localhost:${port}/data/`;

    const [authError, setAuthError] = useState<string | null>(null);
    const [value, setValue] = useState('')
    const [option,setOption] = useState(undefined);
    const [checkbox, setCheckbox] = useState(false);
    const [books,setBooks] = useState([]);
    const handleChangeCheck = () => setCheckbox(!checkbox);
    const handleChangeValue = (event:any) => setValue(event.target.value);
    const handleChangeOption = (event:any) => setOption(event.target.value);

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        console.log(value);
        console.log(option);

        const path = checkbox ? 'good' : 'bad';
        const session = JSON.parse(localStorage.getItem("session") as string);
        await axios.post( host + path, {
            session,
            value,
            option
        }).then( response => {
            setAuthError(null);
            setBooks(response.data.books);
        }).catch (error => {
            console.log(error);
            if (error.response.status === 401)
                navigate('/');
            else {
                const message = error.response.data.error;
                setAuthError(message);
            }
        });
    };

    const handleLogout = async () => {
        localStorage.clear();
        await axios.post( host + 'logout').catch (error => {
            console.log(error);
        });

        navigate('/');
    }

    return (
        <Flex
        flexDirection="column"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        >
        <Stack
            flexDir="column"
            width='100%'
            my="5"
            justifyContent="center"
            alignItems="center"
        >
        <Heading>Search books</Heading>
        <HStack>
            <Text>You want to leave?</Text>
            <Button onClick={handleLogout}>Log out</Button>
        </HStack>
        <Box minW={{ base: "90%", md: "468px" }} py={4} my={4} >
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
                        <Select placeholder='Search by' onChange={handleChangeOption}>
                        <option value='genre'>Genre</option>
                        <option value='nativeLang'>Language</option>
                        <option value='nameBook'>Name</option>
                        <option value='author'>Author</option>
                        <option value='idBook'>ID</option>
                        </Select>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <InputGroup>
                    <Input type="value" placeholder="Input value" onChange={handleChangeValue}/>
                    </InputGroup>
                </FormControl>
                <Button
                    type="submit"
                    variant="solid"
                    width="full"
                >
                    Submit
                </Button>
            </Stack>
            </form>
        </Box>

        {authError != null && <Box color="red.400">{authError}</Box>}
        
        <TableContainer width="75%">
            <Table variant='simple'>
                <TableCaption>Books you searched for...</TableCaption>
                <Thead>
                <Tr>
                    <Th isNumeric>ID</Th>
                    <Th>Name</Th>
                    <Th>Author</Th>
                    <Th>Number of Pages</Th>
                    <Th>Language</Th>
                    <Th>Genre</Th>
                </Tr>
                </Thead>
                <Tbody>
                { books !== undefined && books.map((book:any) => 
                    <Tr>
                        <Td isNumeric>{book.idbook}</Td>
                        <Td>{book.namebook}</Td>
                        <Th>{book.author}</Th>
                        <Th>{book.nbrpages}</Th>
                        <Th>{book.nativelang}</Th>
                        <Th>{book.genre}</Th>
                    </Tr>
                )}
                
                </Tbody>
                <Tfoot>
                <Tr>
                    <Th isNumeric>ID</Th>
                    <Th>Name</Th>
                    <Th>Author</Th>
                    <Th>Number of Pages</Th>
                    <Th>Language</Th>
                    <Th>Genre</Th>
                </Tr>
                </Tfoot>
            </Table>
            </TableContainer>
      </Stack>
    </Flex>
    );
}
