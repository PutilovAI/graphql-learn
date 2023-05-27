import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Flex, Link, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { deleteSongMutation, songListQuery } from '../queries';

export const SongList = () => {
    const { data, loading } = useQuery(songListQuery);
    const [deleteSong] = useMutation(deleteSongMutation);

    const onDeleteSong = (songId) => {
        deleteSong({
            variables: { songId },
        })
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <VStack align="left">
            <UnorderedList spacing="2">
                { data?.songs?.map(({ id, title }, index) => (
                    <ListItem key={ id } as={ Flex } width="300px" justifyContent="space-between">
                        <Link as={ RouterLink } to={ `/songs/${id}`}>
                            { title }
                        </Link>

                        <Button
                            aria-label="Remove song"
                            onClick={ () => onDeleteSong(id) }
                            size="xs"
                            colorScheme="red"
                        >
                            Delete
                        </Button>
                    </ListItem>
                )) }
            </UnorderedList>

            <Link as={ RouterLink } to="/songs/new">
                <Button>
                    Create a new song
                </Button>
            </Link>
        </VStack>
    );
};
