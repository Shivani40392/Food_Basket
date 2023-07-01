import Header from "../usercomponents/Header"
import DeliveryHeader from "../usercomponents/DeliveryHeader"
import Spacer from "../usercomponents/Spacer"
import CartHeading from "../usercomponents/CartHeading"
import { Grid } from "@mui/material"
import CartItem from "../usercomponents/CartItem"
import EmptyCart from "../usercomponents/EmptyCart"
import Coupons from "../usercomponents/Coupons"
import Bill from "../usercomponents/Bill"
import { useTheme } from '@mui/material/styles'
import { useMediaQuery} from '@mui/material';
import Address from "../usercomponents/Address"
import DeliveryPartner from "../usercomponents/DeliveryPartner"
import DeliveryTip from "../usercomponents/DeliveryTip"
import { useSelector } from "react-redux"
import { useState } from "react"
import LoginDailog from "../usercomponents/LoginDailog"
import DeliveryAddress from "../usercomponents/DeliveryAddress"
import { useNavigate } from "react-router-dom"
export default function DeliveryCart(){
  const theme=useTheme()
  const [refresh,setRefresh]=useState(false)
  const [dailogState,setDailogState]=useState(false)
  const [address,setAddress]=useState(false)
  const [btn,setbtn]=useState('ADD ADDRESS TO PROCEED')
  const [userData,setUserData]=useState({'userid':'','mobileno':''})
  const xs = useMediaQuery(theme.breakpoints.down('xs'));
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const md = useMediaQuery(theme.breakpoints.down('md'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  var product=useSelector((state)=>state.cart)
  var productRecord=Object.values(product)
  var keys=Object.keys(product)
  var userkeys=Object.keys(userData)
  const pageRefresh=()=>{
     setRefresh(!refresh)
  }
  
 
  var items=Object.keys(product)
    return(<div>
        <div>
        <div > 
        <Header/>
        <DeliveryHeader />
        </div> 
        <div style={{width:'100%',height:50}}>
        </div>
        </div>
        <div style={{display:'flex',alignItems:md?'flex-start':'center',justifyContent:md?'flex-start':'center',margin:10}}>
       <div style={{width:md?'100vw':'68%'}}>
       <Grid container spacing={2} style={{display:'flex',flexDirection:md?'column':'row'}} >
          <Grid item xs={12}>
            <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
             <CartHeading  product={productRecord} />
             <EmptyCart pageRefresh={pageRefresh} keys={keys} />
            </div>
            </Grid>
          
            <Grid item xs={md?12:7}>
              <CartItem product={productRecord} pageRefresh={pageRefresh} />
              
              <div style={{width:'100%',height:'3%'}}>
             </div>
              <DeliveryTip/>
              <div style={{width:'100%',height:md?15:'3%'}}>
             </div>
              <DeliveryPartner/>
              <div style={{width:'100%',height:md?15:'3%'}}>
             </div>
            </Grid>
            <Grid item xs={md?12:5}>
             <Coupons/>
             <div style={{width:'100%',height:md?15:'3%'}}>
           </div>
             <Bill  product={productRecord}/>
             <div style={{width:'100%',height:md?15:'3%'}}>
           </div>
           <Address setDailogState={setDailogState} btn={btn} keys={keys} userkeys={userkeys} pageRefresh={pageRefresh}/>
            </Grid>
            
        </Grid>
        <div>{<LoginDailog  state={dailogState} setState={setDailogState} setAddress={setAddress} address={address} setUserData={setUserData} pageRefresh={pageRefresh} setbtn={setbtn}/> }</div>
        <div>{<DeliveryAddress userData={userData} setAddress={setAddress} address={address} setbtn={setbtn} />}</div>
        </div>
        </div>
    </div>)
}