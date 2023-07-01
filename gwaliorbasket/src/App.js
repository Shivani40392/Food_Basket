
import Company from './components/administrator/Company';
import DisplayAllCompanies from './components/administrator/DisplayAll Companies'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AdminLogin from './components/administrator2/AdminLogin';
import Dashboard from './components/administrator2/Dashboard';
import Home from './components/userinterface/screens/Home';
import Banner from './components/administrator2/Banner'
import HomePageDrawer from './components/userinterface/usercomponents/HomePageDrawer';
import AllCategory from './components/userinterface/screens/AllCategory';
import ProductDetail from './components/userinterface/screens/ProductDetail';
import DeliveryCart from './components/userinterface/screens/DeliveryCart';
import PayementGateway from './components/userinterface/usercomponents/PaymentGateway';

function App() {
  return (
     <div>
      <Router>
        <Routes>
          <Route element={<Company/>} path={"/company"}/>
          <Route element={<DisplayAllCompanies/>} path={"/displayallcompanies"}/>
          <Route element={<AdminLogin/>} path={"/adminlogin"}/>
          <Route element={<Dashboard/>} path={"/dashboard/*"}/>
          <Route element={<Home/>} path={"/home"}/>
          <Route element={<HomePageDrawer/>} path={"/homepagedrawer"}/>
          <Route element={<AllCategory/>} path={"/allcategory"}/>
          <Route element={<ProductDetail/>} path={"/product"}/>
          <Route element={<DeliveryCart/>} path={"/cart"}/>
          <Route element={<PayementGateway/>} path={"/paymentgateway"}/>
        </Routes>
      </Router>
     </div>
  );
}

export default App;
