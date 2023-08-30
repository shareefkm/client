import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck,faTimes} from "@fortawesome/free-solid-svg-icons";

import UserAxios from "../../Axios/UserAxios.jsx";
import RestaurantAxios from "../../Axios/RestaurantAxios.jsx";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PW_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const NAME_REGEX = /^[A-Za-z]{4,20}$/;
const PHONE_REGEX = /^[0-9]{10}$/;
function Register(props) {
  const userRef = useRef();
  const errRef = useRef();
  const [Name, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setuserFocus] = useState(false);

  const [Place, setPlace] = useState("");
  const [validPlace, setValidPlace] = useState(false);
  const [placeFocus, setPlaceFocus] = useState(false);

  const [Email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [Password, setPassword] = useState("");
  const [valiPassword, setValiPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [Mobile, setPhone] = useState("");
  const [validPhone, setValiPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [conformPsw, setConformPsw] = useState("");
  const [valiConform, setValidConform] = useState(false);
  const [conformFocus, setConformFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const result = NAME_REGEX.test(Name);
    setValidName(result);
  }, [Name]);

  useEffect(() => {
    const result = NAME_REGEX.test(Place);
    setValidPlace(result);
  }, [Place]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(Email);
    setValidEmail(result);
  }, [Email]);

  useEffect(() => {
    const result = PHONE_REGEX.test(Mobile);
    setValiPhone(result);
  }, [Mobile]);

  useEffect(() => {
    const result = PW_REGEX.test(Password);
    setValiPassword(result);
    const match = Password === conformPsw;
    setValidConform(match);
  }, [Password, conformPsw]);

  useEffect(() => {
    setErrMsg("");
  }, [Name, Password, conformPsw]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    { if(props.user){
      if(Password !== conformPsw){
        return;
      }
      UserAxios.post("/register", { Name, Email, Mobile, Password, }).then((respose) => {
        if (respose.data.success) {
          navigate('/login')
        } else {
          console.log("error");
          setErrMsg("invalid entry");
        }
      });
    }else if(props.restaurant){
      RestaurantAxios.post("/register", { Name, Email, Mobile, Password,Place }).then((respose) => {
        console.log(respose);
        if (respose.data.success) {
          navigate('/restaurant/login')
        } else {
          console.log("error");
          setErrMsg("invalid entry");
        }
      });
    };
  }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">Registration</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
              <span className={validName ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validName || !Name ? "hidden" : "text-red-600 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
              aria-invalid={validName ? false : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setuserFocus(true);
              }}
              onBlur={() => {
                setuserFocus(false);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
              <span className={validEmail ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validEmail || !Email ? "hidden" : "text-red-600 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              aria-invalid={validEmail ? false : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setEmailFocus(true);
              }}
              onBlur={() => {
                setEmailFocus(false);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
              <span className={validPhone ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPhone || !Mobile ? "hidden" : "text-red-600 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="text"
              id="mobile"
              autoComplete="off"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
              aria-invalid={validPhone ? false : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setPhoneFocus(true);
              }}
              onBlur={() => {
                setPhoneFocus(false);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your Phone number"
            />
          </div>
          { props.restaurant && 
          <div className="mb-6">
            <label
              htmlFor="place"
              className="block text-sm font-medium text-gray-700"
            >
              Location
              <span className={validPlace ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={validPlace || !Place ? "hidden" : "text-red-600 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="place"
              id="place"
              autoComplete="off"
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              required
              aria-invalid={validPlace ? false : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setPlaceFocus(true);
              }}
              onBlur={() => {
                setPlaceFocus(false);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your Location"
            />
          </div>
            }
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
              <span className={valiPassword ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={valiPassword || !Password ? "hidden" : "text-red-600 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              aria-invalid={valiPassword ? false : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setPasswordFocus(true);
              }}
              onBlur={() => {
                setPasswordFocus(false);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
          </div>
          { props.user &&
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
              <span className={valiConform && conformPsw ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={valiConform || !conformPsw ? "hidden" : "text-red-600 ml-2"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="confirmpassword"
              autoComplete="off"
              onChange={(e) => {
                setConformPsw(e.target.value);
              }}
              required
              aria-invalid={valiConform ? false : "true"}
              aria-describedby="uidnote"
              onFocus={() => {
                setConformFocus(true);
              }}
              onBlur={() => {
                setConformFocus(false);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo-200"
              placeholder="Re enter your password"
            />
          </div>
          }
          <button
            disabled={ 
              (props.user && (!validName || !valiPassword || !valiConform)) ||
              (props.restaurant && (!validName || !valiPassword))    
            }
            type="submit"
            className="bg-yellow text-white py-2 px-10 mb-4 rounded-sm hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Sign Up
          </button>
          <p>
              Allready have an account ? <br />
              {
                props.user &&
              <Link to={'/login'}>Sign in</Link>
              }{
                props.restaurant &&
              <Link to={'/restaurant/login'}>Sign Up</Link>
              }
            </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
