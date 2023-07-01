
import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    maincontainer:{
        background:'#dfe6e9',
       // width:"100vw",
        height:"100vh",
        display:'flex',
  //     justifyContent:'center',
        alignItems:'center'

    },
    box:{
        background:"#fff",
        width:'45%',
        borderRadius:10 ,
        marginLeft:'22%',
        padding: 10     
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