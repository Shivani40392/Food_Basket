import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React,{createRef} from "react";
import Slider from "react-slick";
import { ServerURL } from "../../services/ServerServices";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';  
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
export default function DealsSlider(){
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:false,
        autoplaySpeed:5000
      };
      var images=['d1.webp','d2.webp','d3.webp','d4.webp','d5.webp','d6.webp','d7.webp']
      var slider=createRef()
      function playImages(){
        return images.map((item)=>{
            return(<div><img src={`${ServerURL}/images/${item}`} style={{width:'99%'}}/></div>)
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
        </div>}
        <Slider ref={slider}  {...settings}>
            {playImages()}
        </Slider>
        {matches?<></>:
        <div  style={{width:36,height:36,borderRadius:18,background:'#FFF',position:'absolute',top:'40%',right:'1%',zIndex:1,display:'flex',alignItems:'center',opacity:0.7}}>
        <KeyboardArrowRightIcon  onClick={handleRightClick}  style={{fontSize:34}}/>
        </div>}
        </div>
    </div>)
}