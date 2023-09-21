import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {FaShoppingCart} from 'react-icons/fa'
import { FiLogOut} from 'react-icons/fi'

import Selector from "../../assets/Selector";
import { userLogout } from "../../Redux/Auth/UserSlice";
import { restaurantLogout } from "../../Redux/Auth/RestaurantSlice";
import { employeeLogout } from "../../Redux/Auth/EmployeeSlice";
import { adminLogout } from "../../Redux/Auth/AdminSlice";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user
  });

  const restaurant = useSelector((state) => {
    return state.restaurant
  });

  const employee = useSelector((state)=>{
    return state.employee
  })

  const admin = useSelector((state)=>{
    return state.admin
  })

  const logout = () => {
    dispatch(userLogout());
    setTimeout(()=>{
      navigate("/");
    })
  };

  const rlogout = () => {
    dispatch(restaurantLogout());
    navigate("/restaurant");
  };

  const emplLogout = ()=>{
    dispatch(employeeLogout());
    navigate("/employee")
  }

  const adLogout = ()=>{
    dispatch(adminLogout())
    navigate("/admin")
  }

  return (
    <div>
      <div className="border h-10">
        <div className="flex">
          <div className="sm:flex items-center justify-center space-x-4">
            <div className="ml-5 flex">
              <img src="https://flagcdn.com/in.svg" width="20" alt="India" />
              <Selector />
            </div>
            <div>
              <span className="invisible md:visible">1234-567890</span>
            </div>
          </div>
          <div className="flex ml-auto mr-5 mt-1 space-x-7">
            <div className="cursor-pointer">
              <FontAwesomeIcon icon={faUser} onClick={()=>{employee.token && props.employee && navigate('/employee/profile')}}/>
            </div>
            
            <div> 
              {user.token && props.user ? (
                <div className="flex justify-center items-center mt-1 space-x-7">
                <div className="cursor-pointer">
                <FaShoppingCart onClick={()=>{navigate('/cart')}}/>
                </div>
                <div className="cursor-pointer">
                  <Link onClick={logout}><FiLogOut/></Link>
                </div>
                </div>
                
              ) : restaurant.token && props.restaurant ? (
                <div>
                  <span>{restaurant.restaurant}</span>
                  <Link onClick={rlogout}>Logout</Link>
                </div>
              ): employee.token && props.employee ? (
                <div className=""> 
                  <span className="mr-3">{employee.employee}</span>
                  <Link className="mr-3" to = '/employee/orders'>Orders</Link>
                  <Link className="mr-3" onClick={emplLogout}>Logout</Link>
                </div>
              ):
              admin.token && props.admin ? (
                <div>
                  <span>{admin.admin}</span>
                  <Link onClick={adLogout}>Logout</Link>
                </div>
              ):(
                <Link to={props.value}>Login</Link>
              )}
              
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
