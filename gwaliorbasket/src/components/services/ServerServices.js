import axios from "axios"

const ServerURL="http://localhost:5000"

const getData=async(URL)=>{
    
 try{
  var response=await axios.get(`${ServerURL}/${URL}`,{headers:{Authorization:"Bearer "+localStorage.getItem("TOKEN")}})
  var result= await response.data
  
  return result
 }
 catch(e){
    return null
 }
}
const postData=async(URL,body)=>{
    
   try{
    var response=await axios.post(`${ServerURL}/${URL}`,body,
  {headers:{Authorization:"Bearer "+localStorage.getItem("TOKEN")}}
   )
    var result= await response.data
    
    return result
   }
   catch(e){
      return null
   }
  }
export {ServerURL,getData,postData}