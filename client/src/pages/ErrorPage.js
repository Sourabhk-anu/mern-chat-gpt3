import React from 'react'
import {Typography} from '@mui/material'
import {NavLink} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
        <Typography variant="h1" display={"flex"} alignItems={"center"} justifyContent={'center'} fontWeight={"bold"}>
            Error
        </Typography>
        <Typography variant="h2" display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'center'} textDecoration={"none"}>
            404 Page Not Found | Refresh The Page
            <NavLink to="/login">First login the page</NavLink>
        </Typography>
    </>
  )
}

export default ErrorPage