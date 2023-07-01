import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {TextField,Button,useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import {Dialog,DialogContent} from "@mui/material";
import {Grid} from "@mui/material";
import { postData } from "../../services/ServerServices";
import { json } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function DeliveryAddress(props){
    const [fullName,setFullName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [zipcode,setZipCode]=useState('')
    const [address,setAddress]=useState('')
    const [error,setError]=useState({})
    const dispatch=useDispatch()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
      const handleClose=()=>{
        props.setAddress(false)
      }
    const handleClick=async()=>{
      if(validation()){
      var body={'userid':props.userData.userid,'fullname':fullName,'phonenumber':props.userData.mobileno,'mobileno':props.userData.mobileno,'state':state,'city':city,'zipcode':zipcode,'address':address}
      var result=await postData('userinterface/add_user_interface',body)
      dispatch({type:'ADD_USER',payload:[body.mobileno,[body]]})
      props.setbtn("MAKE PAYMENT")
      if(result.status){
        handleClose()
        alert("Addres added successfully ")
      }
      else{
          alert("Server Error")
      }
     

    }}
    const handleError=(inputs,value)=>{
      setError(prev=>({...prev,[inputs]:value}))
    
    }
    const validation=()=>{
      var isValid=true
      if(!fullName){
        handleError("fullName","Invalid full Name")
        isValid=false
      }
     
     
      
      if(!address){
        handleError("address","Invaild Address")
        isValid=false
      }
      if(!state )
      {
        handleError("state","Select State")
        isValid=false
      }
       if(!city )
      {
        handleError("city","Select City")
        isValid=false
      }
      if(!zipcode )
      {
        handleError("zipcode","Invaild Zipcode")
        isValid=false
      }
     
      return isValid
    }
  
    return(<div>
         
         <Dialog
          open={props.address}
         onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen={matches}
          PaperProps={{style:{borderRadius:15,width:'35%'}}}
         
        >
       <DialogContent width='100%' style={{background:' rgb(181,238,205)',
        background:' linear-gradient(204deg, rgba(181,238,205,1) 6%, rgba(130,236,244,1) 55%)',padding:'6%'}}> 
                          
          <div >
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
               <div style={{fontFamily:'Poppins',fontWeight:'600',fontSize:20,color:'rgb(204 0 0)'}}>New Address</div> 
                <CloseIcon   fontSize="small" style={{cursor:'pointer',borderRadius:20,background:"#000",color:'#fff',padding:1}}  onClick={handleClose} />
             </div>
           
            
          </div >  
          <div>
          <Grid container spacing={2} >
       
          <Grid item xs={6}>
            <TextField error={!error.fullName?false:true} helperText={error.fullName} onFocus={()=>handleError("fullName",null)} fullWidth onChange={(event)=>setFullName(event.target.value)} label='Full Name' variant='outlined' />
          </Grid>
          <Grid item xs={6}>
            <TextField  value={props.userData.mobileno} fullWidth  onChange={(event)=>setPhoneNumber(event.target.value)}  label='Phone Number' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField error={!error.state?false:true} helperText={error.state} onFocus={()=>handleError("state",null)}  fullWidth  onChange={(event)=>setState(event.target.value)}  label='State' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField error={!error.city?false:true} helperText={error.city} onFocus={()=>handleError("city",null)} fullWidth  onChange={(event)=>setCity(event.target.value)} label='City' variant='outlined' />
          </Grid>
          <Grid item xs={4}>
            <TextField error={!error.zipcode?false:true} helperText={error.zipcode} onFocus={()=>handleError("zipcode",null)} fullWidth  onChange={(event)=>setZipCode(event.target.value)} label='Zip Code' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
            <TextField  error={!error.address?false:true} helperText={error.address} multiline maxRows={7} onFocus={()=>handleError("address",null)} fullWidth  onChange={(event)=>setAddress(event.target.value)} label='Address' variant='outlined' />
          </Grid>
          <Grid item xs={12}>
              <Button  fullWidth variant="contained" style={{borderRadius:20}} onClick={handleClick}>Submit</Button>
            </Grid>
            

        </Grid>
          </div>
      
          
        </DialogContent>
        </Dialog>
        
    </div>)
}
