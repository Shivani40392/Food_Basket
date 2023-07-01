import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    maincontainer:{
        background:'#dfe6e9',
      //  width:"100vw",
        height:"100vh",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    box:{
        background:"#fff",
        width:'50%',
       
        borderRadius:10 ,
        margin: 10,
        padding: 15   
    },
    headingStyle:{
        fontFamily:'poppins',
        fontSize:18,
        fontWeight:'bold'
    },
    rowStyle:{
        display:'flex',
        flexDirection:'row'

    }
})