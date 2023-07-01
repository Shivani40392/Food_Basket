import { Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import { ServerURL } from '../../services/ServerServices';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function Address(props){
    var userdata=null
    var navigate=useNavigate() 
    var dispatch=useDispatch()
    try{
    var user=useSelector((state)=>state.user)
    var userdata=Object.values(user)[0]
    }
    
    catch(e){}
    const handleOpenDailog=()=>{
        if(props.btn=="MAKE PAYMENT"){
            
         navigate('/paymentgateway')
          
        }
    
        if(props.keys.length>0){
        props.setDailogState(true)

       }
      }
    return(<div>
        <Paper elevation={5}>
            <div style={{padding:'6%',fontFamily:'Poppins',fontWeight:'bold'}}>
            <div style={{fontSize:14,display:'flex',fontWeight:'bold',flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:'4%'}}>
               <img src={`${ServerURL}/images/location.svg`} style={{width:'10%'}}/>
               <div style={{marginLeft:'2%'}}> Delivery address</div>
            </div>{userdata!=undefined?
            <div style={{fontSize:13,fontWeight:600}}>
               <div>{userdata[0]?.state} {userdata[0]?.city} {userdata[0]?.zipcode}</div>
               <div>  {userdata[0]?.address}</div> 
            </div>:<></>}
            {props.keys.length==0? 
            <div style={{marginBottom:'1%',cursor:'pointer'}} onClick={handleOpenDailog}>
             <div style={{borderRadius:5,backgroundColor:'grey',color:'#fff',height:40,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>{props.btn}</div>
            </div>:
            <div style={{marginBottom:'1%',cursor:'pointer'}} onClick={handleOpenDailog}>
            <div style={{borderRadius:5,backgroundColor:'#FC427B',color:'#fff',height:40,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13}}>{props.btn}</div>
           </div>}
            </div>
        </Paper>
    </div>)
} 