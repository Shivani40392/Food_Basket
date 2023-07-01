import { Divider, Grid,Paper,useMediaQuery,Box } from "@mui/material"
import { ServerURL } from "../../services/ServerServices"
import { useTheme } from '@mui/material/styles'
import React,{createRef} from "react"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
export default function Footer2(){
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));

    var slider=createRef()
    return(<div>
    <div  style={{marginLeft:'4%',marginBottom:10}}>
        
        
        <Grid container spacing={2} style={{display:'flex',flexDirection:matches?'column':'row'}}>
        <Grid item xs={12} style={{display:'flex',justifyContent:!matches?'center':'left',marginRight:!matches?'9%':0}} > 
        <div style={{fontFamily:'Poppins',fontSize:20,fontWeight:600,marginBottom:10}}>How it Works</div>
        </Grid>
        <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{width:!matches?'80%':350,height:!matches?200:90,display:'flex',alignItems:!matches?'center':'left',flexDirection:!matches?'column':'row',padding:10}}>
           <div><img src={`${ServerURL}/images/place-order.svg`} style={{width:100,height:100}}/></div> 
           <div style={{display:'flex',alignItems:!matches?'center':'',flexDirection:'column'}}>
            <div style={{fontFamily:'Poppins',fontSize:15,fontWeight:600,marginTop:12,marginBottom:10}} >Place an order</div>
            <div  style={{fontFamily:'Poppins',fontSize:13,fontWeight:500}}>
            Choose from a wide range of daily essentials
            </div>
            </div>
           
        </Paper>
        </Grid>
        <Grid item xs={3} md={4}>
        <Paper elevation={3} style={{width:matches?350:'80%',height:!matches?200:90,display:'flex',alignItems:'center',flexDirection:!matches?'column':'row',padding:10}}>
           <div><img src={`${ServerURL}/images/do-not-blink.svg`} style={{width:100,height:100}}/></div> 
           <div  style={{display:'flex',alignItems:!matches?'center':'',flexDirection:'column'}}>
            <div style={{fontFamily:'Poppins',fontSize:15,fontWeight:600,marginTop:12,marginBottom:10}} >Don’t Blink</div>
            <div  style={{fontFamily:'Poppins',fontSize:13,fontWeight:500}}>
            Our delivery partner will be at your door
            </div>
            </div>
           
        </Paper>
        </Grid>
        <Grid item xs={12} md={4}  >
        <Paper elevation={3} style={{width:!matches?'80%':350,height:!matches?200:90,display:'flex',alignItems:'center',flexDirection:!matches?'column':'row',padding:10}}>
           <div><img src={`${ServerURL}/images/enjoy.svg`} style={{width:100,height:100}}/></div> 
           <div style={{display:'flex',alignItems:!matches?'center':'',flexDirection:'column'}} >
            <div style={{fontFamily:'Poppins',fontSize:15,fontWeight:600,marginTop:12,marginBottom:10}} >Enjoy</div>
            <div  style={{fontFamily:'Poppins',fontSize:13,fontWeight:500}}>
            Boom! You’ll never have to wait for groceries again
            </div>
            </div>
           
        </Paper>
        </Grid>
        </Grid>
        
        </div>
             <Divider light variant='middle' style={{marginTop:'5%',marginBottom:'2%'}}/>



      <Grid container spacing={2}  style={{display:'flex',padding:20}}>
        <Grid item xs={12} md={3} order={matches ? 1 : 0} >
            <h2 style={{fontFamily:'Poppins'}}>Gwalior Food Basket </h2>
            <Box color='gray' display='flex' gap={3}  >
            <InstagramIcon/>
            <TwitterIcon/>
            <FacebookIcon/>
            <LinkedInIcon/>
           
            </Box>
              <p style={{color:'gray',fontFamily:'Poppins',fontSize:14}}>©Gwalior foodbasket Technologies Private Limited</p>
        </Grid>

        <Grid item xs={12} md={6} style={{fontFamily:'Poppins',fontSize:15,display:'flex',flexDirection:'row',justifyContent:!matches?'space-evenly':'initial',marginTop:12}} >
                
                <div style={{display:'flex',flexDirection:'column',gap:15 ,marginRight: !matches ? 0 : '22%' }}>
                    <div>Home</div>
                    <div>Delivery Areas</div>
                    <div>Careers</div>
                    <div>Customer Support</div>
                    <div>Press</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:15}}>
                    <div>Privacy Policy</div>
                    <div>Terms of Use</div>
                    <div>Responsible Disclosure Policy</div>

                </div>
          
        </Grid>
        <Grid item xs={12} md={3}  >
            <div style={{marginBottom:10}}>Download App</div>
            <Box    style={{borderWidth:1,borderStyle:'solid',borderRadius:6,height:40,marginBottom:10,width:!matches?210:'',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <ShopIcon/><span>Get it on play store</span>

            </Box>
            <Box   style={{borderWidth:1,borderStyle:'solid',borderRadius:6,width:!matches?210:'',height:40,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <AppleIcon/><span>Get it on app store</span>
            
            </Box>
        </Grid>
        {!matches?<></>:<Grid xs={12}><Divider light variant='middle' style={{marginTop:'5%',marginBottom:'2%'}}/></Grid>}

      </Grid>

    </div>)
}