import Paper from '@mui/material/Paper';
import { ServerURL } from '../../services/ServerServices';
import { Divider } from '@mui/material';
import { Grid,useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux';

export default function CartItem(props){
    const theme=useTheme()
    const dispatch=useDispatch()
   const handlePlus=(item)=>{
      var v=(item.qty)+1
      item['qty']=v
      dispatch({type:'ADD_CART',payload:[item.productlistid,item]})
    props.pageRefresh()

   }
   const handleMinus=(item)=>{
    var v=(item.qty)-1
    if(v==0){
      dispatch({type:'DELETE_CART',payload:[item.productlistid]})
    }
    if(v>0){
    item['qty']=v
    dispatch({type:'ADD_CART',payload:[item.productlistid,item]})}
  props.pageRefresh()

 }
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
   
    function showItem(){
        
        return props.product.map((item)=>{
        return(<div >
          
           <div style={{padding:'4%',marginBottom:'1%',display:'flex',flexDirection:'row',fontFamily:'Poppins'}}>
        
             <img src={`${ServerURL}/images/${item.image}`} style={{width:'12%',height:"12%",marginRight:'10%'}}/> 
             <div style={{display:'flex',flexDirection:'column' ,width:'65%'}}>
               <div style={{display:'flex',flexDirection:'row'}}>

              
                <div>
               <div style={{fontSize:14,fontWeight:600}}>{item.productname}</div>
               <div style={{color:'#888',fontSize:12,marginBottom:'3%'}}> {item.weight}{item.pricetypename} </div>
               </div>

               
            </div>
             <div style={{display:'flex',flexDirection:'row' }}>
               <div style={{fontSize:15,fontWeight:'bolder',marginRight:'3%'}}>&#8377; {item.offerprice} </div>
               <div style={{color:'#FC427B',fontSize:15}}><s>&#8377;{item.price}</s> </div>
             </div>
             </div>
                    
             <div style={{color:'#fff',backgroundColor:'#FC427B',display:'flex',flexDirection:'row',justifyContent:'space-between',borderRadius:5,width:'15%',height:'20%',padding:'1%',cursor:'pointer'}}>
                <div onClick={()=>handleMinus(item)}>-</div>
                <div >{item.qty}</div>
                <div onClick={()=>handlePlus(item)}>+</div>
               </div>  

      

          </div>
            <div style={{display:'flex',alignContent:'center',justifyContent:'center'}}>
            <Divider style={{width:'93%',color:'#888'}}/>
           </div>
         </div> )
            })
     }
     function empty(){
      return(<div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:23,fontWeight:'bolder',color:'red',height:'11vh'}}>
          Cart Is Empty
        </div>
      </div>)
     }
    return(<div>
        
        <Paper elevation={5} >
        <div style={{display:'flex',flexDirection:'column',overflow:md?'':"auto" ,maxHeight:md?'':'70vh' }}>
        {props.product.length>0?showItem():empty()}
       </div>
       </ Paper>     
    </div>)
}