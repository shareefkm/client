import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CiWallet } from "react-icons/ci"

import UserAxios from "../../Axios/UserAxios";
import AddressModal from "../../assets/AddressModal";
import {
  EMAIL_REGEX,
  IMAGE_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
} from "../../Regex/Regex";
import PasswordModal from "../../assets/PasswordModal";

function Profile() {
  const [userData, setUserData] = useState({});
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [is_change, set_change] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [isInputModal,setInputModal] = useState(false)
  const [form, setForm] = useState(false);
  const [editedAddress, setEditedAddress] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profImage, setProfImage] = useState(null);
  const [address, setAddress] = useState([
    {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const user = useSelector((state) => state.user);

  useEffect(() => {
    UserAxios.get(`/profile?id=${user._id}`).then((response) => {
      setUserData(response);
      setName(response?.data?.user?.Name);
      setEmail(response?.data?.user?.Email);
      setMobile(response?.data?.user?.Mobile);
      setAddress(response?.data?.user?.Address);
    }).catch((error)=>{
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    })
  }, [is_change,form]);

  useEffect(() => {
    setEditedAddress([...address]);
  }, [address]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;
    if (file && IMAGE_REGEX.test(fileName)) {
      const reader = new FileReader();
      reader.onload = async () => {
        setProfImage(reader.result);
        try {
          const response = await UserAxios.patch("/addimage", {
            id: user._id,
            image: reader.result,
          });
          if (response) {
            set_change(!is_change);
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        } catch (error) {
          console.error(error);
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const currentAddress = address && editMode ? address : newAddress;

  const handleSaveAddress = (userId, index) => {
    if (editMode) {
      if (
        editedAddress.street.trim().length === 0 ||
        editedAddress.city.trim().length === 0 ||
        editedAddress.state.trim().length === 0 ||
        editedAddress.postalCode.trim().length === 0
      ) {
        toast.error("Please fill all field", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        UserAxios.patch("/editaddress", {
          id: userId,
          address: editedAddress,
          index,
        })
          .then((response) => {
            if (response) {
              set_change(!is_change);
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            } else {
              toast.error(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      if (
        newAddress.street.trim().length === 0 ||
        newAddress.city.trim().length === 0 ||
        newAddress.state.trim().length === 0 ||
        newAddress.postalCode.trim().length === 0
      ) {
        toast.error("Please fill all field", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      } else {
        UserAxios.patch("/addaddress", { id: userId, address: newAddress })
          .then((response) => {
            if (response) {
              set_change(!is_change);
              toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            } else {
              toast.error(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000,
              });
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          });
      }
    }

    setIsModalOpen(false);
    setEditMode(false);
  };

  const handleDeletAddress = async () => {
    if (selectedAddressIndex !== null) {
      try {
        const response = await UserAxios.patch("/deletaddress", {
          id: user._id,
          index: selectedAddressIndex,
        });
        if (response) {
          set_change(!is_change);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
      setSelectedAddressIndex(null);
    }
  };

  const editUserProfile = () => {
    if (form) {
      const validMobile = PHONE_REGEX.test(mobile);
      const validEmail = EMAIL_REGEX.test(email);
      const validName = NAME_REGEX.test(name);
      if (validMobile && validEmail && validName) {
        UserAxios.patch("/editprofile", { name,email,mobile,id:user._id })
          .then((response) => {
            setForm(!form)
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          })
          .catch((error) => {
            toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          });
      } else {
        toast.error("Please Enter Valid Data", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  const handleRadioChange = (index) => {
    setSelectedAddressIndex(index);
  };

  return (
    <div className="lg:ml-16 md:mr-16 mb-7 mt-7">
      <div className="lg:flex w-full border md:p-5">
        <div className="lg:w-1/3 h-screen">
          <div className="h-1/3">
            <div className="h-44 w-44 flex items-center justify-center bg-gray-300 rounded-full mx-auto">
              <label htmlFor="profImage" className="cursor-pointer">
                <img
                  className="h-full object-cover rounded-full"
                  src={
                    userData?.data?.user.Image
                      ? userData?.data?.user.Image
                      : "/images/user.png"
                  }
                  alt=""
                />
              </label>
              <input
                type="file"
                id="profImage"
                name="profImage"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <span className="items-center justify-center mx-auto flex font-semibold text-purple text-2xl">
              {userData?.data?.user.Name}
            </span>
          </div>
          <div className="h-2/3 border w-full bg-pink-100 lg:px-10 lg:py-2">
           <span className="flex justify-center "><CiWallet className="text-2xl"/>:{userData?.data?.user.Wallet}</span> 
            <div className="h-full bg-slate-100 pt-4">
              <div className="flex border-b shadow-md">
                <div>

              <button
                className="mb-4 text-yellow"
                onClick={() => {
                  setForm(!form);
                  editUserProfile()
                }}
              >
                {form ? "Update" : "Edit Profile"}
              </button>
                </div>
                <div className="ml-auto">
                <PasswordModal />
                </div>
              </div>
            
              <p className="leading-loose">
                Name:
                {form ? (
                  <input
                  className="float-right"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                ) : (
                  <span className="font-semibold">
                    {userData?.data?.user.Name}
                  </span>
                )}
              </p>

              <p className="leading-loose">
                Email:
                {form ? (
                  <input
                  className="float-right"
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                ) : (
                  <span className="font-semibold">
                    {userData?.data?.user.Email}
                  </span>
                )}
              </p>
              <p className="leading-loose">
                Mobile:
                {form ? (
                  <input
                  className="float-right"
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                ) : (
                  <span className="font-semibold">
                    {userData?.data?.user.Mobile}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-2/3 lg:ml-2 h-screen border">
          <div className="h-1/2 w-full bg-pink-100 lg:p-10 leading-loose">
            <label className="block text-sm font-medium text-gray-700 underline">
              Address :
            </label>
            <div className="flex items-center justify-around">
              {address?.map((elem, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name="selectedAddress"
                    value={index}
                    checked={selectedAddressIndex === index}
                    onChange={() => handleRadioChange(index)}
                  />
                  <p>Street: {elem?.street}</p>
                  <p>City: {elem?.city}</p>
                  <p>State: {elem?.state}</p>
                  <p>Postal Code: {elem?.postalCode}</p>
                </div>
              ))}
            </div>

            <div className="md:flex items-center justify-between shadow-md">
            <button
              className="p-4 text-green-600"
              onClick={() => {
                setIsModalOpen(true);
                setEditMode(false);
              }}
            >
              Add Address
            </button>

            <button
              className="p-4 text-yellow"
              onClick={() => {
                if (selectedAddressIndex !== null) {
                  setIsModalOpen(true);
                  setEditMode(true);
                } else {
                  toast.error("please select a address", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                  });
                }
              }}
            >
              Edit Address
            </button>

            <button
              className="p-4 text-red-600"
              onClick={() => {
                handleDeletAddress();
              }}
              disabled={selectedAddressIndex === null}
            >
              Delet Address
            </button>
            </div>
          </div>

          <AddressModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            address={currentAddress}
            onSave={handleSaveAddress}
            isEditing={editMode}
            editedAddress={editedAddress}
            setEditedAddress={setEditedAddress}
            setNewAddress={setNewAddress}
            index={selectedAddressIndex}
          />

          <div className="h-1/2 w-full bg-slate-100 lg:p-10"></div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
