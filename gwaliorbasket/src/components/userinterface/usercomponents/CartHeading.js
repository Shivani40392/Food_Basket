import { Padding } from "@mui/icons-material";
import { Grid,useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles'
export default function CartHeading(props){
  const theme=useTheme()
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  
   var save=props.product.reduce((a,b,c)=>{
    return (a+(b.price-b.offerprice))
},0)
    return(<div>
     
        <div style={{fontSize:md?15:17,fontWeight:'bolder',fontFamily:'Poppins',display:'flex',flexDirection:'row',marginBottom:'1%',width:250}}>
          <div style={{marginRight:'1%'}}>
            Cart({props.product.length} Items)
          </div>
          {props.product.length>0?<div style={{ background:' rgb(204,236,227)',
          background:' linear-gradient(115deg, rgba(204,236,227,1) 64%, rgba(202,200,169,1) 91%)',display:'flex',flexDirection:'row',borderRadius:5,width:md?'50%':'50%',padding:2,alignItems:'center',justifyContent:'center'}}>
         <div style={{fontSize:md?13:13,fontWeight:'bolder',marginRight:'2%'}}>
         ₹{save}
         </div>
         <div style={{fontSize:md?10:10,fontWeight:500}}>
         saved on this order
         </div>
          </div>:<div></div>}
          
        </div>
    </div>)
}