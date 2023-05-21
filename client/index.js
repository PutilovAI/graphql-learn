import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { App } from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { SongList } from './components/SongList';
import { SongCreate } from './components/SongCreate';
import { SongDetail } from './components/SongDetail';

const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/graphql'
});

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <>Page not found</>,
        children: [
            {
                path: '',
                element: <SongList />,
            },
            {
                path: 'songs/new',
                element: <SongCreate />
            },
            {
                path: 'songs/:id',
                element: <SongDetail />
            }
        ]
    }
]);

const Root = () => {
  return (
      <ApolloProvider client={ apolloClient }>
          <ChakraProvider>
              <RouterProvider router={ router }/>
          </ChakraProvider>
      </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
