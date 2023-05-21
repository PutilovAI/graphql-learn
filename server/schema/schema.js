import _ from 'lodash';
import graphql from 'graphql';

import RootQueryType from './root_query_type.js';
import mutations from './mutations.js';

const { GraphQLSchema } = graphql;

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});

export default schema;