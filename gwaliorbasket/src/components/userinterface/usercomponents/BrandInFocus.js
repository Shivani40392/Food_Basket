import { ServerURL,getData} from '../services/ServerServices';
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from "@mui/material"
import { useEffect,useState } from 'react';
export default function BrandInFocus(){
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const [productdeals,setProductdeals]=useState([])
    const fetch_all_productsdeals=async()=>{
      var result= await getData('userinterface/fetch_all_productsdeals')
      setProductdeals(result.data)
    }
    useEffect(function(){
      fetch_all_productsdeals()
    },[])
    
    var  images=[{id:1,image:'lays.png',text:'Lays '},
    {id:2,image:'ashi.png',text:'Aashrivaad'},
    {id:3,image:'fortune.png',text:'Sunlite'},
    {id:4,image:'gems.png',text:'Cadbury'},
    {id:5,image:'britannia.png',text:'Britania'},
    {id:6,image:'redbull.png',text:'Red Bull'},
    {id:7,image:'malabar.webp',text:'Malabar'},
    {id:8,image:'kissan.png',text:'kissan'},
    {id:9,image:'tide.png',text:'Tide'},
    {id:10,image:'redlabel.png',text:'Red Label'}]
    function explorecategory(){
      return productdeals.map((item)=>{
        return(<div style={{width:'10%',background: "linear-gradient(180deg, rgba(93,9,121,1) 3%, rgba(122,49,185,1) 92%)",borderRadius:'10%',margin:3,display:'flex',alignItems:'center',flexDirection:'column',  padding: "10px 10px 0px 10px"}}>
            <div style={{fontFamily:'Poppins',  fontSize: xs ? 4 : sm ? 6 : md ? 8 : lg ? 14 : 14, fontWeight: "bolder",
              textAlign: "center",color:"rgba(93,9,121,1)",background:'#fff',borderRadius:'0.3rem',width:'60%',padding:3,marginBottom:"15%"}}>Best Deals</div>
            <div style={{textAlign:'center',fontSize:xs?4:sm?6:md?8:lg?16:16,color:'#fff',fontFamily:'Poppins',fontWeight:'bolder',marginBottom:'5%'}}>{item.productname}</div>
            <img src={`${ServerURL}/images/${item.image}`} style={{width:'60%'}}/></div>)
      })
    }
 return(<div>
  <div style={{fontFamily:'Poppins',fontSize:20,fontWeight:'bolder'}}>Best Deals</div>
  <div style={{padding:10,display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
        {explorecategory()}</div>
 </div>)
}