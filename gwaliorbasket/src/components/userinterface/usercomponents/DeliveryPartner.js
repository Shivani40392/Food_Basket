import Paper from '@mui/material/Paper';
import { ServerURL } from '../../services/ServerServices';
import { Grid,useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles'
export default function DeliveryPartner(){
    const theme=useTheme()
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
return(<div>
   
    <Paper elevation={5}>
        <div style={{padding:'3%',display:'flex',flexDirection:'row',alignItems:'center'}}>
            <img src={`${ServerURL}/images/rider.webp`} style={{width:'12%',height:'12%'}}/>
            <div style={{fontFamily:'Poppins',fontSize:md?13:14,fontWeight:'bold'}}>See how we ensure our delivery partner’s safety </div>
            <span style={{fontFamily:'Poppins',fontSize:md?13:14,fontWeight:'bold',color:'#FC427B',marginLeft:3}}>Learn more</span>
        </div>
    </Paper>
</div>)
}