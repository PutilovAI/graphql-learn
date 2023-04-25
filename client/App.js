import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const App = () => (
    <Box p="8">
        <Outlet />
    </Box>
);