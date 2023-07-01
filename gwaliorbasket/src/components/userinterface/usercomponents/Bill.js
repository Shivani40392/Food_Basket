import { Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
export default function Bill(props){
    var total=props.product.reduce((a,b)=>{
        return (a+b.offerprice*b.qty)
    },0)
    return(<div>
        <Paper elevation={5}>
            <div style={{padding:'6%',fontFamily:'Poppins',fontSize:14}}>
                <div style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between',fontWeight:'bold',margin:'1%'}}>
                    <div>Item Total</div>
                    <div>&#8377;{total}</div>
                </div>
                <div style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between',color:'#888',margin:'1%'}}>
                    <div>Handling Charge</div>
                    <div>&#8377;15</div>
                </div>
                <div style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between',color:'#888',margin:'1%'}}>
                    <div>Delivery Fee</div>
                    <div>&#8377;40</div>
                </div>
                <div style={{display:'flex',flexDirection:'row' ,justifyContent:'space-between',fontWeight:'bold',margin:'2%'}}>
                    <div>To Pay</div>
                    <div>&#8377;{total+55}</div>
                </div>
                <Divider style={{marginBottom:'2%'}}/>

            </div>
        </Paper>
    </div>)
} 