import { gql } from '@apollo/client';

export const addSongQuery = gql`
    mutation ($title: String!) {
        addSong(title: $title) {
            id
            title
        }
    }
`;

export const songListQuery = gql`
    query GetSongList {
        songs {
            id
            title
        }
    }
`;

export const songDetailQuery = gql`
    query GetSong($id: ID!) {
        song(id: $id) {
            id
            title
            lyrics {
                id
                likes
                content
            }
        }
    }
`;

export const deleteSongMutation = gql`
    mutation DeleteSong ($songId: ID!) {
        deleteSong(id: $songId) {
            id
        }
    }
`