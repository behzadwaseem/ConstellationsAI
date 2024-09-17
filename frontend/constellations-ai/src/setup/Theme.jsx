import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#ffa000',
      dark: '#3c1f16',
      light: '#FFDA46',
    },
    secondary: {
      main: '#0F1214',
      light: "#FFFFFF",
      dark: 'B5BDC9',
    },
    background: {
        default: 'black',
    },
  }
});

export default Theme;