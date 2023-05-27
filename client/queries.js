import { gql } from '@apollo/client';

const LYRIC_DETAILS_FIELDS = gql`
    fragment LyricDetailsFields on LyricType {
        id
        likes
        content
    }
`

const SONG_DETAILS_FIELDS = gql`
    ${LYRIC_DETAILS_FIELDS}
    fragment SongDetailsFields on SongType {
        id
        title
        lyrics {
            ...LyricDetailsFields
        }
    }
`

const SONG_COMMON_FIELDS = gql`
    fragment SongCommonFields on SongType {
        id
        title
    }
`

export const addSongMutation = gql`
    ${SONG_COMMON_FIELDS}
    mutation ($title: String!) {
        addSong(title: $title) {
            ...SongCommonFields
        }
    }
`;

export const addLyricMutation = gql`
    ${SONG_DETAILS_FIELDS}
    mutation AddLyricToSong ($content: String!, $songId: ID!) {
        addLyricToSong(content: $content, songId: $songId) {
            ...SongDetailsFields
        }
    }
`;

export const likeLyricMutation = gql`
    mutation LikeTheLyric ($lyricId: ID!) {
        likeLyric(id: $lyricId) {
            id
            likes
        }
    }
`;

export const songListQuery = gql`
    ${SONG_COMMON_FIELDS}
    query GetSongList {
        songs {
            ...SongCommonFields
        }
    }
`;

export const songDetailQuery = gql`
    ${SONG_DETAILS_FIELDS}
    query GetSong($id: ID!) {
        song(id: $id) {
            ...SongDetailsFields
        }
    }
`;

export const deleteSongMutation = gql`
    ${SONG_COMMON_FIELDS}
    mutation DeleteSong ($songId: ID!) {
        deleteSong(id: $songId) {
            ...SongCommonFields
        }
    }
`
