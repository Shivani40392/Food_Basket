import MaterialTable from "@material-table/core";
import { Avatar ,Button,Dialog,DialogActions,DialogContentText,DialogContent,DialogTitle,Switch} from "@mui/material";
import { useEffect,useState } from "react";
import { getData,postData,ServerURL} from "../services/ServerServices";
import { useStyles } from "./DisplayAllCategoriesCSS";
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Grid,
  IconButton,} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from "react-router-dom";
import Category from "./Catergory";
export default function DisplayAllCategories(){
    var classes=useStyles()
    var navigate=useNavigate()
    const [categories,setCategories]=useState([])
    const [open,setOpen]=useState('')
    const [icon, setIcon] = useState({ filename: './assets/category.png', bytes: '' })
    const [companyid, setcompanyid] = useState('')
    const [category, setcategory] = useState('')
    const [description, setdescription] = useState('')
    const [categoryid,setCategoryid]=useState('')
    
    const handleClick = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }
    const fetchAllcategories=async()=>{
        var result=await getData('category/fetch_all_categories')
        setCategories(result.data)
       
        
    }
    useEffect(function(){
        fetchAllcategories()
    },[])
    const handleOpenDailog=(rowData)=>{
      setIcon({ filename: './assets/category.png', bytes: '' })
      setcategory(rowData.category)
      setdescription(rowData.description)
      setcompanyid(rowData.companyid)
      setCategoryid(rowData.categoryid)
      setOpen(true)
    }
    const handleClose=()=>{
     
      setOpen(false)
    }
   const handleEditData=async()=>{
    var cd=new Date()
    var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+":"+cd.getMinutes()+":"+cd.getSeconds()
    var body={
      'companyid':companyid,
      'category':category,
      'description':description,
      'categoryid':categoryid,
      'updatedat':dd
    }
    var result= await postData('category/edit_category_data',body)
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
    fetchAllcategories()
   } 
    const handleDelete=async(rowData)=>{
     
      Swal.fire({
       title: 'Do you want to delete Category?',
      
       showCancelButton: true,
       confirmButtonText: 'Delete',
       
     }).then(async(result) => {
       /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) {
        var  res=await postData('category/delete_category_data',{categoryid:rowData.categoryid})
        if(res.status){
         Swal.fire('Deleted!', '', 'success')
         fetchAllcategories()
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
    const ShowCategoriesDetail=()=>{
      return (
        <div>
          
          <Dialog
            open={open}
           // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{display:'flex',justifyContent:"space-between"}}>
              <div>Edit Category</div>
              <div><CloseIcon  style={{cursor:'pointer'}} onClick={handleClose}/></div>
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2} style={{marginTop:5}} >
                    

                    <Grid item xs={6}>
                        <TextField onChange={(event) => setcompanyid(event.target.value)} value={companyid} fullWidth label='Company Id' variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField onChange={(event) => setcategory(event.target.value)} value={category} fullWidth label='Category' variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={(event) => setdescription(event.target.value)} value={description} fullWidth label='Description' variant="outlined" />
                    </Grid>
                    <Grid item xs={6} className={classes.rowStyle}>
                        <IconButton fullWidth color="primary" aria-label="upload picture" component="label">
                            <input hidden accept="image/*" type="file" onChange={handleClick} />
                            <PhotoCamera />
                        </IconButton>
                        <Avatar
                            alt="Remy Sharp"
                            variant="rounded"
                            src={icon.filename}
                            sx={{ width: 56, height: 56 }}
                        />
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
        </div>
      );
    }
    function showAllCategories() {
        return (
         
          <MaterialTable
            title={<span className={classes.headingStyle}>Categories</span>}
            columns={[
              { title: 'CompanyID', field: 'companyid' ,
              render:rowData=><div>{rowData.companyid}<br/>{rowData.companyname}</div>},
              { title: 'Category', field: 'category' }, 

              { title: 'Description', field: 'description' },
              {
                title: 'Icon',field: 'icon',
                render:rowData=><Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{width:50,height:50}} variant="rounded"/>
              },
              {
                title: 'Last Update',field: 'createdat',
                render:rowData=><div>{rowData.createdat}<br/>{rowData.updatedat}<br/>{rowData.createdby}</div>
              },
            ]}
            data={categories}        
            actions={[
              {
                icon: 'add',
                isFreeAction:true,
                tooltip: 'ADD CATEGORY',
                onClick: (event) => navigate('/dashboard/category')
              },
              {
                icon: 'edit',
                tooltip: 'Edit User',
                onClick: (event, rowData) => handleOpenDailog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete User',
                onClick: (event, rowData) => handleDelete(rowData)
              }
            ]}
          />
        )
      }
    return(<div className={classes.maincontainer}>
        <div className={classes.box}>{showAllCategories()}
        {ShowCategoriesDetail()}
        </div></div>)
}