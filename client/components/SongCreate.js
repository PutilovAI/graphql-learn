import React, { useRef, useState } from 'react';
import { Button, FormControl, FormLabel, Heading, Input, VStack, Link } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

const ADD_SONG = gql`
    mutation AddSong($title: String!) {
        addSong(title: $title) {
            id
            title
        }
    }
`

export const SongCreate = () => {
    const inputRef = useRef(null);
    const [addSong, result] = useMutation(ADD_SONG);

    const onSubmit = () => {
        console.log()
        addSong({ variables: { title: inputRef.current.value }  })
            .then(res => console.log('async res', res));
    }

    console.log('sync result', result);

    return (
        <VStack spacing="4" align="flex-start">
            <Link to="/" color="blue.300" as={RouteLink}> { '<- Main' } </Link>

            <Heading as="h1">
                Create a song
            </Heading>

            <FormControl>
                <FormLabel>
                    Title
                </FormLabel>

                <Input ref={inputRef} />
            </FormControl>

            <Button colorScheme="green" onClick={ onSubmit }>
                Create
            </Button>
        </VStack>
    );
}