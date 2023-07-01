import { useState, useEffect } from "react";
import { TextField ,Grid,FormControl,InputLabel,Select,MenuItem,Radio,FormLabel,RadioGroup,FormControlLabel} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { IconButton,Avatar} from "@material-ui/core";
import {Button} from "@mui/material"
import { useStyles } from "./ProductsCSS"; 
import { getData, postData } from "../services/ServerServices";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DisplayAllProducts from "./DisplayAllProducts";
export default function Products(){
    var classes=useStyles()
    var navigate=useNavigate()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [categories,setCategories]=useState([])
    const [category,setCategory]=useState('')
    const [priceType,setPriceType]=useState('')
    const [pTArray,setPTArray]=useState([])
    const [image,setImage]=useState({filename:'./assets/watermarkimage.png',bytes:''})
    const [status,setStatus]=useState('')
    const [companyid,setCompanyid]=useState('')
    const [description,setDescription]=useState('')
    const [productName,setProductName]=useState('')
    const [trending,setTrending]=useState('')
    const [deals,setDeals]=useState('')
    const [error,setError]=useState({})
   
  const fetchallcategory=async()=>{
    var result=await getData('products/fetch_all_category')
      setCategories(result.data)
  }
  const fillAllCategory=()=>{
    return categories.map((item)=>{
      return (<MenuItem value={item.categoryid}>{item.category}</MenuItem>)
    })
  }  
  const fetchallPriceType=async()=>{
    var result=await getData('products/fetch_all_pricetype')
      setPTArray(result.data)
  }
  const fillAllPriceType=()=>{
    return pTArray.map((item)=>{
      return (<MenuItem value={item.pricetypeid}>{item.pricetypename}</MenuItem>)
    })
  }  
  useEffect(function(){
      fetchallcategory()
      fetchallPriceType()
  },[])
  const handleCategoryChange=(event)=>{
    setCategory(event.target.value)
  }
  const handlePriceTypeChange=(event)=>{
   setPriceType(event.target.value)
  }
  const handleClickImage=(event)=>{
    setImage({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    
  }
  const handleStatus=(event)=>{
    setStatus(event.target.value)
  }
  const handleTrending=(event)=>{
    setTrending(event.target.value)
  }
  const handleDeals=(event)=>{
    setDeals(event.target.value)
  }
  const clearValue=()=>{
    setCompanyid('')
    setCategory('Choose Category...')
    setProductName('')
    setDescription('')
    setPriceType('Choose Price Type...')
    setImage({filename:'./assets/product.png',bytes:''})
    setStatus('')
    setDeals('')
    setTrending('')
   

  }
  const handleError=(inputs,value)=>{
    setError(prev=>({...prev,[inputs]:value}))
  }
  const validation=()=>{
    var isValid=true
    
    if(!category || (category=='Choose Category...')){
      handleError("category","Select Category")
      isValid=false
    } 
    if(!productName){
      handleError("productName","Invalid Product")
      isValid=false
    } 
    if(!description){
      handleError("description","Invalid Desciption")
      isValid=false
    } 
    if(!status){
      handleError("status","Select Status")
      isValid=false
    } 
    if(!trending){
      handleError("trending","Select Available or not")
      isValid=false
    } 
    if(!trending){
      handleError("deals","Select deals or not")
      isValid=false
    } 
    if(!priceType || (priceType=='Choose Price Type...')){
      handleError("priceType","Select PriceType")
      isValid=false
    } 
    return isValid

  }
  const handleClickForm=async()=>{
    if(validation()){
    var cd=new Date()
    var dd=cd.getFullYear()+'/'+cd.getMonth()+'/'+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
    var formData=new FormData()
    formData.append('companyid',admin.companyid)
    formData.append('category',category)
    formData.append('productname',productName)
    formData.append('description',description)
    formData.append('status',status)
    formData.append('trending',trending)
    formData.append('deals',deals)
    formData.append('pricetype',priceType)
    formData.append('image',image.bytes)
    formData.append('createdat',dd)
    formData.append('updatedat',dd)
    formData.append('createdby','ADMIN')
    var result=await  postData('products/add_product_data',formData)
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
    return(
        <div className={classes.maincontainer}>
        <div className={classes.box}>
        <Grid  container spacing={2}>
            <Grid item xs={12} ><div className={classes.headingStyle}>
             <div style={{display:'flex',justifyContent:'space-between'}}><div>Products Entry  </div>
             <div><FormatListBulletedIcon  onClick={()=>navigate('/dashboard/displayallproducts')}/></div> 
            </div></div>
        </Grid>
        <Grid item xs={6}>
        <TextField  value={admin.companyid} onChange={(event)=>setCompanyid(event.target.value)} fullWidth label='Company ID' variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={category}
          label="Category Name"
         onChange={handleCategoryChange}
         error={!error.category?false:true} 
          onFocus={()=>handleError("category",null)}
        >
          <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
          {fillAllCategory()}
         
        </Select>
        <div style={{fontSize:12,color:'red',padding:5}}>{error.category}</div>
        </FormControl>
        </Grid>
        
        <Grid item xs={6}>
        <TextField error={!error.productName?false:true} helperText={error.productName} onFocus={()=>handleError("productName",null)}  value={productName} onChange={(event)=>setProductName(event.target.value)} fullWidth label='Product Name' variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
        <TextField error={!error.description?false:true} helperText={error.description} onFocus={()=>handleError("description",null)}   value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth label='Description' variant="outlined"/>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price Type</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
         value={priceType}
         label="PriceType"
         onChange={handlePriceTypeChange}
         error={!error.priceType?false:true} 
         onFocus={()=>handleError("priceType",null)}
       
        >
          <MenuItem value={'Choose Price Type...'}>Choose Price Type...</MenuItem>
          {fillAllPriceType()}
         
        </Select>
        <div style={{fontSize:12,color:'red',padding:5}}>{error.priceType}</div>
        </FormControl>
       
        
        </Grid>
        <Grid item xs={3}>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Deals</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onClick={handleDeals}
        value={deals}
        error={!error.deals?false:true} 
        onFocus={()=>handleError("deals",null)}
      
      >
        <FormControlLabel  value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel  value="no" control={<Radio />} label="No" />
      
      </RadioGroup>
      <div style={{fontSize:12,color:'red',padding:5}}>{error.deals}</div>
      </FormControl>
        </Grid>
       
        <Grid item xs={3}>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Trending</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={trending}
       onClick={handleTrending}
       error={!error.trending?false:true} 
       onFocus={()=>handleError("trending",null)}
     
      >
        <FormControlLabel  value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      
      </RadioGroup>
      <div style={{fontSize:12,color:'red',padding:5}}>{error.trending}</div>
      </FormControl>
        </Grid>
        <Grid  item xs={6} className={classes.rowStyle}>
            <IconButton  fullWidth color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={handleClickImage}/>
              <PhotoCamera />
            </IconButton>
            <Avatar
           alt="Remy Sharp"
           variant="rounded"
          src={image.filename}
         sx={{ width: 56, height: 56 }}
          />
          </Grid>
          <Grid item xs={6}>
        <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onClick={handleStatus}
        value={status}
        error={!error.status?false:true} 
        onFocus={()=>handleError("status",null)}
      >
        <FormControlLabel   value="Available" control={<Radio />} label="Available" />
        <FormControlLabel value="Not Available" control={<Radio />} label="Not Available" />
      
      </RadioGroup>
      <div style={{fontSize:12,color:'red',padding:5}}>{error.status}</div>
      </FormControl>
  
        </Grid>
          
       
        <Grid item xs={6}>
          <Button fullWidth onClick={handleClickForm} variant="contained">Submit</Button>
        </Grid>
        <Grid item xs={6}>
        <Button fullWidth onClick={clearValue} variant="contained">Reset</Button>
        </Grid>
        
        
        
        </Grid>
    </div>
    </div>)
}