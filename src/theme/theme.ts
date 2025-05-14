import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: 'black', 
    },
    primary: { main: '#440154	' },
    secondary: { main: '#074799' },
    info: { main: '#E1FFBB' },
    success: { main: '#009990' },
  },
});

export default theme;


/*
Step	Hex	Example
1	#440154	
Dark Purple
2	#482777	
Purple
3	#3E4989	
Indigo
4	#31688E	
Blue
5	#26828E	
Cyan-Blue
6	#1F9E89	
Teal
7	#35B779	
Green
8	#6DCD59	
Lime
9	#B4DE2C	
Yellow-Lime
10	#FDE725	
Bright Yellow
*/