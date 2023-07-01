import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React,{createRef} from "react";
import Slider from "react-slick";
import {ServerURL,postData} from '../../services/ServerServices'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';  
import Header from "../usercomponents/Header";
import { display } from "@mui/system";
import { Button, Slide,Grid } from "@mui/material";
import Footer2 from "../usercomponents/Footer2";
import Spacer from "../usercomponents/Spacer";
import { useMediaQuery } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
export default function ProductDetail(){
    const theme = useTheme();
    const dispatch=useDispatch()
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const location=useLocation()
    const navigate=useNavigate()
    const [refresh,setRefresh]=useState(false)
    const [productList,setProductList]=useState([])
    
    
  
   
    var data=JSON.parse(location.state.data)
    var images=data.images.substring(0,data.images.length-1).split(',')
        var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:5000
      };
      
      
      const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/home" >
          HOME
        </Link>,
        <Link
          underline="hover"
          key="2"
          color="inherit"
          href="/"
        
        >
          CATEGORY
        </Link>,
        <Typography key="3" color="text.primary" sx={{ fontSize:xs?7:sm?8:md?8:lg?11:10}}>
          PRODUCT
        </Typography>,
      ];
    
    
      const fetch_all_productlist=async()=>{
        var result= await postData('userinterface/fetch_all_product_list',{productid:data.productid})
        setProductList(result.data)
        
       
       } 
     useEffect(function(){
       fetch_all_productlist()
       
     },[]) 
     
      var slider=createRef()
      function playImages(){
        return images.map((item)=>{
            return(<div ><img src={`${ServerURL}/images/${item}`} style={{width:'99%',height:sm?250:300,borderRadius:20}}/></div>)
        })
      }
      function handleLeftClick(){
        slider.current.slickPrev()
      }
      function handleRightClick(){
        slider.current.slickNext()
      }
     const handleClick=(item)=>{
      item['qty']=1
        dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
        setRefresh(!refresh)
      
        
      }
function list(){
  return productList.map((item)=>{ 
    return(<div>
     

    <div style={{borderTopLeftRadius:10 ,borderTopRightRadius:10,height:3,backgroundColor:'#18dcff',fontSize:xs?15:sm?16:md?16:16,fontWeight:600,borderColor:'#dfe4ea',borderWidth:1,borderStyle:'solid',padding:10,display:'flex',alignItems:'center',justifyContent:'center'}}>
    
    AVAILABLE
    
    </div>
    <div style={{borderBottomLeftRadius:10 ,borderBottomRightRadius:10,borderColor:'#dfe4ea',borderWidth:1,borderStyle:'solid',padding:10,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}}>
    <div >
    <div style={{marginBottom:2,fontSize:xs?15:sm?16:md?17:17,fontWeight:'bold'}}>{item.weight} {item.pricetypename}</div>
    <div style={{display:'flex',flexDirection:'row'}}>
    <div style={{fontWeight:'bold',marginRight:'4%'}}>&#8377;{item.offerprice}</div>
    <div style={{marginRight:'10%'}}><s>&#8377;{item.price}</s></div>
    
    <div  style={{marginLeft:'2%',backgroundColor:'#18dcff',width:80,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
    <div style={{fontSize:xs?10:sm?10:md?10:lg?13:13,fontWeight:550}}>
    {(((item.price-item.offerprice)/item.price)*100)}%  off
    </div>  
    </div>
    </div>
    
    </div>
    
    <div> <Button  variant="contained" style={{backgroundColor:'#18dcff',width:70,height:30}} onClick={()=>handleClick(item)}>ADD</Button></div>
    </div>
    </div>
    )
  })
}
    
      
  function showProduct(){
      return(<div >
<Grid container spacing={10} style={{display:'flex',flexDirection:md?'column':'row'}}>

<Grid item xs={md?12:6}  >


<div style={{width:sm?430:md?600:700,overflow:'scroll'}}>


<div style={{width:sm?330:md?450:600,height:sm?250:md?350:350,borderRadius:10,borderColor:'#dfe4ea',borderWidth:1,borderStyle:'solid',marginTop:35,marginLeft:'8%',marginRight:20,marginBottom:'3%',padding:15}}>

<div style={{position:'relative'}}>
<div style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:150,left:7,zIndex:1,display:'flex',alignItems:'center',opacity:0.9 , boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
<KeyboardArrowLeftIcon  onClick={handleLeftClick} style={{fontSize:34}}/>
</div>
<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<div style={{width:md?300:400}}>

<div>
<Slider ref={slider}  {...settings} >

  {playImages()}
</Slider>
</div>


</div>
<div  style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:150,right:7,zIndex:1,display:'flex',alignItems:'center',opacity:0.9, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
<KeyboardArrowRightIcon  onClick={handleRightClick}  style={{fontSize:34}}/>
</div>

</div>

</div>
</div>



<div style={{display:'flex',flexDirection:'column',width:sm?390:md?600:650,marginLeft:'8%',fontFamily:'Poppins',fontSize:xs?10:sm?13:md?13:lg?15:15,flexWrap:'wrap'}}>
 
<div style={{fontWeight:600,marginBottom:8,marginLeft:18}}>About Product</div>

<ul style={{color:'#95a5a6'}}>
<li >
Description : {data.description}
</li>
<li  >
Country of Origin : India
</li>
<li >
Shelf Life : 180 days
</li>
<li  >
Ingredients : Tepary Beans Flour (43%), Vegetable Oil (Cotton Seed, Corn & Palmolein), Chickpeas Flour (12%), Salt, Black Pepper Powder, Ginger Powder, Clove Powder and Cardamom Powder.
</li>
<li  >
Manufacturer Name : Haldiram Snacks Pvt Ltd
</li>
<li>
Manufacturer Address : Haldiram Snacks Pvt Ltd, 20 Km Stone, Vill. Gumthala, Bhandara Road, Nagpur - 441104 (M.S.).
</li>
</ul>


</div>
</div>
</Grid>

<Grid item xs={md?12:6} >
<div style={{marginTop:30,marginLeft:"4%",fontFamily:'Poppins',width:'89%'}}>

<div  >  
<Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontSize:xs?7:sm?8:md?8:lg?11:10}}>
        {breadcrumbs}
 </Breadcrumbs>
</div>
<div style={{fontSize:xs?15:sm?17:md?20:lg?20:20,fontWeight:'bold',marginBottom:10}}>  
{data.productname}
</div>
{data.weight} {data.pricetypename}
<div >  
 
</div>

<div style={{marginTop:15,display:"flex",flexDirection:'row'}}>
<div style={{fontWeight:'bold',marginRight:'3%',fontSize:xs?15:sm?17:md?20:lg?20:20,}}>&#8377;{data.offerprice}</div>
<div style={{fontWeight:500,fontSize:xs?13:sm?15:md?18:lg?17:17,}}><s>&#8377;{data.price}</s> </div>

<div  style={{marginLeft:'2%',backgroundColor:'#18dcff',width:'13%',borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
<div style={{fontSize:xs?10:sm?10:md?10:lg?13:13,fontWeight:550}}>
{(((data.price-data.offerprice)/data.price)*100)}%  off
</div>  
</div>
</div>

<hr color="#dfe4ea" />

<div style={{marginTop:'5%',fontSize:xs?15:sm?16:md?18:18,fontWeight:'bold',marginBottom:15}}>
Select the Quantity

</div>

{list()}




</div>
</Grid>

</Grid>

      </div>)
    }  
      
      
    return(<div >
        
        <Header/>
        <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',margin:10}}>
        <div style={{width:'90%'}}>
       {showProduct()}
       <Spacer/>
       <Spacer/>
       
       <Footer2 />
       </div></div>
        
        
    </div>)
    
}