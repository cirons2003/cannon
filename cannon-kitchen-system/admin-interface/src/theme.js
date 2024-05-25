import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  styles: {
    global: {
      // You can add styles here for the `body`, `a`, or any other element.
      '::placeholder': {
        color: 'black',
        opacity: '50%'
      },
      '::-webkit-scrollbar': {
        width: '8px',
        borderRadius: '8px',
        backgroundColor: `rgba(0, 0, 0, 0.05)`,
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: `rgba(0, 0, 0, 0.5)`,
        borderRadius: '8px',
      },
    },
  },
});

