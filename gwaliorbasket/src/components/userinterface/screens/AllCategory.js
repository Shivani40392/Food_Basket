import {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Header from '../usercomponents/Header';
import Spacer from '../usercomponents/Spacer';
import { Box } from "@mui/system";
import { Grid,useMediaQuery} from '@mui/material';
import { ServerURL, getData,postData } from '../../services/ServerServices';
import { useTheme } from '@mui/material/styles'
import { Button } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function AllCategory() {
  const theme=useTheme()
  const location=useLocation()
  console.log(location)
  const dispatch=useDispatch()
  const [tabIdx,settabIdx]=useState(location.state.key)
  const [product,setProduct]=useState([])
  const [categoryId,setCategoryId]=useState(location.state.categoryid)
  const [productID,setProductId]=useState(location.state.productid)
  const [category,setCategory]=useState([])
  const [refresh,setRefresh]=useState(false)
  const matches = useMediaQuery("(max-width:600px)");
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

 var nagivate=useNavigate()
  
  const fetch_all_category=async()=>{
   var result= await getData('userinterface/fetch_all_category')
   setCategory(result.data)
  

  } 
  const fetch_all_product=async()=>{
    var result= await postData('userinterface/fetch_all_product',{categoryid:categoryId})
    setProduct(result.data)
   } 
   const fetch_all_productlist=async()=>{
    var result= await postData('userinterface/fetch_all_productlist_by_trending',{productid:productID})
    setProduct(result.data)
    
   }   
  useEffect(function(){
      fetch_all_category()
  },[])
  useEffect(function(){
    if(location.state.page==="explore")
    fetch_all_product()
    else
    fetch_all_productlist()
},[categoryId,productID])
  function displaySideCategory(){ 
    return category.map((item,i)=>{
    return (
    <Box 
    onClick={()=>{
      settabIdx(i)
      setCategoryId(item.categoryid)
}}
    style={{cursor:'pointer'}}
    key={i}
    bgcolor={tabIdx == i && "#f7e4ff"}
    
   >
      <Box display='flex' fontFamily="Poppins"  alignItems="center" textAlign={matches?'center':'left'} flexDirection={matches?'column':'row'}  fontSize={matches ? 13 : 15} p={1.5}  >
       
      <Avatar alt="Logo" src={`${ServerURL}/images/${item.icon}`} variant='circular' sx={{height:50,width:50,bgcolor:'#f1e7fe',marginRight:3}}  />
      <p style={{fontWeight:600,marginRight:matches?'15%':0}}>{item.category}</p>
  
      </Box>
   
    </Box>
  )
  })
}
    
const handleClick=(e,item)=>{
  e.stopPropagation(); 
  item['qty']=1
  dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
  setRefresh(!refresh)
  
}
const handleClickProduct=(item)=>{

  nagivate('/product',{state:{data:JSON.stringify(item)}})
}
  function showProducts(){
    return product.map((item,i)=>{
    return(
      <div  onClick={()=>handleClickProduct(item)} style={{borderRadius:5,borderColor:'#ced4d6',borderWidth:1,borderStyle:'solid',width:matches?'41%':'14%',height:matches?'40%':'38%',
        padding: "10px 10px 10px 10px"}}>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column'}}>
        <img src={`${ServerURL}/images/${item.image}`} style={{width:'60%',height:"50%"}}/>
        </div>
        <div style={{fontFamily:'Poppins', fontSize:xs?6:sm?13:md?16:lg?18:18, fontWeight: "bolder",
              textAlign: "center",marginTop:2,height:'20%'}}>{item.productname.substring(0,15)+'...'}</div>
      <div style={{fontFamily:'Poppins', fontSize:xs?6:sm?12:md?13:lg?14:14, 
             marginTop:'1%',color:'#888'}}>{item.weight}{item.pricetypename}</div>
       <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:'18%'}}>
        <div >
               
        <div style={{fontSize:xs?6:sm?11:md?12:lg?14:14,fontFamily:'Poppins',color:'#888'}}><s>&#8377;{item.price}</s></div>
        <div style={{fontSize:xs?6:sm?11:md?12:lg?14:14,fontFamily:'Poppins',fontWeight:'bolder'}}>&#8377;{item.offerprice}</div>
        </div >
        <Button onClick={(e)=>handleClick(e,item)}variant="outlined" style={{borderColor:'red',color:'red',width:70,height:30}} >ADD</Button>
        </div>
       
              
      </div>

    )
  })

  }
 
  return(<div>
    <Header/>
    <Spacer/>
   <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
   <Grid container spacing={2}  maxWidth={1400}  >
    <Grid item position='sticky'  xs={matches?4:2}  my={1} borderRight="1px solid #ced4d6" top={0} overflow="auto" maxHeight='90vh' >
   {displaySideCategory()}
    </Grid>
    <Grid item xs={matches?8:10}  my={1}  overflow={"auto"} maxHeight='90vh' >
      <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap: '10px'}}>
    {showProducts()}
    </div>
    </Grid>
    </Grid> 
   </div>
  </div>)
}