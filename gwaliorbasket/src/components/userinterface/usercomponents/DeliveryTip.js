import Paper from '@mui/material/Paper';
import { ServerURL } from '../../services/ServerServices';
export default function DeliveryTip(){
return(<div>
   <Paper elevation={5}>
       <div style={{padding:'5%',fontFamily:'Poppins',fontSize:14}}>
          <div style={{fontWeight:'bold'}}>Delivery Partner Tip</div>
          <div style={{color:'#888',marginTop:'1%',marginBottom:'1%'}}>The entire amount will be sent to your delivery partner</div>
          <div style={{display:'flex',flexDirection:'row'}}>
             <div style={{borderRadius:20,borderColor:'#ced4d6',borderWidth:1,borderStyle:'solid',width:'14%',display:'flex',alignItems:'center',justifyContent:'center',padding:'1%',marginRight:'2%'}}>
                <img src={`${ServerURL}/images/coin.jpg`} style={{width:'30%'}}/>
                <div>  &#8377;10</div>
             </div>
             <div style={{borderRadius:20,borderColor:'#ced4d6',borderWidth:1,borderStyle:'solid',width:'14%',display:'flex',alignItems:'center',justifyContent:'center',padding:'1%',marginRight:'2%'}}>
                <img src={`${ServerURL}/images/coin.jpg`} style={{width:'30%'}}/>
                <div>  &#8377;20</div>
             </div>
             <div style={{borderRadius:20,borderColor:'#ced4d6',borderWidth:1,borderStyle:'solid',width:'14%',display:'flex',alignItems:'center',justifyContent:'center',padding:'1%',marginRight:'2%'}}>
                <img src={`${ServerURL}/images/coin.jpg`} style={{width:'30%'}}/>
                <div>  &#8377;30</div>
             </div>
             <div style={{borderRadius:20,borderColor:'#ced4d6',borderWidth:1,borderStyle:'solid',width:'14%',display:'flex',alignItems:'center',justifyContent:'center',padding:'1%'}}>
                <img src={`${ServerURL}/images/coin.jpg`} style={{width:'30%'}}/>
                <div>  &#8377;40</div>
             </div>
             
          </div>
       </div> 
    </Paper>
</div>)
}