import { Grid } from "@mui/material"
import {ServerURL} from '../../services/ServerServices'
export default function Footer(){
    return(
        <div style={{background:'rgb(244 244 244)' }}>
    <Grid container spacing={3} style={{padding:10,marginLeft:'4%'}} >
        <Grid item xs={3}>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:'Poppins',fontSize:18,fontWeight:'bold',marginBottom:10}}>About target</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>About target</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>News & Blogs</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Investors</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Avertise With US</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Suppliers</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Press Centers</div>
         </div>
        </ Grid>
        <Grid item xs={3}>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:'Poppins',fontSize:18,fontWeight:'bold',marginBottom:10}}>Help</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Returns</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Contact Us</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Recalls</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Feedback</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Security & Fraud</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Track Order</div>
         </div>
        </ Grid>
        <Grid item xs={3}>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:'Poppins',fontSize:18,fontWeight:'bold',marginBottom:10}}>Stores</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/store.png' style={{width:25,height:25}}/>Find a Store</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/pharmacy.png' style={{width:21,height:21}}/>Clinic</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/pharmacy.png' style={{width:21,height:21}}/>Pharmacy</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/eye.svg' style={{width:21,height:21}}/>Optical</div>
       
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>More In-Store Services</div>
         </div>
        </ Grid>
        <Grid item xs={3}>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontFamily:'Poppins',fontSize:18,fontWeight:'bold',marginBottom:10}}>Services</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/samedaydelivery.png' style={{width:25,height:25}}/>Registry</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/box.png' style={{width:25,height:25}}/>Order Pickup</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/return.png' style={{width:25,height:25}}/>Driveup</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/return.png' style={{width:25,height:25}}/>Shipping & Delivery</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10,display:'flex',alignItems:'center'}}><img src='./assets/box.png' style={{width:25,height:25}}/>Free 2-Days Shipping</div>
        <div style={{fontFamily:'Poppins',fontSize:12,marginBottom:10}}>Same Day Delivery</div>
         </div>
        </ Grid>
    </Grid>
    </div>)
}