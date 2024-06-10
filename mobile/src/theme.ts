import { theme as baseTheme, extendTheme } from 'native-base';

export const customTheme = extendTheme({
    colors: {
        primary: '#09552E',
        secondary: '#1AC16B',
        tertiary: '#B2CDAD',
        background: '#D2DCD0',
        danger: '#961407',
        confirm: '#1E97E1',
        error: '#cc0000'
    },
    fonts: {
        primary: "Copperplate",
    },
    fontSizes: {
        sm: '18px',
        md: '25px',
        lg: '30px',
        xl: '40px',
    },
    space: {
        xs: '4px',
        sm: '10px',
        md: '20px',
        lg: '30px',
        xl: '45px',
    },
});

//320x568