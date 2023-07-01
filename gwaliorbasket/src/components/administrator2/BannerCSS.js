import { makeStyles } from "@mui/styles";

export const useStyles= makeStyles({
    maincontainer: {
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
     // width: '100vw',
        height: '100vh',
        background: '#dfe6e9'
    },
    box: {
        padding: 12,
        marign: 10,
        background: '#fff',
        width:'65%',     
        borderRadius:10      
    },
     headingStyle:
    {  
         fontSize:18,
        fontFamily:'poppins',
        fontWeight:'bold'
    },
    rowStyle1:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between"

    },
    rowStyle:{
        display:'flex',
        flexDirection:'row'

    }
})