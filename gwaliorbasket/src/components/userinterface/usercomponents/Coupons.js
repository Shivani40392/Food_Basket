import Paper from '@mui/material/Paper';
import { ServerURL } from '../../services/ServerServices';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function Coupons(){
return(<div>
<Paper elevation={5}>
    <div  style={{padding:'3%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}> 
    <img src={`${ServerURL}/images/coupon.png`} style={{width:'18%',height:'20%'}}/>
    <div style={{fontSize:14,fontFamily:'Poppins'}}>Avail Offers / Coupons</div>
    </div>
    <div>
    <ArrowRightIcon/>
    </div>
    </div>
</Paper>
</div>)
}