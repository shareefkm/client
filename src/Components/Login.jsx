import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import UserAxios from "../Axios/UserAxios.jsx";
import { setCredentials } from "../Redux/Auth/UserSlice.jsx";
import RestaurantAxios from "../Axios/RestaurantAxios.jsx";
import { restaurantLogin } from "../Redux/Auth/RestaurantSlice.jsx";
import Button from "../assets/Button.jsx";
import EmployeeAxios from "../Axios/EmployeeAxios.jsx";
import { employeeLogin } from "../Redux/Auth/EmployeeSlice.jsx";
import AdminAxios from "../Axios/AdminAxios.jsx";
import { adminLogin } from "../Redux/Auth/AdminSlice.jsx";
import { toast } from "react-toastify";

function Login(props) {
  const [Email, setEmail] = useState("");

  const [Password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setErrMsg("");
  }, [Email, Password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.admin) {
      AdminAxios.post("/login", { Email, Password })
        .then((respose) => {
          if (respose.data.success) {
            const data = respose.data;
            dispatch(
              adminLogin({ token: data.token, admin: data.admin.Email })
            );
            navigate("/admin");
          } else {
            setErrMsg("invalid entry");
            toast.error(respose.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    } else if (props.restaurant) {
      RestaurantAxios.post("/login", { Email, Password })
        .then((response) => {
          if (response.data.success) {
            const data = response.data;
            dispatch(
              restaurantLogin({
                token: data.token,
                restaurant: data.restaurant.Name,
                _id:data.restaurant._id
              })
            );
            navigate("/restaurant");
          } else {
            setErrMsg("invalid entry");
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    } else if (props.employee) {
      EmployeeAxios.post("/login", { Email, Password })
        .then((respose) => {
          if (respose.data.success) {
            const data = respose.data;
            dispatch(
              employeeLogin({ token: data.token, employee: data.employee.Name })
            );
            navigate("/employee");
          } else {
            setErrMsg("invalid entry");
            toast.error(respose.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    } else {
      UserAxios.post("/login", { Email, Password })
        .then((respose) => {
          if (respose.data.success) {
            const data = respose.data;
            dispatch(
              setCredentials({ token: data.token, user: data.user.Name, _id:data.user._id})
            );
            navigate("/");
          } else {
            setErrMsg("invalid entry");
            toast.error(respose.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
    }
  };

  const isData = props.user || props.employee || props.restaurant;
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
          <Button value={"Login"} />
          {isData && (
            <div>
              <p>Don't have an account ?</p>
              <p className="text-cherry-Red">
              {props.user && <Link to={"/register"}>Sign Up</Link>}
              {props.restaurant && (
                <Link to={"/restaurant/register"}>Sign Up</Link>
              )}
              {props.employee && <Link to={"/employee/register"}>Sign Up</Link>}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
