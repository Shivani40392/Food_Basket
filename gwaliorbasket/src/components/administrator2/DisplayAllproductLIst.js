import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { useStyles } from "./DisplayAllproductListCSS";
import { postData,getData } from "../services/ServerServices";
import { Button,Grid,TextField,FormControl,MenuItem,Select} from "@mui/material";
import {Dialog,DialogActions,DialogTitle,DialogContent,InputLabel} from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
export default function DisplayAllproductList(){
    const [products,setProducts]=useState()
    const [companyid,setCompanyid]=useState()
    const [category,setCategory]=useState('')
   const [productlist,setProductlist]=useState([])
   const [product,setProduct]=useState('')
   const [categories,setCategories]=useState([])
   const [weight,setWeight]=useState()
   const [price,setPrice]=useState()
   const [OfferPrice,setOfferPrice]=useState()
   const [description,setDescription]=useState()
   const [open,setOpen]=useState(false)
   const [productlistid,setProductlistid]=useState()
   var classes=useStyles()
   var navigate=useNavigate()
    const fetchAllProductList=async()=>{
      var result=await getData('productlist/fetch_all_productlist')
      setProducts(result.data)
      console.log("DATA:",result.data);
    }
    useEffect(function(){
        fetchAllProductList()
    },[])
    useEffect(function(){
      fetchAllCategory()
   },[])
    const handleOpenDailog=(rowData)=>
    {
   
    setCompanyid(rowData.companyid)
    setDescription(rowData.description)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setWeight(rowData.weight)
    setCategory(rowData.categoryid)
    setProduct(rowData.productid)
    setOpen(true)
    setProductlistid(rowData.productlistid)
    }
    const handleClose=()=>{
      setOpen(false)
    }
    
   var handleEdit=async()=>{
    var cd=new Date()
    var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
    var body={
    'companyid':companyid,
    'description':description,
    'price':price,
    'offerprice':OfferPrice,
    'weight':weight,
    'categoryid':category,
    'productid':product,
    'updatedat':dd,
    'productlistid':productlistid
  }
 var result=await postData('productlist/edit_productlist_data',body)
 
 if(result.status){
  setOpen(false)
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
  fetchAllProductList()
  
 }
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
const handleDelete=async(rowData)=>{
  setOpen(false)
     Swal.fire({
      title: 'Do you want to delete company record?',
     
      showCancelButton: true,
      confirmButtonText: 'Delete',
      
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       var res=await postData('productlist/delete_productlist_data',{productlistid:rowData.productlistid})
       if(res.status){
        Swal.fire('Deleted!', '', 'success')
        fetchAllProductList()
       }
      
      else
       {
        Swal.fire({
          icon: 'error',
          title: result.message,
         
        })
      
       }

      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
     
}
    const showProductDetails=()=>{
      return(
        <div>
           
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{display:'flex',justifyContent:'space-between'}}>
        <div  style={{display:'flex',alignItems:'center'}}>
        <img src='./assets/foodbasket.png' width="40"/>
         Product Detail</div>
         <div style={{cursor:'pointer'}}><CloseIcon  onClick={handleClose} /></div>
         </div>
        </DialogTitle>
        <DialogContent>
      
    <Grid container spacing={2} style={{marginTop:5}}>
    <Grid item xs={6}>
    <TextField  value={companyid} onChange={(event)=>setCompanyid(event.target.value)}fullWidth label="CompanyId" variant="outlined" />
    </Grid>
    <Grid item xs={6}>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
       
         onChange={handleCategoryChange}
        
         
        >
          <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
          {fillAllCategory()}
          </Select>
        
      </FormControl>
    </Grid>
    <Grid item xs={6} >
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={product}
          label="Product"
        onChange={handleProductChange}
        
        >
          <MenuItem value={'Choose Product...'}>Choose Product...</MenuItem>
          {fillAllProduct()}
          </Select>
        
         
      </FormControl>
    </Grid >
    <Grid item xs={6}>
    <TextField    value={weight} onChange={(event)=>setWeight(event.target.value)} fullWidth label="Weight" variant="outlined" />
    </Grid>
    <Grid item xs={6}>
    <TextField value={price} onChange={(event)=>setPrice(event.target.value)} fullWidth label="Price" variant="outlined" />
    </Grid>
    <Grid item xs={6}>
    <TextField   value={OfferPrice} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth label="OfferPrice" variant="outlined" />
    </Grid>
    <Grid item xs={12}>
    <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
    </Grid>
   
   
    </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>Edit</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </div>
      )
    }
    function showAllProductList() {
        return (
          <MaterialTable
          title={<span className={classes.headingStyle}>ProductList Detail</span>}
          columns={[
            { title: 'Company', field: 'companyname',
          render:rowData=><div>{rowData.companyid}<br/>{rowData.companyname}</div> },
            { title: 'Category', field: 'category' },
            { title: 'Product', field: 'product'},
            {
              title: 'Weight',
              field: 'weight',
             render:rowData=><div>{rowData.weight}</div>
            },
            {
              title: 'Price/OfferPrice',
              field: 'price',
             render:rowData=><div>{rowData.price}/{rowData.offerprice}</div>
            },
            {
              title: 'Description',
              field: 'description',
             
            },
           
          ]}
          data={products}        
          actions={[
            {
              icon: 'add',
              isFreeAction:true,
              tooltip: 'ADD IMAGES',
              onClick: () =>navigate('/dashboard/productlist')
            },
            {
              icon: 'edit',
              tooltip: 'Edit',
              onClick: (event,rowData) =>handleOpenDailog(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) =>handleDelete(rowData)
            },
          ]}
        />
        )
      }
    return(
        <div className={classes.maincontainer}>
          <div className={classes.box}> {showAllProductList()}
          {showProductDetails()}
          </div>
        </div>
    )
}