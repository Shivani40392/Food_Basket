import useRazorpay from "react-razorpay";
import { ServerURL } from "../../services/ServerServices";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function PayementGateway() {
  const Razorpay = useRazorpay();
  var dispatch=useDispatch()
  var navigate=useNavigate()
  var product=useSelector((state)=>state.cart)
  var productRecord=Object.values(product)
  var user=useSelector((state)=>state.user)
  var userdata=Object.values(user)[0]
  var total=productRecord.reduce((a,b)=>{
    return (a+b.offerprice*b.qty)
   },0)
   total=total+55
  const handlePayment = ()=> {
    

    const options = {
      key: "rzp_test_GQ6XaPC6gMPNwH",
      amount: total*100,
      currency: "INR",
      name: "Gwalior Basket",
      description: "Test Transaction",
      image: `/assets/target logo.png`,
     
      handler: (res) => {
        console.log(res);
        dispatch({type:'CLEAR_CART',payload:[]})
        navigate('/home')
      },
      prefill: {
        name: userdata[0].fullname,
        email: "youremail@example.com",
        contact: userdata[0].mobileno,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }
  useEffect(function(){
    var timeout=setTimeout(handlePayment,1000)
    },[])

  return (
    <div className="App">
    </div>
  );
}