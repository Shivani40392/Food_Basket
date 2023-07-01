import { useState } from "react";
import {
    TextField, Grid, Button,
    IconButton,
    Avatar
} from "@mui/material";
import { useStyles } from "./CategoryCSS";
import { PhotoCamera } from "@mui/icons-material";
import { postData } from "../services/ServerServices";
import Swal from "sweetalert2";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import DisplayAllCategories from "./DisplayAllCategories";
export default function Category() {
    var classes = useStyles()
    var navigate=useNavigate()
    var admin=JSON.parse(localStorage.getItem('ADMIN'))
    const [icon, setIcon] = useState({ filename: './assets/category.png', bytes: '' })
    const [companyid, setcompanyid] = useState('')
    const [category, setcategory] = useState('')
    const [description, setdescription] = useState('')
    const [error,setError]=useState({})
    const handleClick = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })

    }
    const handleClickForm = async () => {
        var cd=new Date()
        var dd=cd.getFullYear()+"/"+(cd.getMonth()+1)+"/"+cd.getDate()+" "+cd.getHours()+':'+cd.getMinutes()+":"+cd.getSeconds()
        var formData = new FormData()
        if(validation()){
        formData.append('companyid', admin.companyid)
        formData.append('category', category)
        formData.append('description', description)
        formData.append('icon', icon.bytes)
        formData.append('createdat', dd)
        formData.append('updatedat', dd)
        formData.append('createdby', "ADMIN")
        var result = await postData('category/add_categories', formData)
        if(result.status){
            
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
        clearValue()
    }
    }

   const  clearValue=()=>{
     setIcon({ filename: './assets/category.png', bytes: '' })
     setcategory('')
     setdescription('')
     setcompanyid('')
   }
   const handleError=(inputs,value)=>{
    setError(prev=>({...prev,[inputs]:value}))
   }
   const validation=()=>{
    var isVaild=true
    
    if(!category){
        handleError("category",'Invaild Category')
        isVaild=false
      }
      if(!description){
        handleError("description",'Invail description')
        isVaild=false
      }
    return isVaild
   }
    return (
        <div className={classes.maincontainer}>
            <div className={classes.box}>
                <Grid container spacing={2}   >
                    <Grid item xs={12} className={classes.headingStyle}>
                        <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                       <div> Category Insertion</div>
                       <div><FormatListBulletedIcon onClick={()=>navigate('/dashboard/displayallcategories')}/></div>
                       </div>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField     onChange={(event) => setcompanyid(event.target.value)} value={admin.companyid} fullWidth label='Company Id' variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField error={!error.category?false:true} helperText={error.category} onFocus={()=>handleError("category",null)}onChange={(event) => setcategory(event.target.value)} value={category} fullWidth label='Category' variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField error={!error.description?false:true} helperText={error.description} onFocus={()=>handleError("description",null)} onChange={(event) => setdescription(event.target.value)} value={description} fullWidth label='Description' variant="outlined" />
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
                    <Grid item xs={6}>

                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={handleClickForm} fullWidth variant="contained">Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={clearValue} fullWidth variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>

    )
}