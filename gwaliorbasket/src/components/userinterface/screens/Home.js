import Header from "../usercomponents/Header"
import MainSlider from "../usercomponents/MainSlider"
import DealsSlider from "../usercomponents/DealsSlider"
import Spacer from "../usercomponents/Spacer"
import Footer from "../usercomponents/Footer"
import TrendingProduct from "../usercomponents/TrendingProduct."
import Footer2 from "../usercomponents/Footer2"
import ExploreCategory from "../usercomponents/ExploreCategory"
import BestDeals from "../usercomponents/BestDeals"
import PoppularProducts from "../usercomponents/PopularProducts"
export default function Home(props){
 return(<div>
    <Header/>
    <div style={{display:'flex',alignItems:'center',flexDirection:'column',justifyContent:'center',margin:10}}>
    <div style={{width:'90%'}}>
        <MainSlider/>
    </div>
    <div style={{width:'90%'}}>
        <Spacer/>
       <DealsSlider/>
       
    </div>
    <div style={{width:'90%'}}>
        <Spacer/>
        <Spacer/>
       <TrendingProduct/>
       
    </div>
    <div  style={{width:'90%'}}>
       <Spacer/>
       <Spacer/>
       <ExploreCategory/>
     </div>
     <div  style={{width:'90%'}}>
       <Spacer/>
       <Spacer/>
       <BestDeals/>
     </div>
     <div  style={{width:'90%'}}>
       <Spacer/>
       <Spacer/>
       <PoppularProducts/>
     </div>
    <div  style={{width:'90%'}}>
       <Spacer/>
       <Spacer/>
       <Footer2/>
     </div>
     
    </div>
    
    </div>)
}