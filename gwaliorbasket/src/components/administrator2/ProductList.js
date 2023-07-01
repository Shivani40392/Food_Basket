import { TextField,Grid,Button,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useStyles } from "./ProductListCSS";
import { DropzoneArea } from "react-mui-dropzone";
import { getData,postData} from "../services/ServerServices";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {  useNavigate } from "react-router-dom";

export default function ProductList(){
   var classes=useStyles()
   var navigate=useNavigate() 
  
   var admin=JSON.parse(localStorage.getItem('ADMIN'))
   const [categories,setCategories]=useState([])
   const [category,setCategory]=useState('')
   const [productlist,setProductlist]=useState([])
   const [product,setProduct]=useState('')
   const [companyid,setCompanyid]=useState()
   const [weight,setWeight]=useState()
   const [price,setPrice]=useState()
   const [OfferPrice,setOfferPrice]=useState()
   const [description,setDescription]=useState()
   const [error,setError]=useState({})
   const [images,setImages]=useState([])
   const fetchAllCategory=async()=>{
      var result=await getData('productlist/fetch_all_category')
      setCategories(result.data)
   }
   const fetchAllProduct=async(categoryid)=>{
      var body={
         categoryid:categoryid
      }
      var result=await postData('productlist/fetch_all_product',body)
      setProductlist(result.data)
   }
   const fillAllCategory=()=>{
      return categories.map((item)=>{
         return (<MenuItem value={item.categoryid}>{item.category}</MenuItem>)
      })
   }
   const fillAllProduct=()=>{
      return productlist.map((item)=>{
         return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)
      })
   }
   const handleCategoryChange=(event)=>{
      setCategory(event.target.value)
      fetchAllProduct(event.target.value)
   }
   const handleProductChange=(event)=>{
      setProduct(event.target.value)  
   }
   const handleClick=(files)=>{
     setImages(files)
   }
   var clearValue=()=>{
      setCompanyid('')
      setDescription('')
      setPrice('')
      setOfferPrice('')
      setWeight('')
      setCategory('Choose Category...')
      setProduct('Choose Product...')
     
   }
   const handleClickform=async()=>{
     
      var cd=new Date()
      var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
     var formData=new FormData()
     if(validation()){
     formData.append('companyid',admin.companyid)
     formData.append('categoryid',category)
     formData.append('productid',product)
     formData.append('weight',weight)
     formData.append('price',price)
     formData.append('offerprice',OfferPrice)
     formData.append('description',description)
     formData.append('images',images)
     formData.append('createdat',dd)
     formData.append('updatedat',dd)
     formData.append('createdby','ADMIN')

     images.map((item,i)=>{
      formData.append('Picture'+i,item)
     })
      var result=await postData('productlist/add_productlist',formData) 
      if(result.status){
  
         Swal.fire({
           icon: 'success',
           title: result.message,
          
         })
         
        }
        else
        {
         Swal.fire({
           icon: 'error',
           title: result.message,
          
         })
        }
        clearValue()
      }
      }
    const handleError=(inputs,value)=>{
       setError(prev=>({...prev,[inputs]:value}))
    }  
   const validation=()=>{

      var isValid=true
      if(!weight){
         handleError('weight','Invalid Weight')
         isValid=false
      }
      
      if(!price){
         handleError('price','Invalid Price')
         isValid=false
      }
      if(!OfferPrice){
         handleError('offerprice','Invalid OfferPrice')
         isValid=false
      }
      if(!description){
         handleError('description','Invalid Description')
         isValid=false
      }
      if(!category || category=='Choose Category...'){
         handleError('category','Invalid Category')
         isValid=false
      }
      if(!product || product=='Choose Product...'){
         handleError('product','Invalid Product')
         isValid=false
      }
     return isValid
   }
   useEffect(function(){
      fetchAllCategory()
   },[])
 return(<div className={classes.maincontainer}>
   <div className={classes.box}>
    <Grid container spacing={2}>
    <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
    <div style={{display:'flex',flexDirection:'row'}}>
            <div><img src="./assets/foodbasket.png" width="40"/></div>
            <div className={classes.headingStyle}>
              ProductList
            </div>
   </div>
     <div><FormatListBulletedIcon onClick={()=>navigate('/dashboard/displayallproductlist')}/></div>      
    </Grid>
    <Grid item xs={4}>
    <TextField  value={admin.companyid} onChange={(event)=>setCompanyid(event.target.value)}fullWidth label="CompanyId" variant="outlined" />
    </Grid>
    <Grid item xs={4}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
         onFocus={()=>handleError('category',null)}
         onChange={handleCategoryChange}
         error={!error.category?false:true}
         
        >
          <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
          {fillAllCategory()}
          </Select>
         <div style={{fontSize:12,color:'red',padding:5}}>{error.category}</div>
      </FormControl>
    </Grid>
    <Grid item xs={4}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={product}
          label="Product"
         onFocus={()=>handleError('product',null)}
         onChange={handleProductChange}
         error={!error.product?false:true}
        >
          <MenuItem value={'Choose Product...'}>Choose Product...</MenuItem>
          {fillAllProduct()}
          </Select>
          <div style={{fontSize:12,color:'red',padding:5}}>{error.product}</div>
         
      </FormControl>
    </Grid>
    <Grid item xs={4}>
    <TextField error={!error.weight?false:true} helperText={error.weight} onFocus={()=>handleError('weight',null)}   value={weight} onChange={(event)=>setWeight(event.target.value)} fullWidth label="Weight" variant="outlined" />
    </Grid>
    <Grid item xs={4}>
    <TextField error={!error.price?false:true} helperText={error.price} onFocus={()=>handleError('price',null)}  value={price} onChange={(event)=>setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
    </Grid>
    <Grid item xs={4}>
    <TextField error={!error.offerprice?false:true} helperText={error.offerprice} onFocus={()=>handleError('offerprice',null)}  value={OfferPrice} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth label="OfferPrice" variant="outlined" />
    </Grid>
    <Grid item xs={12}>
    <TextField error={!error.description?false:true} helperText={error.description} onFocus={()=>handleError('description',null)} value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
    </Grid>
    <Grid  item xs={12} >
           
          <DropzoneArea
      acceptedFiles={['image/*']}
       dropzoneText={"Drag and drop an image here or click"}
     onChange={(files) => handleClick( files)}
    
     filesLimit={3}
     />
          </Grid>
    <Grid item xs={6}>
     <Button onClick={handleClickform} fullWidth variant="contained">Submit</Button>
    </Grid>
    <Grid item xs={6}>
     <Button onClick={clearValue} fullWidth variant="contained">Reset</Button>
    </Grid>
    </Grid>
    </div>
 </div>)
}