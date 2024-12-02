import './App.css';
import {Routes, Route} from 'react-router-dom';
import { useMemo} from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import {createTheme} from '@mui/material/styles'
import { themeSettings } from './theme';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import ErrorPage from './pages/ErrorPage';

function App() {
  const theme = useMemo(() => createTheme(themeSettings(), []))

  const isAuthenticated = JSON.parse(localStorage.getItem('authToken') !== null);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Navbar />
        {isAuthenticated ? (
          <Routes>
        <Route path="/" element={<Homepage />}/>
      </Routes>
      ) : (
        <>
          <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} exact/>
        <Route path="*" element={<ErrorPage />} />
        </Routes>
        </>
      )}

        {/* <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <ErrorPage />}/>
        <Route path="/register" element={isAuthenticated ? <Homepage /> : <Register />}/>
        <Route path="/login" element={isAuthenticated ? <Homepage /> : <Login />} exact/>
        </Routes> */}

      </ThemeProvider>
    </>
  );
}

export default App;
