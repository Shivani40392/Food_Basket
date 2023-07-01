import { TextField,Grid,Button,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio } from "@mui/material";
import { useStyles } from "./BannerCSS";
import { DropzoneArea } from "react-mui-dropzone";
import { postData} from "../services/ServerServices";
import { useState} from "react";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {  useNavigate } from "react-router-dom";

export default function Banner(){
   var classes=useStyles()
   var navigate=useNavigate() 
  
   var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [companyid,setCompanyid]=useState()
  
   const [error,setError]=useState({})
   const [images,setImages]=useState([])
   const [status,setStatus]=useState()
  
   const handleClick=(files)=>{
     setImages(files)
   }
   var clearValue=()=>{
      setCompanyid('')
     
     
   }
   const handleClickform=async()=>{
     
      var cd=new Date()
      var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
     var formData=new FormData()
    
     formData.append('companyid',admin.companyid)
    
     formData.append('images',images)
     formData.append('status',status)
    

     images.map((item,i)=>{
      formData.append('Picture'+i,item)
     })
      var result=await postData('banner/add_bannerimages',formData) 
      if(result.status){
  
         Swal.fire({
           icon: 'success',
           title: result.message,
          
         })
         
        }
        else
        {
         Swal.fire({
           icon: 'error',
           title: result.message,
          
         })
        }
        clearValue()
      
      }
      const handleStatus=(event)=>{
        setStatus(event.target.value)
      }
   
  
 return(<div className={classes.maincontainer}>
   <div className={classes.box}>
    <Grid container spacing={2}>
    <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
    <div style={{display:'flex',flexDirection:'row'}}>
            <div><img src="./assets/foodbasket.png" width="40"/></div>
            <div className={classes.headingStyle}>
              Banner Images
            </div>
   </div>
         
    </Grid>
    <Grid item xs={2}>
    <TextField  value={admin.companyid} onChange={(event)=>setCompanyid(event.target.value)}fullWidth label="CompanyId" variant="outlined" />
    </Grid>
   
    <Grid  item xs={12} >
           
          <DropzoneArea
      acceptedFiles={['image/*']}
       dropzoneText={"Drag and drop an image here or click"}
     onChange={(files) => handleClick( files)}
    
     filesLimit={10}
     />
          </Grid>
    <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" style={{display:'flex',justifyContent:'center'}}>Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onClick={handleStatus}
        value={status}
       
      
      >
        <FormControlLabel  value="true" control={<Radio />} label="True" />
        <FormControlLabel  value="false" control={<Radio />} label="false" />
      
      </RadioGroup>
      <div style={{fontSize:12,color:'red',padding:5}}>{error.deals}</div>
      </FormControl>
    </Grid>
       
    <Grid item xs={6}>
     <Button onClick={handleClickform} fullWidth variant="contained">Submit</Button>
    </Grid>
    <Grid item xs={6}>
     <Button onClick={clearValue} fullWidth variant="contained">Reset</Button>
    </Grid>
    </Grid>
    </div>
 </div>)
}