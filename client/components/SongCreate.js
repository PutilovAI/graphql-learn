import React, { useRef, useState } from 'react';
import { Button, FormControl, FormLabel, Heading, Input, VStack, Link } from '@chakra-ui/react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { addSongQuery, songListQuery } from '../queries';

export const SongCreate = () => {
    const inputRef = useRef(null);
    const [addSong, result] = useMutation(addSongQuery);
    const navigate = useNavigate();

    const onSubmit = () => {
        addSong({
            variables: { title: inputRef.current.value },
            refetchQueries: [
                {
                    query: songListQuery,
                },
            ],
        }).then(res => navigate(-1));
    };

    return (
        <VStack spacing="4" align="flex-start">
            <Link to="/" color="blue.300" as={ RouteLink }> { '<- Main' } </Link>

            <Heading as="h1">
                Create a song
            </Heading>

            <FormControl>
                <FormLabel>
                    Title
                </FormLabel>

                <Input ref={ inputRef }/>
            </FormControl>

            <Button colorScheme="green" onClick={ onSubmit }>
                Create
            </Button>
        </VStack>
    );
};