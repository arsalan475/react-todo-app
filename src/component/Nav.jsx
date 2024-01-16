import { Link, useParams } from "react-router-dom"
import MainBtn from "./MainBtn"
import { useState } from "react"
import SpecialLogOutBtn from "./SpecialLogOutBtn"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Nav({location,setLocation}) {

  

console.log(location)
 
  return (<>
    

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to='/'>HOME</Link>
          </Typography>
          {location === '/register' ? <MainBtn btnName={'LogIn'} linkName={'login'} />
          : location === '/login' ? <MainBtn btnName={'Register'} linkName={'register'} /> : location === '/todoApp' ? <SpecialLogOutBtn/> : <MainBtn btnName={'Register'} linkName={'register'} />}
        </Toolbar>
      </AppBar>
    </Box>
 


    
    </>
  )
}

export default Nav



