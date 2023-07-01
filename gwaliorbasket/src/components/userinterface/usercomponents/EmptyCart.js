import { Button } from '@material-ui/core';
import { useDispatch } from "react-redux"
export default function EmptyCart(props){
    const dispatch=useDispatch()
    const handleDelete=()=>{
       props.keys.forEach((keys)=>{
         dispatch({type:'DELETE_CART',payload:[keys]})
        })
       props.pageRefresh()
   
     }
    return(<div>
        <div>
            <Button variant="outlined" style={{borderColor:'red',color:'red',width:'100%',height:35,fontSize:10}} onClick={handleDelete}>Empty Cart</Button>
            </div>
    </div>)
}