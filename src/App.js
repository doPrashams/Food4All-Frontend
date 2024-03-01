import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './Components/Footer/Footer';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/SignUpForm/SignUpForm';
import HomePage from './Components/HomePage/HomePage';
import Donate from './Components/Donate/Donate';
import Location from './Components/Location/Location';
import AdminHomePage from './Components/Admin/AdminHomePage';
import AdminAddHotspot from './Components/Admin/AdminAddHotspot';
import AdminAddDonor from './Components/Admin/AdminAddDonor';
import AdminRemoveDonor from './Components/Admin/AdminRemoveDonor';
import AdminRemoveHotspot from './Components/Admin/AdminRemoveHotspot';

function App() {
  return (
   <Router>
     <div className="scrolling-background">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/location" element={<Location />} />
        <Route path="/AdminHome" element={<AdminHomePage />} />
        <Route path="/AdminAddDonor" element={<AdminAddDonor />} />
        <Route path="/AdminRemoveDonor" element={<AdminRemoveDonor />} />
        <Route path="/AdminAddHotspot" element={<AdminAddHotspot />} />
        <Route path="/AdminRemoveHotspot" element={<AdminRemoveHotspot />} />
      </Routes>
      <Footer />
    </div>
   </Router>
  );
}

export default App;
