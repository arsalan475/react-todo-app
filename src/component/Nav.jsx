import { Link, useParams } from "react-router-dom"
import MainBtn from "./MainBtn"
import { useState,useContext } from "react"
import SpecialLogOutBtn from "./SpecialLogOutBtn"
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import UserContext from "../Context/Context";

function Nav({location,setLocation}) {

  

const {isUser} = useContext(UserContext)
  function handleClick() {
    setLocation(window.location.pathname)
  }

  return (<>
   

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleClick}>
          <Link  to='/'>HOME</Link>
          </Typography>


          
          {isUser ? <SpecialLogOutBtn/> :  <MainBtn setLocation={setLocation} location={location} btnName={'Register'} linkName={'register'}/>}
          
        </Toolbar>
      </AppBar>
    </Box>
 


    
    </>
  )
}

export default Nav



