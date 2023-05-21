import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
import './models/index.js';
import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import schema from './schema/schema.js';

const app = express();

const NAME = 'Putilov';
const PASSWORD = 'GMPuTO5uEBhXoDHz';
const MONGO_URI = `mongodb+srv://${NAME}:${PASSWORD}@putilovstkhmmongodbclus.vwxsitz.mongodb.net/?retryWrites=true&w=majority`;
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.use(webpackMiddleware(webpack(webpackConfig)));

export default app;
