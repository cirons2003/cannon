import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {store} from './store'
import {ChakraProvider} from '@chakra-ui/react'
import Routing from './Routing'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store = {store} >
        <Routing/>
      </Provider> 
    </ChakraProvider>
  </React.StrictMode>
);


