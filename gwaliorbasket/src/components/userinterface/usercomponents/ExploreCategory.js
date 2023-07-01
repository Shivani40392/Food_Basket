import { ServerURL,getData } from "../../services/ServerServices"
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from "@mui/material"
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function ExploreCategory(){
    
    const [category,setCategory]=useState([])
    const theme = useTheme();
    const navigate=useNavigate();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const fetch_all_categories=async()=>{
      var result= await getData('userinterface/fetch_all_category')
      setCategory(result.data)
    }
    useEffect(function(){
      fetch_all_categories()
    },[])
    const handleClick=(categoryid,i)=>{
      navigate(`/AllCategory`,{state:{categoryid:categoryid,key:i,page:'explore'}})
    }
    function explorecategory(){
      return category.map((item,i)=>{
        return(<div onClick={()=>handleClick(item.categoryid,i)} style={{width:'10%',background:'#f7eaf9',borderRadius:'10%',margin:3,display:'flex',alignItems:'center',flexDirection:'column',padding:3}}>
          <div style={{textAlign:'center',fontSize:xs?4:sm?6:md?8:lg?16:16,color:'#792c85',fontFamily:'Poppins',fontWeight:'bolder',marginTop:'5%'}}>{item.category}</div>
          <img src={`${ServerURL}/images/${item.icon}`} width='100%' height='70%'/></div>)
      })
    }
    return(<div>
        <div style={{fontFamily:'Poppins',fontSize:20,fontWeight:'bolder'}}>Explore Category</div>
    <div style={{padding:10,display:'flex',flexDirection:'row',flexWrap:'wrap'}} >
        {explorecategory()}</div></div>)
}