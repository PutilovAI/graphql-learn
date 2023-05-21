import React, { useRef, useState } from 'react';
import { Button, FormControl, FormLabel, Heading, Input, VStack, Link, Spinner } from '@chakra-ui/react';
import { Link as RouteLink, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { addSongQuery, songDetailQuery, songListQuery } from '../queries';

export const SongDetail = () => {
    const inputRef = useRef(null);
    // const [addSong, result] = useMutation(addSongQuery);
    const params = useParams();
    const { data, loading } = useQuery(songDetailQuery, { variables: { id: params.id }});

    // const onSubmit = () => {
    //     addSong({
    //         variables: { title: inputRef.current.value },
    //         refetchQueries: [
    //             {
    //                 query: songListQuery,
    //             },
    //         ],
    //     })
    // };

    console.log('data', data)

    return (
        <VStack spacing="4" align="flex-start">
            <Link to="/" color="blue.300" as={ RouteLink }> { '<- Songs' } </Link>

            { loading && <Spinner /> }

            { !loading && data?.song && (
                <>
                    <Heading as="h1">
                        { data.song.title }
                    </Heading>

                    <FormControl>
                        <FormLabel>
                            Lyrics text
                        </FormLabel>

                        <Input ref={ inputRef }/>
                    </FormControl>

                    <Button colorScheme="green" onClick={ () => {} }>
                        Add
                    </Button>
                </>
            )}
        </VStack>
    );
};