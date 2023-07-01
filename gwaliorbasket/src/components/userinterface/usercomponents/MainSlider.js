import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React,{createRef} from "react";
import Slider from "react-slick";
import {ServerURL, getData} from '../../services/ServerServices'
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; 
import { useEffect,useState } from "react"; 
export default function MainSlider(){
  const [images,setImages]=useState([])
  const theme = useTheme();
  const fetchtBannerImages=async()=>{
    var result=await getData('userinterface/fetch_banner_images')
    var dataImages=result.data[0].bannerpicture
    var im=dataImages.substring(0,dataImages.length-1).split(',')
    setImages(im)
    
  }
  useEffect(function(){
    fetchtBannerImages()
  },[])
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:5000,
        autoplaySpeed: 5000,
        arrow: false,
      };
      
      var slider=createRef()
      function playImages(){
        return images.map((item)=>{
            return(<div><img src={`${ServerURL}/images/${item}`} style={{width:'100%'}}/></div>)
        })
      }
      function handleLeftClick(){
        slider.current.slickPrev()
      }
      function handleRightClick(){
        slider.current.slickNext()
      }
    return(<div>
      <div style={{position:'relative'}}>
        {matches?<></>:
        <div style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:'40%',left:'1%',zIndex:1,display:'flex',alignItems:'center',opacity:0.7}}>
        <KeyboardArrowLeftIcon  onClick={handleLeftClick} style={{fontSize:34}}/>
        </div>
        }
        <Slider ref={slider}  {...settings}>
            {playImages()}
        </Slider>
        {matches?<></>:
        <div  style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:'40%',right:'1%',zIndex:1,display:'flex',alignItems:'center',opacity:0.7}}>
        <KeyboardArrowRightIcon  onClick={handleRightClick}  style={{fontSize:34}}/>
        </div>
        }
        </div>
    </div>)
}