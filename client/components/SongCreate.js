import React from 'react';
import { Heading, Link, VStack } from '@chakra-ui/react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { addSongMutation, songListQuery } from '../queries';
import { SimpleForm } from './SimpleForm.js';

export const SongCreate = () => {
    const [addSong] = useMutation(addSongMutation);
    const navigate = useNavigate();

    const onSubmit = (value) => {
        addSong({
            variables: { title: value },
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

            <SimpleForm
                onSubmit={ onSubmit }
                label="Song name"
            />
        </VStack>
    );
};
