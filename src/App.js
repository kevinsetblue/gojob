import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Footer from './Components/Footer';
import FindJobs from './Pages/FindJobs';
import ForgetPassword from './Components/ForgetPassword';
import EmployersPostJob from './Pages/EmployersPostJob';
import Ragister from './Components/Ragister';
import EmployeNavbar from './Components/EmployeNavbar';
import EmployerSignIn from './Pages/EmployerSignIn';
import { useState } from 'react';
import EmployerRegister from './Pages/EmployerRegister';
import AdminLogin from './Pages/AdminLogin';
import JobSeeker from './Pages/JobSeeker';
import AllEmployer from './Pages/AllEmployer';
import DashBoard from './Pages/DashBoard';
import AllJobs from './Pages/AllJobs';
import ErrorPage from './Components/ErrorPage';
import Pricing from './Pages/Pricing';
import ChangeDuration from './Pages/ChangeDuration';
function App() {

  const [User, setUser] = useState(null);
  const [EmployerUser, setEmployerUser] = useState(null);
  const [pricevalue, setPricevalue] = useState([]);
  // const [GoogleUser, setGoogleUser] = useState(null);


  const location = useLocation().pathname;
  const isEmployerRoute = location === '/employerspostjob';

  if (location === '/adminlogin') {
    return (
      <>
        <Routes>
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route exact path="/jobseeker" element={<JobSeeker />} />
          <Route exact path="/allemployer" element={<AllEmployer />} />
          <Route exact path="/alljobs" element={<AllJobs />} />
          <Route exact path="/pricing" element={<Pricing />} />
          <Route exact path="/changeduration" element={<ChangeDuration />} />
        </Routes>

      </>
    )
  }


  return (
    <>
      {isEmployerRoute ? (
        <EmployeNavbar EmployerUser={EmployerUser} setEmployerUser={setEmployerUser} />
      ) : (
        <Navbar User={User} setUser={setUser} />
      )}
      <Routes>
        <Route exact path="/" element={<FindJobs />} />
        <Route exact path="/signin" element={<SignIn User={User} setUser={setUser} />} />
        <Route exact path="/employersignin" element={<EmployerSignIn EmployerUser={EmployerUser} setEmployerUser={setEmployerUser} />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route exact path="/employerspostjob" element={<EmployersPostJob pricevalue={pricevalue} />} />
        <Route exact path="/ragister" element={<Ragister />} />
        <Route exact path="/employerregister" element={<EmployerRegister />} />
        <Route exact path="/dashboard" element={<DashBoard User={User} setUser={setUser} />} />
        <Route exact path="/adminlogin" element={<AdminLogin />} />
        <Route exact path="/jobseeker" element={<JobSeeker />} />
        <Route exact path="/allemployer" element={<AllEmployer />} />
        <Route exact path="/alljobs" element={<AllJobs />} />
        <Route exact path="/pricing" element={<Pricing />} />
        <Route exact path="/changeduration" element={<ChangeDuration />} />
      </Routes>
      {
        location !== "/adminlogin"
        && location !== "/dashboard"
        && location !== '/jobseeker'
        && location !== '/allemployer'
        && location !== '/pricing'
        && location !== '/changeduration'
        && <Footer />
      }
    </>
  );
}

export default App;
