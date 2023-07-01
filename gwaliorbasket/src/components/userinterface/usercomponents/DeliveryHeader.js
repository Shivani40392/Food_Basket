import { AppBar } from "@mui/material"
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
export default function DeliveryHeader(){
    return(<div>
        <AppBar position="static" style={{background:' rgb(185,242,208)',background:' linear-gradient(356deg, rgba(185,242,208,1) 0%, rgba(184,242,208,1) 15%, rgba(70,228,241,1) 81%)',display:'flex',height:70,justifyContent:'center'}}>
        <div style={{marginLeft:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,fontFamily:'Poppins'}}>
      
        <LocalShippingIcon style={{height:25,width:40,margin:'1%'}}/>
        Delivering to you very fast
       
         </div>
      </AppBar>
    </div>)
}