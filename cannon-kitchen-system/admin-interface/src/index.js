import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {store} from './store'
import {ChakraProvider} from '@chakra-ui/react'
import Routing from './Routing'
import {theme} from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store} >
      <ChakraProvider theme = {theme}>
          <Routing/>
      </ChakraProvider>
    </Provider> 
  </React.StrictMode>
);


