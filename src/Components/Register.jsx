import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import UserAxios from "../Axios/UserAxios.jsx";
import RestaurantAxios from "../Axios/RestaurantAxios.jsx";
import EmployeeAxios from "../Axios/EmployeeAxios.jsx";
import {
  EMAIL_REGEX,
  IMAGE_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
  POSTAL_CODE_REGEX,
  PW_REGEX,
} from "../Regex/Regex.jsx";

function Register(props) {
  const userRef = useRef();
  const errRef = useRef();
  const [Name, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setuserFocus] = useState(false);

  const [Place, setPlace] = useState("");
  const [validPlace, setValidPlace] = useState(false);
  const [placeFocus, setPlaceFocus] = useState(false);

  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [validAddress, setValidAddress] = useState({
    street: false,
    city: false,
    state: false,
    postalCode: false,
  });
  const [addressFocus, setAddressFocus] = useState({
    street: false,
    city: false,
    state: false,
    postalCode: false,
  });

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

  const [id_Proof, setid_Proof] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;
    if (file && IMAGE_REGEX.test(fileName)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result);
        setid_Proof(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl("");
    }
  };

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const result = NAME_REGEX.test(Name);
    setValidName(result);
  }, [Name]);

  useEffect(() => {
    const result = {
      street: NAME_REGEX.test(address.street),
      city: NAME_REGEX.test(address.city),
      state: NAME_REGEX.test(address.state),
      postalCode: POSTAL_CODE_REGEX.test(address.postalCode),
    };
    setValidAddress(result);
  }, [address]);

  const isAddressValid =
    Object.values(validAddress).every((valid) => valid) && id_Proof !== null;

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
    {
      if (props.user) {
        if (Password !== conformPsw) {
          return;
        }
        UserAxios.post("/register", { Name, Email, Mobile, Password }).then(
          (respose) => {
            if (respose.data.success) {
              navigate("/login");
            } else {
              setErrMsg("invalid entry");
              toast.error(respose.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            }
          }
        ).catch((err)=>{
          toast.error(err.respose.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        });
      } else if (props.restaurant) {
        RestaurantAxios.post("/register", {
          Name,
          Email,
          Mobile,
          Password,
          Place,
        }).then((respose) => {
          if (respose.data.success) {
            navigate("/restaurant/login");
          } else {
            setErrMsg("invalid entry");
            toast.error(respose.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        });
      } else {
        EmployeeAxios.post("/register", {
          Name,
          Email,
          Mobile,
          Password,
          address,
          id_Proof,
        }).then((respose) => {
          if (respose.data.success) {
            navigate("/employee/login");
          } else {
            setErrMsg("invalid entry");
            toast.error(respose.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        });
      }
    }
  };

  const emplValidation =
    !validName ||
    !valiPassword ||
    !isAddressValid ||
    !validEmail ||
    !validPhone;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-off-White p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4 ">
          {props.user
            ? `User Registration`
            : props.employee
            ? `Employee Registration`
            : "Registration"}
        </h2>
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
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-indigo"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray"
            >
              Email
              <span className={validEmail ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validEmail || !Email ? "hidden" : "text-red-600 ml-2"
                }
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
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
              <span className={validPhone ? "text-green-600 ml-2" : "hidden"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={
                  validPhone || !Mobile ? "hidden" : "text-red-600 ml-2"
                }
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

          {props.restaurant && (
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
                  className={
                    validPlace || !Place ? "hidden" : "text-red-600 ml-2"
                  }
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
          )}
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
                className={
                  valiPassword || !Password ? "hidden" : "text-red-600 ml-2"
                }
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

          {props.employee && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                  <span
                    className={
                      isAddressValid ? "text-green-600 ml-2" : "hidden"
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span
                    className={
                      isAddressValid || !address
                        ? "hidden"
                        : "text-red-600 ml-2"
                    }
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </label>
                <div className="border rounded-md p-4">
                  <input
                    type="text"
                    name="street"
                    placeholder="Street Address"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="mb-2 border rounded-md focus:ring focus:ring-indigo-200"
                    required
                    aria-invalid={validAddress.street ? false : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => {
                      setAddressFocus(true);
                    }}
                    onBlur={() => {
                      setAddressFocus(false);
                    }}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="mb-2 border rounded-md focus:ring focus:ring-indigo-200"
                    aria-invalid={validAddress.city ? false : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => {
                      setAddressFocus(true);
                    }}
                    onBlur={() => {
                      setAddressFocus(false);
                    }}
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="mb-2 border rounded-md focus:ring focus:ring-indigo-200"
                    aria-invalid={validAddress.state ? false : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => {
                      setAddressFocus(true);
                    }}
                    onBlur={() => {
                      setAddressFocus(false);
                    }}
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    className="mb-2 border rounded-md focus:ring focus:ring-indigo-200"
                    aria-invalid={validAddress.postalCode ? false : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => {
                      setAddressFocus(true);
                    }}
                    onBlur={() => {
                      setAddressFocus(false);
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="border rounded-md">
                  <input
                    type="file"
                    name="idProofFile"
                    onChange={handleFileChange}
                    className="mb-2 border rounded-md focus:ring focus:ring-indigo-200 max-w-full"
                  />
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="max-w-full max-h-full"
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {props.user && (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
                <span
                  className={
                    valiConform && conformPsw ? "text-green-600 ml-2" : "hidden"
                  }
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    valiConform || !conformPsw ? "hidden" : "text-red-600 ml-2"
                  }
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
          )}
          <button
            disabled={
              (props.user && (!validName || !valiPassword || !valiConform)) ||
              (props.restaurant && (!validName || !valiPassword)) ||
              (props.employee && emplValidation)
            }
            type="submit"
            className="bg-cherry-Red text-white py-2 px-10 mb-4 rounded-sm hover:text-green-400 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Sign Up
          </button>
          <div>
            <p>Allready have an account ?</p>
            <p className="text-cherry-Red">
            {props.user && <Link to={"/login"}>Login</Link>}
            {props.restaurant && <Link to={"/restaurant/login"}>Login</Link>}
            {props.employee && <Link to={"/employee/login"}>Login</Link>}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
