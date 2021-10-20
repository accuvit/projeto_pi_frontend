import '../styles/globals.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Bibli<strong>WEB</strong>teca
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
