import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import {TextField,Button,useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MuiOtpInput } from 'mui-one-time-password-input'
import TextsmsIcon from '@mui/icons-material/Textsms';
import { getData,postData } from "../../services/ServerServices";
import { useDispatch } from "react-redux";
export default function LoginDailog(props){
    const [number,setNumber]=useState('')
    const [isOpen,setIsOpen]=useState(false)
    const [otp,setOtp]=useState('')
    const [testotp,setTestOtp]=useState()
    const theme = useTheme();
    const dispatch=useDispatch()
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
      const handleClose=()=>{
        props.setState(false)
      }
    const generateotp=()=>{
      var gotp=parseInt(Math.random()*899999)+100000
      setTestOtp(gotp)
      alert(gotp)
    }  
    const handleSetOtp=()=>{
        generateotp()
        setIsOpen(true)

    }  
    async function handleOtp(){
      if(otp==testotp)
    {  
       handleClose()
       var result=await postData('userinterface/add_user_data',{mobileno:number})
       
       if(result.status==0){
        alert("Server Error")
       }
       else if(result.status==2){
      
        props.setUserData({'userid':result.data[0].userid,'mobileno':result.data[0].mobileno})
        props.setAddress(true)
       }
       else if(result.status==1){
        var result_address=await postData('userinterface/check_user_address',{mobileno:number})
       
        if(result_address.status==1){
          dispatch({type:'ADD_USER',payload:[result_address.data.mobileno,result_address.data]})
          props.setbtn("MAKE PAYMENT")
          props.pageRefresh()
        }
        else if(result_address.status==2){
          props.setUserData({'userid':result.data.userid,'mobileno':result.data.mobileno})
          props.setAddress(true)
        }
       }
       
    }
      else
      alert("Incorrect")
  }  

    const handleChange = (newValue) => {
      setOtp(newValue)
    }
  
      
    return( <div >
         
        <Dialog
          open={props.state}
         onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen={matches}
          PaperProps={{style:{borderRadius:15,width:'35%'}}}
         
        >
       <DialogContent width='100%' style={{background:' rgb(181,238,205)',
        background:' linear-gradient(204deg, rgba(181,238,205,1) 6%, rgba(130,236,244,1) 55%)',padding:'6%'}}> 
        {isOpen?<div >
          <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginBottom:'7%' }}>
               <div onClick={()=>setIsOpen(false)} ><ArrowBackIcon/></div> 
                <CloseIcon   fontSize="small" style={{cursor:'pointer',borderRadius:20,background:"#000",color:'#fff',padding:1}} onClick={handleClose}  />
             </div>
                <div style={{fontFamily:'Poppins',fontWeight:'bolder',fontSize:33,marginBottom:'3%'}}>OTP Verification</div> 
                    <div  style={{fontFamily:'Poppins',fontSize:16,color:'#000',marginBottom:30}}>OTP has been sent to number +91 {number}</div>
                    <MuiOtpInput length={6} value={otp} onChange={handleChange} />
                    <div style={{display:'flex',justifyContent:'center',marginTop:'8%'}}>
                    <ArrowForwardIcon    style={{cursor:'pointer',borderRadius:22,background:otp.length==6?'white':'gray',padding:'2%'}} disabled={otp.length!=6} onClick={handleOtp} />
                   
                    </div>
                   
                    <div style={{display:'flex',justifyContent:'center',marginTop:'2%'}}>Didn't get code?</div>
                    <div style={{display:'flex',justifyContent:'center',marginTop:'1%',cursor:'pointer'}} onClick={generateotp}>
                      <TextsmsIcon /> Send again</div>
                   
                 </div>  
                    
                 :
                  
          <div >
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between' }}>
               <div style={{fontFamily:'Poppins',fontWeight:'bolder',fontSize:45,color:'rgb(204 0 0)'}}>Gwalior Basket</div> 
                <CloseIcon   fontSize="small" style={{cursor:'pointer',borderRadius:20,background:"#000",color:'#fff',padding:1}} onClick={handleClose}  />
             </div>
           
            <div  style={{fontFamily:'Poppins',fontWeight:'bold',fontSize:28,color:'#000',marginBottom:30}}>Groceries delivered in 10 minutes</div>
            
            <TextField  fullWidth placeholder='mobile number' variant='filled' onChange={(event)=>setNumber(event.target.value)}  InputProps={{ disableUnderline: true ,style: { borderRadius: "30px", height: "43px", }}}  style={{background:"#fff",border:"fff", borderRadius: "30px", height: "43px", }}/>
            <Button fullWidth variant='outlined' disabled={number.length!=10} style={{marginTop:20,borderRadius:20}} onClick={handleSetOtp}>Continue</Button>
           <div style={{fontFamily:'Poppins',fontSize:12,marginTop:20,marginLeft:'29%'}}>By continuing, you agree to our<br/>

            Terms of Service &Privacy Policy
            </div> 
          </div >  
         }
          
        </DialogContent>
        </Dialog>
        
      </div>)
}