import React from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Link,
    ListItem,
    Spinner,
    Text,
    UnorderedList,
    VStack
} from '@chakra-ui/react';
import { Link as RouteLink, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { addLyricMutation, likeLyricMutation, songDetailQuery } from '../queries';
import { SimpleForm } from './SimpleForm.js';

export const SongDetail = () => {
    const [addLyric] = useMutation(addLyricMutation);
    const [likeLyric] = useMutation(likeLyricMutation);
    const { id: songId } = useParams();
    const { data, loading } = useQuery(songDetailQuery, { variables: { id: songId } });

    const onSubmit = (lyricText) => {
        addLyric({
            variables: {
                content: lyricText,
                songId
            }
        })
    };

    const onLikeLyric = (lyricId, amountOfLikes) => {
        likeLyric({
            variables: {
                lyricId
            },
            optimisticResponse: {
                likeLyric: {
                    id: lyricId,
                    likes: amountOfLikes + 1,
                    __typename: 'LyricType'
                }
            }
        })
    };

    return (
        <VStack spacing="4" align="flex-start">
            <Link to="/" color="blue.300" as={ RouteLink }> { '<- Songs' } </Link>

            { loading && <Spinner/> }

            { !loading && data?.song && (
                <>
                    <Heading as="h1">
                        { data.song.title }
                    </Heading>

                    { !!data.song.lyrics.length && (
                        <UnorderedList spacing="2">
                            { data.song.lyrics.map((lyric, index) => (
                                <ListItem
                                    key={ lyric.id }
                                    as={ Flex }
                                    width="300px"
                                    justifyContent="space-between"
                                >
                                    <Box>
                                        { lyric.content }
                                    </Box>

                                    <HStack>
                                        <Text opacity={ 0.5 }>
                                            { lyric.likes }
                                        </Text>

                                        <Button
                                            aria-label="Remove song"
                                            onClick={ () => onLikeLyric(lyric.id, lyric.likes) }
                                            size="xs"
                                            colorScheme="blue"
                                        >
                                            Like
                                        </Button>
                                    </HStack>
                                </ListItem>
                            )) }
                        </UnorderedList>
                    ) }

                    <SimpleForm
                        isClearAfterSubmit={ true }
                        onSubmit={ onSubmit }
                        label="Lyric text"
                    />
                </>
            ) }
        </VStack>
    );
};
