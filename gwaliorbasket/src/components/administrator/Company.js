import React, { useState } from "react";
import { Select,MenuItem  ,Avatar,TextField, Button, Grid, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useStyles } from "./CompanyCss";
import { getData } from "../services/ServerServices";
import { useEffect } from "react";
import { postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import { SettingsEthernet } from "@mui/icons-material";

export default function Company(props) {
  const [showPassword, setShowPassword] =useState(false);
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [compnayName,setCompanyName]=useState('')
  const [ownerName,setOwnerName]=useState('')
  const [mobileNumber,setMobileNumber]=useState('')
  const [emailAddress,setEmailAddress]=useState('')
  const [address,setAddress]=useState('')
  const [password,setPassword]=useState('')
  const [states,setStates]=useState([])
  const [cities,setCities]=useState([])
  const [error,setError]=useState({})
  

  const [companylogo,setCompanylogo]=useState({filename:'./assets/watermarkimage.png',bytes:''})
  var classes = useStyles()
  var navigate=useNavigate()
 
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const fetchAllStates=async()=>{
    var result=await getData('statecity/fetch_all_states')
   
    setStates(result.data)
  }
  const fetchALLcities=async(stateid)=>{
   var body={'stateid':stateid}
    var result=await postData('statecity/fetch_all_cities',body)
     setCities(result.data)
  }
  const handleStateChange=(event)=>{
    setState(event.target.value)
    fetchALLcities(event.target.value)
  }
  const handleCityChange=(event)=>{
    setCity(event.target.value)
    
  }
  const fillAllStates=()=>{
  
     return states.map((item)=>{
     return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
     
     })
  }
  const fillAllcities=()=>{
  
    return cities.map((item)=>{
    return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
    
    })
 }
 const handleClick=(event)=>{
  setCompanylogo({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
 }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    
  };
  useEffect(function(){
    fetchAllStates()
  },[])
  const clearValue=()=>{
    setCompanyName('')
    setOwnerName('')
    setEmailAddress('')
    setMobileNumber('')
    setAddress('')
    setCity('Choose City...')
    setState('Choose State..')
    setCompanylogo({filename:'./assets/watermarkimage.png',bytes:''})
    setPassword('')
  }
const handleClickform=async()=>{
  if(validation()){
  var cd=new Date()
  var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
 var formData=new FormData()
 formData.append('companyname',compnayName)
 formData.append('ownername',ownerName)
 formData.append('emailaddress',emailAddress)
 formData.append('mobilenumber',mobileNumber)
 formData.append('address',address)
 formData.append('state',state)
 formData.append('city',city)
 formData.append('password',password)
 formData.append('logo',companylogo.bytes)
 formData.append('createdat',dd)
 formData.append('updatedat',dd)
 formData.append('createdby','ADMIN')
 formData.append('status','Pending')
 var result= await postData('company/add_new_company',formData)

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
}
const handleError=(inputs,value)=>{
  setError(prev=>({...prev,[inputs]:value}))

}
const validation=()=>{
  var isValid=true
  if(!compnayName){
    handleError("compnayName","Invalid Company Name")
    isValid=false
  }
  if(!ownerName)
  {
    handleError("ownerName","Invalid Owner Name")
    isValid=false
  }
  if(!emailAddress || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)) )
  {
    handleError("emailAddress","Invaild Email Address")
     isValid=false
  }
  if(!mobileNumber || !(/^[0-9]{10}$/.test(mobileNumber))){
    handleError("mobileNumber","Invaild Mobile Number")
    isValid=false
  }
  if(!address){
    handleError("address","Invaild Address")
    isValid=false
  }
  if(!state || (state=='Choose State..'))
  {
    handleError("state","Select State")
    isValid=false
  }
   if(!city || (city=='Choose City...'))
  {
    handleError("city","Select City")
    isValid=false
  }
  if(!password)
  {
    handleError('password',"Invaild Password")
    isValid=false
  }
  return isValid
}
  return (
    <div className={classes.maincontainer}>
      <div className={classes.box}>
        <Grid container spacing={2} >
        <Grid item xs={12}  className={classes.rowStyle1}>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div><img src="./assets/foodbasket.png" width="40"/></div>
            <div className={classes.headingStyle}>
              Company Registration
            </div>
            </div>
            <div>
              <FormatListBulletedIcon onClick={()=>navigate('/displayallcompanies')}/>
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField error={!error.compnayName?false:true} helperText={error.compnayName} onFocus={()=>handleError("compnayName",null)} value={compnayName}fullWidth onChange={(event)=>setCompanyName(event.target.value)} label='Company name' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField error={!error.ownerName?false:true} helperText={error.ownerName} onFocus={()=>handleError("ownerName",null)} value={ownerName} fullWidth  onChange={(event)=>setOwnerName(event.target.value)}  label='Owner name' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField error={!error.emailAddress?false:true} helperText={error.emailAddress} onFocus={()=>handleError("emailAddress",null)} value={emailAddress} fullWidth  onChange={(event)=>setEmailAddress(event.target.value)}  label='Email Address' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField error={!error.mobileNumber?false:true} helperText={error.mobileNumber} onFocus={()=>handleError('mobileNumber',null)} value={mobileNumber} fullWidth  onChange={(event)=>setMobileNumber(event.target.value)} label='Mobile number' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <TextField error={!error.address?false:true} helperText={error.address} onFocus={()=>handleError('address',null)} value={address} fullWidth  onChange={(event)=>setAddress(event.target.value)} label='Address' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="State"
          onChange={handleStateChange}
          onFocus={()=>handleError('state',null)}
          
          error={!error.state?false:true}
        >
          <MenuItem value={'Choose State..'}>Choose State..</MenuItem>
          {fillAllStates()}
         
        </Select>
         <div style={{fontSize:12,color:'red',padding:5}}>{error.state}</div>
      </FormControl>
            
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
         onChange={handleCityChange}
         onFocus={()=>handleError('city',null)}
         error={!error.state?false:true}
        >
          <MenuItem value={'Choose City...'}>Choose City...</MenuItem>
          {fillAllcities()}
         
        </Select>
         <div style={{fontSize:12,color:'red',padding:5}}>{error.city}</div>
        </FormControl>
          </Grid>
          <Grid  item xs={6} className={classes.rowStyle}>
            <IconButton  fullWidth color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={handleClick}/>
              <PhotoCamera />
            </IconButton>
            <Avatar
           alt="Remy Sharp"
           variant="rounded"
          src={companylogo.filename}
         sx={{ width: 56, height: 56 }}
          />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
               onChange={(event)=>setPassword(event.target.value)}
                id="outlined-adornment-password"
               value={password}
                type={showPassword ? 'text' : 'password'}
                onFocus={()=>handleError('password',null)}
                error={!error.password?false:true}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <div style={{fontSize:12,color:'red',padding:5}}>{error.password}</div>
            </FormControl>
            
          </Grid>
          <Grid item xs={6}>
              <Button onClick={handleClickform} fullWidth variant="contained">Submit</Button>
            </Grid>
            <Grid item xs={6}> 
            <Button  onClick={clearValue} fullWidth variant="contained">Reset</Button>
            </Grid>

        </Grid>
      </div>
    </div>
  )
}