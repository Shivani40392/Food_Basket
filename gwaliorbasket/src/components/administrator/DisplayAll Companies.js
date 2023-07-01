import { useState,useEffect } from 'react';
import MaterialTable from "@material-table/core";
import { Avatar ,Button,Dialog,DialogActions,DialogContent,DialogTitle,
  Select,MenuItem ,TextField, Grid, FormControl, InputLabel,Switch} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { getData,ServerURL,postData } from "../services/ServerServices";
import { useStyles } from "./DisplayAllCompaniesCSS";
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function DisplayAllCompanies(props)
{  var classes=useStyles()
  var navigate=useNavigate()
    const [company,setCompany]=useState([])
    const [open,setOpen]=useState()
    const [companyid,setCompanyid]=useState('')
      const [state,setState]=useState('')
      const [status,setStatus]=useState('')
      const [city,setCity]=useState('')
      const [compnayName,setCompanyName]=useState('')
      const [ownerName,setOwnerName]=useState('')
      const [mobileNumber,setMobileNumber]=useState('')
      const [emailAddress,setEmailAddress]=useState('')
      const [address,setAddress]=useState('')
     const [states,setStates]=useState([])
      const [cities,setCities]=useState([])
      const [companylogo,setCompanylogo]=useState({filename:'./assets/watermarkimage.png',bytes:''})
     const [btnStatus,setBtnStatus]=useState(false)
     const [oldPicture,setOldPicture]=useState()
     const [message,setMessage]=useState('')
  
    const fetchAllCompanies=async()=>{
      var result=await getData('company/fetch_all_company')
     
      setCompany(result.data)

    }
    useEffect(function(){
        fetchAllCompanies()
      },[])
    const handleOpenDailog=(rowData)=>{
    fetchALLcities(rowData.state)
    setCompanyName(rowData.companyname)
    setOwnerName(rowData.ownername)
    setEmailAddress(rowData.emaileaddress)
    setMobileNumber(rowData.mobilenumber)
    setAddress(rowData.address)
    setCity(rowData.city)
    setState(rowData.state)
    setCompanylogo({filename:`${ServerURL}/images/${rowData.logo}`,bytes:''})
    setStatus(rowData.status)
    setCompanyid(rowData.companyid)
    setOldPicture(rowData.logo)
    setOpen(true)
      }
      
  const fetchALLStates=async()=>{
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
 const handleCancel=()=>{
  setCompanylogo({filename:`${ServerURL}/images/${oldPicture}`,bytes:''})
   setBtnStatus(false)
   setMessage('')
 }
 const handleClick=(event)=>{
  setCompanylogo({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
  setBtnStatus(true)
  
 }
 const handleSavelogo=async()=>{
  var formData=new FormData()
  formData.append('logo',companylogo.bytes)
  formData.append('companyid',companyid)
  var result=await postData('company/edit_company_logo',formData)
  if(result.status){
    setMessage('assets/tick.gif')
  }
  else{
    setMessage('')
  }
  fetchAllCompanies()
  setBtnStatus(false)
 }
 const PictureButton=()=>{
  return(
    
  <div>{btnStatus?
  <div style={{display:'flex', padding:10}}>
    <Button onClick={handleSavelogo}>Save</Button>
    <Button onClick={handleCancel}>Cancel</Button>
  </div>:<div ><img src={`${message}`} width="50"/></div>}
  </div>)
 }
  
  useEffect(function(){
    fetchALLStates()
  },[])
  const handleEditData=async()=>{
    
    var cd=new Date()
    var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
   var body={
    'companyid':companyid,
   'ownername':ownerName,
   'companyname':compnayName,
   'emailaddress':emailAddress,
   'mobilenumber':mobileNumber,
   'address':address,
  'state':state,
   'city':city,
   'updatedat':dd,
  'createdby':'ADMIN',
   'status':status}
   setMessage('')
   var result= await postData('company/edit_company_data',body)
   
   if(result.status){
    setOpen(false)
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
   fetchAllCompanies()
  }
      const handleClose=()=>{
        setOpen(false)
        setMessage('')
      }
  const handleStatus=(temp)=>{
    if(temp=='Pending')
    {
      setStatus('Verified')
    }
    if(temp=='Verified')
    {
      setStatus('Pending')
    }
    
  }
  const handleDelete=async(rowData)=>{
     setOpen(false)
     Swal.fire({
      title: 'Do you want to delete company record?',
     
      showCancelButton: true,
      confirmButtonText: 'Delete',
      
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       var res=await postData('company/delete_company_data',{companyid:rowData.companyid})
       if(res.status){
        Swal.fire('Deleted!', '', 'success')
        fetchAllCompanies()
       }
      
      else
       {
        Swal.fire({
          icon: 'error',
          title: result.message,
         
        })
      
       }

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
     
    
     
  }
    const ShowCompaniesDetails=()=>{
      
  
      return (
        <div>
         
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          
          >
            <DialogTitle id="alert-dialog-title"   style={{display:'flex',justifyContent:"space-between"}}>

             <div  style={{display:'flex',alignItems:'center'}}>
             <img src="./assets/foodbasket.png" width="40"/>
             Edit Company
             </div>
             <div><CloseIcon   style={{cursor:'pointer'}} onClick={handleClose} /></div>
            </DialogTitle>
            <DialogContent >
            <Grid container spacing={2} style={{marginTop:5}}>
      
          <Grid item xs={6}>
            <TextField value={compnayName}fullWidth onChange={(event)=>setCompanyName(event.target.value)} label='Company name' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField value={ownerName} fullWidth  onChange={(event)=>setOwnerName(event.target.value)}  label='Owner name' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField value={emailAddress} fullWidth  onChange={(event)=>setEmailAddress(event.target.value)}  label='Email Address' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField value={mobileNumber} fullWidth  onChange={(event)=>setMobileNumber(event.target.value)} label='Mobile number' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <TextField value={address} fullWidth  onChange={(event)=>setAddress(event.target.value)} label='Address' variant='outlined' />
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
        >
          <MenuItem value={'Choose State..'}>Choose State..</MenuItem>
          {fillAllStates()}
        </Select>
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
        >
          <MenuItem value={'Choose City...'}>Choose City...</MenuItem>
          {fillAllcities()}
         
        </Select>
        </FormControl>
          </Grid>
          <Grid item xs={6}>
          {status=='Pending'?<Switch onChange={()=>handleStatus(status)}/>:<Switch onChange={()=>handleStatus(status)} defaultChecked/>}{status}
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
          <PictureButton/>
          </Grid>
          
        </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditData}>Edit</Button>
              <Button  onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    function showAllCompanies() {
        return (
          <MaterialTable
            title={<span className={classes.headingStyle}>Company Detail</span>}
            columns={[
              { title: 'CompanyName', field: 'companyname',
              render:rowData=><div>{rowData.companyname}<br/>{rowData.ownername}</div> },
              { title: 'Owner Name', field: 'ownername' },
              { title: 'City', field: 'cityname',
               render:rowData=><div>{rowData.address}<br/>{rowData.cityname},{rowData.statename}</div> },
               { title: 'Contact Details', field: 'cityname',
               render:rowData=><div>{rowData.mobilenumber}<br/>{rowData.emaileaddress}</div> },
               { title: 'Status', field: 'status' },
               { title: 'Last Updation', field: 'createdat',
               render:rowData=><div>{rowData.createdat}<br/>{rowData.updatedat}<br/>{rowData.createdby}</div> },
               { title: 'Logo', field: 'logo' ,
               render:rowData=><Avatar src={`${ServerURL}/images/${rowData.logo}`} style={{width:50,height:50}} variant="rounded"/> },
              
            ]}
            data={company}
                    
            actions={[
              {
                icon: 'add',
                isFreeAction:true,
                tooltip: 'Add Company',
                onClick: (event) =>navigate('/company')
              },
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) =>handleOpenDailog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleDelete(rowData)
              }
            ]}
          />
        )
      }
    return (<div className={classes.maincontainer}>
      <div className={classes.box}>{showAllCompanies()}
      {ShowCompaniesDetails()}
      </div></div>)
}