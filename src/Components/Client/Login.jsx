import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";

import UserAxios from "../../Axios/UserAxios.jsx";
import { setCredentials } from "../../Redux/Auth/UserSlice.jsx";
import RestaurantAxios from "../../Axios/RestaurantAxios.jsx"
import {restaurantLogin} from "../../Redux/Auth/RestaurantSlice.jsx"
import Button from "../../assets/Button.jsx";

function Login(props) {
  const [Email, setEmail] = useState("");

  const [Password, setPassword] = useState("");
  
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setErrMsg("");
  }, [Email, Password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(props.user){
    UserAxios.post("/login", { Email, Password }).then((respose) => {
      if (respose.data.success) {
        const data = respose.data
        dispatch(setCredentials({token:data.token,user:data.user.Name}))
        navigate('/')
      } else {
        console.log("error");
        setErrMsg("invalid entry");
      }
    });
  }else if(props.restaurant){
    RestaurantAxios.post("/login", { Email, Password }).then((respose) => {
      console.log(respose);
      if (respose.data.success) {
        const data = respose.data
        dispatch(restaurantLogin({token:data.token,restaurant:data.restaurant.Name}))
        navigate('/restaurant')
      } else {
        console.log("error");
        setErrMsg("invalid entry");
      }
    });
  }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          <Button value={"Login"}/>
          <p>
              Don't have an account ? <br />{
                props.user &&
              <Link to={'/register'}>Sign Up</Link>
              }{
                props.restaurant &&
              <Link to={'/restaurant/register'}>Sign Up</Link>
              }
            </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
