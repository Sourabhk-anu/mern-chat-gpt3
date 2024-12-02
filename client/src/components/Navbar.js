import React from 'react'
import {Box, Typography, useTheme} from '@mui/material'
import {NavLink} from 'react-router-dom';

const Navbar = () => {

  const theme = useTheme();

  // const isAuthenticated = localStorage.getItem('authToken') !== null;

  // const loggedIn = ({data}) => JSON.parse(localStorage.getItem("authToken", data.token));

  return (
    <Box width={'100%'} backgroundColor={theme.palette.background.alt} p="1rem 6%" textAlign={'center'} sx={{boxShadow: 3, mb: 1}}>
      <Typography variant="h1" color={"primary"} fontWeight="bold">
          AI GPT3 Clone
      </Typography>
      <NavLink to="/" p={1}></NavLink>
      <NavLink to="/register" p={1}></NavLink>
          <NavLink to="/login" p={1}></NavLink>
      {/* {isAuthenticated ? (
          <NavLink to="/" p={1}></NavLink>
      ) : (
        <>
          <NavLink to="/register" p={1}>Signup</NavLink>
          <NavLink to="/login" p={1}>Signin</NavLink>
        </>
      )} */}
    </Box>
  )
}

export default Navbar