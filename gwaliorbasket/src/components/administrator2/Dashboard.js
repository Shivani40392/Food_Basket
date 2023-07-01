import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid, Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import DisplayAllCategories from './DisplayAllCategories'
import Category from './Catergory';
import { json, Route,Routes } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import Products from './Products';
import DisplayAllProducts from './DisplayAllProducts';
import DisplayAllproductList from './DisplayAllproductLIst';
import ProductList from './ProductList';
import { ServerURL } from '../services/ServerServices';
import Banner from './Banner';
export default function Dashboard(){
    var navigate=useNavigate()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
   
    return(
        
      
        <div>
        
      <AppBar position="static" style={{background:'#000'}}>
        <Toolbar variant="dense">
          <IconButton edge="start" style={{color:'#fff'}} aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            <span style={{color:'#fff'}}></span>Gwalior Basket
          </Typography>
        </Toolbar>
      </AppBar>
   
   
    <Grid container spacing={3}>
    <Grid item xs={2}>
    <div style={{display:'flex' ,flexDirection:'column'}}>
        <img src={`${ServerURL}/images/${admin.logo}`} style={{width:80,margin:30,borderRadius:40}}/>
        <Paper  style={{width:220,height:70,background:'#dfe6e9',margin:20,display:'flex',alignItems:'center',justifyContent:'space-between'}} elevation={1} >
        <img src='../assets/admin.jpg' style={{marginLeft:10 ,width:50,borderRadius:25}}/>
        <span style={{fontWeight:'bold',fontFamily:'Poppins',marginRight:30}}>{admin.ownername}</span>
        </Paper>
        {/* List */}
        <div style={{width:220,margin:20}}>
        <List component="nav" >
        <ListItemButton
         
         onClick={() =>navigate('/dashboard/displayallcategories')}
        >
          <ListItemIcon>
            <CategoryIcon/>
          </ListItemIcon>
          <ListItemText primary={<span style={{fontFamily:'Poppins',letterSpacing:1,fontWeight:500}}> Category</span>} />
        </ListItemButton>
       
       
        <ListItemButton
         
         onClick={() => navigate('/dashboard/displayallproducts')}
        >
          <ListItemIcon>
            <AddShoppingCartIcon/>
          </ListItemIcon>
          <ListItemText primary={<span style={{fontFamily:'Poppins',letterSpacing:1,fontWeight:500}}>Products</span>} />
        </ListItemButton>
        <ListItemButton
         
          onClick={() =>navigate('/dashboard/displayallproductlist') }
        >
          <ListItemIcon>
            <AddPhotoAlternateIcon/>
          </ListItemIcon>
          <ListItemText primary={<span style={{fontFamily:'Poppins',letterSpacing:1,fontWeight:500}}>Add Pictures</span>} />
        </ListItemButton>

        <ListItemButton
         
          onClick={() =>navigate('/dashboard/banner') }
        >
          <ListItemIcon>
            <AddPhotoAlternateIcon/>
          </ListItemIcon>
          <ListItemText primary={<span style={{fontFamily:'Poppins',letterSpacing:1,fontWeight:500}}>Banner</span>} />
        </ListItemButton>
        
        <Divider/>
        <ListItemButton
         
        //  onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <ListItemText primary={<span style={{fontFamily:'Poppins',letterSpacing:1,fontWeight:500}}>Logout</span>} />
        </ListItemButton>
        </List>
       
        </div>
    </div>
    </Grid>
        <Grid item xs={10}>
          <Routes>
          <Route element={<DisplayAllCategories/>} path={"/displayallcategories"}/>
          <Route element={<Category/>} path={"/category"}/>
          <Route element={<Products />} path={"/products"}/>
          <Route element={<DisplayAllProducts/>} path={"/displayallproducts"}/>
          <Route element={<DisplayAllproductList/>} path={"/displayallproductlist"}/>
          <Route element={<ProductList/>} path={"/productlist"}/>
          <Route element={<Banner/>} path={"/banner"}/>
          </Routes>
        </Grid>
        </Grid>

  
        </div>
        
    )
}