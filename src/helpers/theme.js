import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
            '& .MuiInputBase-input': {
              color: 'black', 
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.5)',
            },
            '& .MuiInputLabel-root': {
              color: 'black',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'black',
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            ".MuiTabs-indicator": {
              backgroundColor: "black",
            }
          }
        }
      },
      MuiTab: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: "black",
              
            },
          },
        },
      },
    },
  });
