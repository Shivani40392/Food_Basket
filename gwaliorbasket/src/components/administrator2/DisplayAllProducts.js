import MaterialTable from "@material-table/core";
import { useEffect } from "react";
import { useState } from "react";
import {
  Avatar, Dialog, DialogContent, DialogActions,
  DialogContentText, Button, DialogTitle, TextField, Grid,
  FormControl, InputLabel, Select,
  MenuItem, FormControlLabel, RadioGroup, Radio, FormLabel
} from "@mui/material";
import { ServerURL, getData, postData } from "../services/ServerServices";
import { useStyles } from "./DisplayAllProductCSS";
import CloseIcon from '@mui/icons-material/Close';
import { PhotoCamera } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Products from "./Products";

import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function DisplayAllProducts() {
  var classes = useStyles()
  var navigate=useNavigate()
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  var [products, setProducts] = useState([])
  var [open, setOpen] = useState(false)
  var [categories, setCategories] = useState([])
  var [category, setCategory] = useState('')
  var [priceType, setPriceType] = useState('')
  var [pTArray, setPTArray] = useState([])
  var [image, setImage] = useState({ filename: './assets/product.png', bytes: '' })
  var [status, setStatus] = useState()
  var [companyid, setCompanyid] = useState(admin.com)
  var [description, setDescription] = useState()
  var [productName, setProductName] = useState()
  var [trending, setTrending] = useState()
  var [deals, setDeals] = useState()
  var [productid, setProductid] = useState()
  var [btnStatus,setBtnStatus]=useState(false)
  var [oldImage,setOldImage]=useState()
  var [message,setMessage]=useState('')
  const fetchallproducts = async () => {
    var result = await getData('products/fetchallproducts')
    setProducts(result.data)
    console.log(result.data)
  }
  const handleClose = () => {
    setOpen(false)
    setMessage('')
  }
  const handleOpenDailog = (rowData) => {
    
    setOpen(true)
    setProductid(rowData.productid)
    setCompanyid(rowData.companyid)
    setCategory(rowData.categoryid)
    setProductName(rowData.productname)
    setDescription(rowData.description)
    setStatus(rowData.status)
    setTrending(rowData.trending)
    setDeals(rowData.deals)
    setPriceType(rowData.pricetype)
    setImage({ filename: `${ServerURL}/images/${rowData.image}`, bytes: '' })
    setOldImage(rowData.image)
  }
  useEffect(function () {
    fetchallproducts()
  }, [])
  const fetchallcategory = async () => {
    var result = await getData('products/fetch_all_category')
    setCategories(result.data)
  }
  const fillAllCategory = () => {
    return categories.map((item) => {
      return (<MenuItem value={item.categoryid}>{item.category}</MenuItem>)
    })
  }
  const fetchallPriceType = async () => {
    var result = await getData('products/fetch_all_pricetype')
    setPTArray(result.data)
  }
  const fillAllPriceType = () => {
    return pTArray.map((item) => {
      return (<MenuItem value={item.pricetypeid}>{item.pricetypename}</MenuItem>)
    })
  }
  useEffect(function () {
    fetchallcategory()
    fetchallPriceType()
  }, [])
  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }
  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value)
  }
  const handleClickImage = (event) => {
    setImage({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
  }
  const handleStatus = (event) => {
    setStatus(event.target.value)
  }
  const handleTrending = (event) => {
    setTrending(event.target.value)
  }
  const handleDeals = (event) => {
    setDeals(event.target.value)
  }
  const handleEditData = async() => {
    var cd=new Date()
    var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
    var body={
    'productid':productid,
    'companyid':companyid,
    'categoryid':category,
    'productname':productName,
    'description':description,
    'pricetype':priceType,
    'status':status,
    'trending':trending,
    'deals':deals,
    'updatedat':dd}
    setMessage('')
     
    var result= await postData('products/edit_products_data',body)
    if(result.status){

      setOpen(false)
    Swal.fire({
      icon: 'success',
      title: result.message,
     
    })
    
    }
    else{
     
    Swal.fire({
      icon: 'error',
      title: result.message,
     
    })
    }
    fetchallproducts()

  }
  const handleDelete=async(rowData)=>{
    Swal.fire({
      title: 'Do you want to delete Category?',
     
      showCancelButton: true,
      confirmButtonText: 'Delete',
      
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
       var  res=await postData('products/delete_products_data',{productid:rowData.productid})
       if(res.status){
        Swal.fire('Deleted!', '', 'success')
        fetchallproducts()
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
     
    fetchallproducts()
  }
  const handleSave=async()=>{
    var formData=new FormData()
    formData.append('image',image.bytes)
    formData.append('productid',productid)
    var result=await postData('products/edit_products_logo',formData)
    if(result.status){ 
      setMessage('assets/tick.gif') 
    }
    else{
      setMessage('')
    }
    fetchallproducts()
    setBtnStatus(false)
    
    
  }
  const handleCancel=()=>{
    setImage({filename:`${ServerURL}/images/${oldImage}`,bytes:''})
    setBtnStatus(false)
   setOldImage('')
  }
  const PictureButton=()=>{
    return(<div>{btnStatus?<div style={{display:'flex',padding:10}}><Button onClick={handleSave}>Save</Button><Button onClick={handleCancel}>Cancel</Button></div>:<div >
      <img src={`${message}`} width="50"/></div>}</div>)
  }
  const showProductDetail = () => {
    return (<div>

      <Dialog

        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"

      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>Edit Product Detail</div>
            <div><CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} /></div>
          </div>
        </DialogTitle>
        <DialogContent>

          <Grid container spacing={2} style={{marginTop:5}}>
            <Grid item xs={6}>
              <TextField value={companyid} onChange={(event) => setCompanyid(event.target.value)} fullWidth label='Company ID' variant="outlined" />
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
                >
                  <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                  {fillAllCategory()}

                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField value={productName} onChange={(event) => setProductName(event.target.value)} fullWidth label='Product Name' variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label='Description' variant="outlined" />
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

                >
                  <FormControlLabel  value="Available" control={<Radio />} label="Available" />
                  <FormControlLabel value="Not Available" control={<Radio />} label="Not Available" />

                </RadioGroup>
              </FormControl>

            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Trending</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onClick={handleTrending}
                  value={trending}
                >
                  <FormControlLabel  value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel  value="no" control={<Radio />} label="No" />

                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Deals</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onClick={handleDeals}
                  value={deals}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />

                </RadioGroup>
              </FormControl>
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
                >
                  <MenuItem value={'Choose Price Type...'}>Choose Price Type...</MenuItem>
                  {fillAllPriceType()}

                </Select>
              </FormControl>


            </Grid>
            <Grid item xs={6} className={classes.rowStyle}>
              <IconButton fullWidth color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleClickImage} />
                <PhotoCamera />
              </IconButton>
              <Avatar
                alt="Remy Sharp"
                variant="rounded"
                src={image.filename}
                sx={{ width: 56, height: 56 }}
              />
              <PictureButton/>
            </Grid>


          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit</Button>
          <Button onClick={handleClose} >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>)

  }
  function showAllProducts() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Product Detail</span>}
        columns={[
          { title: 'CompanyName', field: 'companyname/Category',
          render: rowData =><div> <div>{rowData.companyname}</div><div>{rowData.categoryname}</div></div> },
         
          {
            title: 'Product Name', feild: 'productname',
            render: rowData => <div> <div>{rowData.productname}</div></div>
          },
         
          { title: 'Trending/Deals', field: 'trending',
          render: rowData => <div> <div>{rowData.trending}/{rowData.deals}</div></div> },
        
          { title: 'Price Type', field: 'pricetypes' },
        
         
          {
            title: 'image', field: 'image',
            render: rowData => <Avatar src={`${ServerURL}/images/${rowData.image}`} style={{ width: 50, height: 50 }} variant="rounded" />
          },

        ]}
        data={products}

        actions={[
          {
          icon: 'add',
                isFreeAction:true,
                tooltip: 'ADD PRODUCTS',
                onClick: (event) => navigate('/dashboard/products')},
          {
            icon: 'edit',
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleOpenDailog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event,rowData) => handleDelete(rowData)
          }
        ]}
      />
    )
  }
  return (
    <div className={classes.maincontainer}>
      <div className={classes.box}>{showAllProducts()}
        {showProductDetail()}
      </div></div>
  )
}