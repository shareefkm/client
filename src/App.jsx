import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import './App.css'
import UserRoute from "./Routes/UserRoute";
import AdminRoute from "./Routes/AdminRoute";
import RestaurantRoute from "./Routes/RestaurantRoute";
import EmployeeRoute from "./Routes/EmployeeRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoute />} />
          <Route path="/restaurant/*" element={<RestaurantRoute/>} />
          <Route path="/employee/*" element={<EmployeeRoute/>} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
