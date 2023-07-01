import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React,{createRef} from "react";
import { ServerURL ,getData} from "../../services/ServerServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; 
import { Button, Paper,useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles'
import { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function TrendingProduct(){
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [trendingProduct,setTrendingProduct]=useState([])

  const navigate=useNavigate();
    const fetch_all_productsdeals=async()=>{
      var result= await getData('userinterface/fetch_all_trendingproducts')
      setTrendingProduct(result.data)
    }
    useEffect(function(){
      fetch_all_productsdeals()
    },[])
    const handleClick=(productid)=>{
      navigate(`/AllCategory`,{state:{productid:productid,page:"trending"}})
    }
    var slider=createRef()

    
  

    function playImages(){
        return trendingProduct.map((item)=>{
        return(<div >

            <Paper onClick={()=>handleClick(item.productid)} elevation={3} style={{width: 180, height: 240,margin:10}}>
               <div style={{padding:10}}>
                <div style={{display:'flex',justifyContent:'center',width:160,marginBottom:8}}><img src={`${ServerURL}/images/${item.image}` } style={{width:75,height:75}} /></div>
                <div style={{fontSize:14,fontWeight:'bolder',fontFamily:'Poppins',marginBottom:10}}>{item.productname.substring(0,18)+'...'}</div>
                <div style={{fontSize:14,fontWeight:'bolder',fontFamily:'Poppins',color:'#4cd137',marginBottom:'15%'}}>Get Best Deals</div>
                
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:160}}>
               <div>
               
                <div style={{fontSize:13,fontFamily:'Poppins',color:'#888'}}>Hurry Limited Stock</div>

                </div >
                <Button variant="outlined" style={{borderColor:'red',color:'red',width:70,height:30}}>ADD</Button>
                </div>
                </div>
            </Paper>

            </div>)})
    }
        var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:7,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:5000,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1320,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
    
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
    
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      
      };
      const handleLeftClick=()=>{
        slider.current.slickPrev()
      }
      const handleRightClick=()=>{
        slider.current.slickNext()
      }
    return(<div>
      <div style={{fontFamily:'Poppins',fontSize:20,fontWeight:'bolder'}}>Trending Products</div>
     <div style={{position:'relative'}}>
        
        <div style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:'40%',left:'1%',zIndex:1,display:'flex',alignItems:'center',opacity:0.7}}>
        <KeyboardArrowLeftIcon  onClick={handleLeftClick} style={{fontSize:34}}/>
        </div>
     <Slider ref={slider}  {...settings}>
            {playImages()}
     </Slider>
     
        <div  style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:'40%',right:'1%',zIndex:1,display:'flex',alignItems:'center',opacity:0.7}}>
        <KeyboardArrowRightIcon  onClick={handleRightClick}  style={{fontSize:34}}/>
        </div>
        </div>
    </div>)
}