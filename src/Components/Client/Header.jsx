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
import Selector from "../../assets/Selector";
import { userLogout } from "../../Redux/Auth/UserSlice";
import { restaurantLogout } from "../../Redux/Auth/RestaurantSlice";

function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user
  });

  const restaurant = useSelector((state) => {
    return state.restaurant
  });

  const logout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  const rlogout = () => {
    dispatch(restaurantLogout());
    navigate("/restaurant");
  };

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
          <div className="flex ml-auto mr-5 mt-1 space-x-4">
            <div>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div> 
              {user.token && props.user ? (
                <div>
                  <span>{user.user}</span>
                  <Link onClick={logout}>Logout</Link>
                </div>
              ) : restaurant.token && props.restaurant ? (
                <div>
                  <span>{restaurant.restaurant}</span>
                  <Link onClick={rlogout}>Logout</Link>
                </div>
              ) :(
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
