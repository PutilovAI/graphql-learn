import mongoose from 'mongoose';
import graphql from 'graphql';
import SongType from './song_type.js';

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Lyric = mongoose.model('lyric');

const LyricType = new GraphQLObjectType({
  name:  'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve(parentValue) {
        return Lyric.findById(parentValue).populate('song')
          .then(lyric => {
            return lyric.song
          });
      }
    }
  })
});

export default LyricType;
