import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./USER/pages/LandingPage";
import EventsView from "./USER/pages/EventsView";
import BasicExample from "./USER/components/Header";
import TicketView from "./USER/pages/TicketView";
import Auth from "./USER/components/Auth";
import OrderView from "./USER/pages/OrderView";
import SuccessPayment from "./USER/pages/SuccessPayment";
import CancelPayment from "./USER/pages/CancelPayment";
import AdminLogin from "./ADMIN/Components/AdminLogin";
import AdminDasboard from "./ADMIN/Pages/AdminDasboard";
import AdminEvents from "./ADMIN/Pages/AdminEvents";
import AddEvent from "./ADMIN/Components/AddEvent";
import AdminOrdersView from "./ADMIN/Pages/AdminOrdersView";
import SearchPage from "./USER/pages/SearchPage";
import { useContext, useEffect, useState } from "react";
import { tokenAuthorisationContext } from "./ADMIN/Context/TokenAuth";
import Forgotpassword from "./USER/pages/Forgotpassword";

function App() {
  const[userloged,setUserLoged]=useState(false)
  const{isAuthorizes, setIsAuthorizes}=useContext(tokenAuthorisationContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setUserLoged(true)
    }else{setUserLoged(false)}
  },[])


  return (
    <>
      <Routes>

        {/* Admin routes */}
        <Route path="/adminlogin" element={<AdminLogin />}></Route>
        <Route path="/admindashboard" element={isAuthorizes?<AdminDasboard />:<LandingPage/>}></Route>
        <Route path="/adminsports" element={isAuthorizes?<AdminEvents sports/>:<LandingPage/>}></Route>
        <Route path="/adminevents" element={isAuthorizes?<AdminEvents />:<LandingPage/>}></Route>
        <Route path="/addevent" element={isAuthorizes?<AddEvent/>:<LandingPage/>}></Route>
        <Route path="/orderview" element={isAuthorizes?<AdminOrdersView/>:<LandingPage/>}></Route>


         {/* user Routes */}
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path='/login' element={<Auth />}/>
        <Route path='/forgotpassword' element={<Forgotpassword />}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path="/events" element={<EventsView />}></Route>
        <Route path="/sports" element={<EventsView sports />}></Route>
        <Route path="/ticket/:id" element={userloged?<TicketView />:<LandingPage/>}></Route>
        <Route path="/order" element={userloged?<OrderView />:<LandingPage/>}></Route>
        <Route path="/success" element={userloged?<SuccessPayment />:<LandingPage/>}></Route>
        <Route path="/cancel" element={userloged?<CancelPayment />:<LandingPage/>}></Route>
        <Route path='/*' element={<LandingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
