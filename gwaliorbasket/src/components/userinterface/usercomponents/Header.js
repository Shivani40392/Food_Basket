import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Paper, TextField,useMediaQuery } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import HomePageDrawer from './HomePageDrawer';
import { useLocation } from 'react-router-dom';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { Selector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Header() {

  const theme = useTheme();
  const location=useLocation()
  const navigate=useNavigate()
  console.log(location)
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [open,setOpen]=useState(false)
  const [otp,setOtp]=useState(false)
  const [openDrawer,setOpenDrawer]=useState(false)
  const product=useSelector((state)=>state.cart)
  const productRecord=Object.keys(product)
  const handleOpenDrawer=()=>{
    setOpenDrawer(true)
  }
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
 
  return (
     <div>

      <AppBar position="static" style={{background:'rgba(93,9,121,1)',display:'flex',height:50,justifyContent:'center'}}>
        <div style={{marginLeft:10,display:'flex',alignItems:'center'}}>
        {matches?<MenuIcon onClick={handleOpenDrawer}/>:<></>}
        <div style={{marginLeft:30,display:'flex',alignItems:'center'}}>
         <LocationOnIcon/>
         <span style={{color:'#fff',fontFamily:'Poppins',fontWeight:'bold',marginLeft:5}}>Gwalior</span>
         </div>
         <div style={{width:!matches?250:60,fontFamily:'Poppins',fontWeight:500,marginLeft:'auto',display:'flex',justifyContent:'space-between',padding:20}}>
            {!matches?<>
            <span>Offers</span>
            <span>Deals</span>
            <span>Coupons</span>
            <span><Badge badgeContent={productRecord.length} color="secondary">
            <ShoppingCartIcon onClick={()=>navigate('/cart')}/>
             </Badge></span>
            <span><PersonIcon/></span></>:
            <>
            <span><ShoppingCartIcon/></span>
            <span><PersonIcon/></span></>
            }
         </div>
         </div>
      </AppBar>
      {location.pathname==='/home'?
      <div>
        <Paper style={{width:'100%',height:70,display:'flex',alignItems:'center',justifyContent:'left'}} elevation={1}> 
        <img src='/assets/target logo.png'style={{width:43,height:43,marginLeft:50}}/>
        <div style={{display:'flex',justifyContent:'space-between',width:500,marginLeft:30}} >
            <Button style={{color:'rgba(93,9,121,1)',fontWeight:600}}>Category</Button>
            <Button style={{color:'rgba(93,9,121,1)',fontWeight:600}}>Deals</Button>
            <Button style={{color:'rgba(93,9,121,1)',fontWeight:600}}>What's New</Button>
            <Button style={{color:'rgba(93,9,121,1)',fontWeight:600}}>Trending</Button>
        </div>
      
        </Paper>
        
      </div>
      :<></>}
      <HomePageDrawer open={openDrawer} setOpen={setOpenDrawer} />
      </div>
  );
}