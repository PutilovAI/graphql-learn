import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Button, List, ListItem, UnorderedList, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const songListQuery = gql`
    {
        songs {
            id
            title
        }
    }
`;

export const SongList = () => {
    const { data, loading, ...rest } = useQuery(songListQuery);

    console.log(rest)

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <VStack align="left">
            <UnorderedList>
                { data?.songs?.map((song, index) => (
                    <ListItem key={song.id}>
                        { song.title }
                    </ListItem>
                )) }
            </UnorderedList>

            <Link to="/songs/new">
                <Button>
                    Create a new song
                </Button>
            </Link>
        </VStack>
    )
}