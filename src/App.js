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
import AllJobs from './Pages/AllJobs';
import Pricing from './Pages/Pricing';
import ChangeDuration from './Pages/ChangeDuration';





function App() {

  const [User, setUser] = useState(null);
  const [EmployerUser, setEmployerUser] = useState(null);
  const [pricevalue] = useState([]);

  const location = useLocation().pathname;
  const isEmployerRoute = location === '/employerspostjob';
  const isJobSeekerRoute = location === '/jobseeker';
  const isEmployerListRoute = location === '/allemployer';
  const isAllJobsRoute = location === '/alljobs';
  const isPricingRoute = location === '/pricing';
  const isChangeDurationRoute = location === '/changeduration';

  if (location === '/adminlogin') {
    return (
      <>
        <Routes>
          <Route exact path="/adminlogin" element={<AdminLogin setUser={setUser} />} />
          <Route exact path="/jobseeker" element={<JobSeeker setUser={setUser} />} />
          <Route exact path="/allemployer" element={<AllEmployer setUser={setUser} />} />
          <Route exact path="/alljobs" element={<AllJobs setUser={setUser} />} />
          <Route exact path="/pricing" element={<Pricing setUser={setUser} />} />
          <Route exact path="/changeduration" element={<ChangeDuration setUser={setUser} />} />
        </Routes >
      </>
    )
  }
  else if (location === '/employerspostjob') {
    return (
      <>
        <EmployeNavbar EmployerUser={EmployerUser} setEmployerUser={setEmployerUser} />
        <EmployersPostJob pricevalue={pricevalue} />
        <Footer />
      </>
    )
  }

  return (
    <>
      {
        isEmployerRoute ? <EmployeNavbar EmployerUser={EmployerUser} setEmployerUser={setEmployerUser} />
          : isJobSeekerRoute ||
            isEmployerListRoute ||
            isAllJobsRoute ||
            isPricingRoute ||
            isChangeDurationRoute ? null : <Navbar User={User} setUser={setUser} />
      }
      <Routes>
        <Route exact path="/" element={<FindJobs />} />
        <Route exact path="/signin" element={<SignIn User={User} setUser={setUser} />} />
        <Route exact path="/employersignin" element={<EmployerSignIn EmployerUser={EmployerUser} setEmployerUser={setEmployerUser} />} />
        <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        <Route exact path="/employerspostjob" element={<EmployersPostJob pricevalue={pricevalue} />} />
        <Route exact path="/ragister" element={<Ragister setUser={setUser} />} />
        <Route exact path="/employerregister" element={<EmployerRegister setUser={setUser} />} />
        <Route exact path="/adminlogin" element={<AdminLogin setUser={setUser} />} />
        <Route exact path="/jobseeker" element={<JobSeeker setUser={setUser} />} />
        <Route exact path="/allemployer" element={<AllEmployer setUser={setUser} />} />
        <Route exact path="/alljobs" element={<AllJobs setUser={setUser} />} />
        <Route exact path="/pricing" element={<Pricing setUser={setUser} />} />
        <Route exact path="/changeduration" element={<ChangeDuration setUser={setUser} />} />
      </Routes>
      {
        location !== "/adminlogin"
          && !isJobSeekerRoute
          && !isEmployerListRoute
          && !isAllJobsRoute
          && !isPricingRoute
          && !isChangeDurationRoute
          && location !== '/forgetpassword'
          && !isEmployerRoute ? null : null
      }
      {
        location !== "/jobseeker" &&
        location !== '/allemployer' &&
        location !== '/alljobs' &&
        location !== '/pricing' &&
        location !== '/changeduration' &&
        location !== '/forgetpassword' &&
        <Footer />
      }
    </>
  );
}

export default App;
