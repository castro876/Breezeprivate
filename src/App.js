import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cust from './Page/Cust';
import Logg from './Page/Loginin';
import Regist from './Page/Register';
import Dashboard from './Components/dash_component/dashboard';
import Home_Admin_Page from './Page/Home_ad';
import Reset_Page from './Page/Reset';
import PrivateRoute from './Components/private_route_component/PrivateRoute'; // Protected route component
import UsrAdmin from './Components/admin_component/usr_admin';
import UAccess from './Page/Uadmin';
import OrderDetails from './Components/dash_component/order_info';
import Policy from './Components/policy_component/usr_policy';

import SendEmailComponent from "./Components/email_component/emailj"

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Cust />} />
          <Route path="/orders" element={<OrderDetails />} />
          <Route path="/signup" element={<Regist />} />
          <Route path="/signin" element={<Logg />} />
          <Route path="/reset" element={<Reset_Page />} />
          <Route path="/access" element={<UsrAdmin />} />
          <Route path="/pannel" element={<UAccess />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/email" element={<SendEmailComponent />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute requiredRole="user">
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <Home_Admin_Page />
              </PrivateRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<Cust />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
