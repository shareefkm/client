import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheckSquare } from "react-icons/ai";

import EmployeeAxios from "../../Axios/EmployeeAxios";
import {
  EMAIL_REGEX,
  IMAGE_REGEX,
  NAME_REGEX,
  PHONE_REGEX,
} from "../../Regex/Regex";
import PasswordModal from "../../assets/PasswordModal";
import EmployeeDetails from "./EmployeeDetails";

function EmployeeProfile() {
  const [employeeData, setEmployeeData] = useState({});
  // const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  // const [is_change, set_change] = useState(false);
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile, setMobile] = useState("");
  // const [password, setPassword] = useState("");
  // const [isInputModal,setInputModal] = useState(false)
  const [form, setForm] = useState(false);
  // const [editedAddress, setEditedAddress] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editMode, setEditMode] = useState(false);
  // const [profImage, setProfImage] = useState(null);
  // const [address, setAddress] = useState([
  //   {
  //     street: "",
  //     city: "",
  //     state: "",
  //     postalCode: "",
  //   },
  // ]);
  // const [newAddress, setNewAddress] = useState({
  //   street: "",
  //   city: "",
  //   state: "",
  //   postalCode: "",
  // });

  const employee = useSelector((state) => state.employee);

  useEffect(() => {
    EmployeeAxios.get(`/getprofile/${employee._id}`)
      .then((response) => {
        setEmployeeData(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  }, [form]);

  const editEmplName = () => {
    if (form) {
      const validName = NAME_REGEX.test(name);
      if (validName) {
        EmployeeAxios.patch("/editprofile", { id:employee._id,name })
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
        toast.error("Please Enter Valid Name", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      }
    }
  };

  // useEffect(() => {
  //   setEditedAddress([...address]);
  // }, [address]);

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   const fileName = event.target.files[0].name;
  //   if (file && IMAGE_REGEX.test(fileName)) {
  //     const reader = new FileReader();
  //     reader.onload = async () => {
  //       setProfImage(reader.result);
  //       try {
  //         const response = await UserAxios.patch("/addimage", {
  //           id: user._id,
  //           image: reader.result,
  //         });
  //         if (response) {
  //           set_change(!is_change);
  //           toast.success(response.data.message, {
  //             position: toast.POSITION.TOP_CENTER,
  //             autoClose: 3000,
  //           });
  //         } else {
  //           toast.error(response.data.message, {
  //             position: toast.POSITION.TOP_CENTER,
  //             autoClose: 3000,
  //           });
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         toast.error(error.response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //           autoClose: 3000,
  //         });
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // };

  // const currentAddress = address && editMode ? address : newAddress;

  // const handleSaveAddress = (userId, index) => {
  //   if (editMode) {
  //     if (
  //       editedAddress.street.trim().length === 0 ||
  //       editedAddress.city.trim().length === 0 ||
  //       editedAddress.state.trim().length === 0 ||
  //       editedAddress.postalCode.trim().length === 0
  //     ) {
  //       toast.error("Please fill all field", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 3000,
  //       });
  //     } else {
  //       UserAxios.patch("/editaddress", {
  //         id: userId,
  //         address: editedAddress,
  //         index,
  //       })
  //         .then((response) => {
  //           if (response) {
  //             set_change(!is_change);
  //             toast.success(response.data.message, {
  //               position: toast.POSITION.TOP_CENTER,
  //               autoClose: 3000,
  //             });
  //           } else {
  //             toast.error(response.data.message, {
  //               position: toast.POSITION.TOP_CENTER,
  //               autoClose: 3000,
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   } else {
  //     if (
  //       newAddress.street.trim().length === 0 ||
  //       newAddress.city.trim().length === 0 ||
  //       newAddress.state.trim().length === 0 ||
  //       newAddress.postalCode.trim().length === 0
  //     ) {
  //       toast.error("Please fill all field", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 3000,
  //       });
  //     } else {
  //       UserAxios.patch("/addaddress", { id: userId, address: newAddress })
  //         .then((response) => {
  //           if (response) {
  //             set_change(!is_change);
  //             toast.success(response.data.message, {
  //               position: toast.POSITION.TOP_CENTER,
  //               autoClose: 3000,
  //             });
  //           } else {
  //             toast.error(response.data.message, {
  //               position: toast.POSITION.TOP_CENTER,
  //               autoClose: 3000,
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           toast.error(error.response.data.message, {
  //             position: toast.POSITION.TOP_CENTER,
  //             autoClose: 3000,
  //           });
  //         });
  //     }
  //   }

  //   setIsModalOpen(false);
  //   setEditMode(false);
  // };

  // const handleDeletAddress = async () => {
  //   if (selectedAddressIndex !== null) {
  //     try {
  //       const response = await UserAxios.patch("/deletaddress", {
  //         id: user._id,
  //         index: selectedAddressIndex,
  //       });
  //       if (response) {
  //         set_change(!is_change);
  //         toast.success(response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //           autoClose: 3000,
  //         });
  //       } else {
  //         toast.error(response.data.message, {
  //           position: toast.POSITION.TOP_CENTER,
  //           autoClose: 3000,
  //         });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       toast.error(error.response.data.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 3000,
  //       });
  //     }
  //     setSelectedAddressIndex(null);
  //   }
  // };

  // const editUserProfile = () => {
  //   if (form) {
  //     const validMobile = PHONE_REGEX.test(mobile);
  //     const validEmail = EMAIL_REGEX.test(email);
  //     const validName = NAME_REGEX.test(name);
  //     if (validMobile && validEmail && validName) {
  //       UserAxios.patch("/editprofile", { name,email,mobile,id:user._id })
  //         .then((response) => {
  //           setForm(!form)
  //           toast.success(response.data.message, {
  //             position: toast.POSITION.TOP_CENTER,
  //             autoClose: 3000,
  //           });
  //         })
  //         .catch((error) => {
  //           toast.error(error.response.data.message, {
  //             position: toast.POSITION.TOP_CENTER,
  //             autoClose: 3000,
  //           });
  //         });
  //     } else {
  //       toast.error("Please Enter Valid Data", {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 3000,
  //       });
  //     }
  //   }
  // };

  // const handleRadioChange = (index) => {
  //   setSelectedAddressIndex(index);
  // };

  // return (
  //   <div className="lg:ml-16 md:mr-16 mb-7 mt-7">
  //     <div className="lg:flex w-full border md:p-5">
  //       <div className="lg:w-1/3 h-screen">
  //         <div className="h-1/3">
  //           <div className="h-44 w-44 flex items-center justify-center bg-gray-300 rounded-full mx-auto">
  //             <label htmlFor="profImage" className="cursor-pointer">
  //               <img
  //                 className="h-full object-cover rounded-full"
  //                 src={
  //                   userData?.data?.user.Image
  //                     ? userData?.data?.user.Image
  //                     : "/images/user.png"
  //                 }
  //                 alt=""
  //               />
  //             </label>
  //             <input
  //               type="file"
  //               id="profImage"
  //               name="profImage"
  //               onChange={handleFileChange}
  //               className="hidden"
  //             />
  //           </div>
  //           <span className="items-center justify-center mx-auto flex font-semibold text-purple text-2xl">
  //             {userData?.data?.user.Name}
  //           </span>
  //         </div>
  //         <div className="h-2/3 border w-full bg-pink-100 lg:p-10">
  //           <div className="h-full bg-slate-100 pt-4">
  //             <div className="flex border-b shadow-md">
  //               <div>

  //             <button
  //               className="mb-4 text-yellow"
  //               onClick={() => {
  //                 setForm(!form);
  //                 editUserProfile()
  //               }}
  //             >
  //               {form ? "Update" : "Edit Profile"}
  //             </button>
  //               </div>
  //               <div className="ml-auto">
  //               <PasswordModal />
  //               </div>
  //             </div>

  //             <p className="leading-loose">
  //               Name:
  //               {form ? (
  //                 <input
  //                 className="float-right"
  //                   type="text"
  //                   id="name"
  //                   name="name"
  //                   value={name}
  //                   onChange={(e) => {
  //                     setName(e.target.value);
  //                   }}
  //                 />
  //               ) : (
  //                 <span className="font-semibold">
  //                   {userData?.data?.user.Name}
  //                 </span>
  //               )}
  //             </p>

  //             <p className="leading-loose">
  //               Email:
  //               {form ? (
  //                 <input
  //                 className="float-right"
  //                   type="text"
  //                   id="email"
  //                   name="email"
  //                   value={email}
  //                   onChange={(e) => {
  //                     setEmail(e.target.value);
  //                   }}
  //                 />
  //               ) : (
  //                 <span className="font-semibold">
  //                   {userData?.data?.user.Email}
  //                 </span>
  //               )}
  //             </p>
  //             <p className="leading-loose">
  //               Mobile:
  //               {form ? (
  //                 <input
  //                 className="float-right"
  //                   type="text"
  //                   id="mobile"
  //                   name="mobile"
  //                   value={mobile}
  //                   onChange={(e) => {
  //                     setMobile(e.target.value);
  //                   }}
  //                 />
  //               ) : (
  //                 <span className="font-semibold">
  //                   {userData?.data?.user.Mobile}
  //                 </span>
  //               )}
  //             </p>
  //           </div>
  //         </div>
  //       </div>

  //       <div className="lg:w-2/3 lg:ml-2 h-screen border">
  //         <div className="h-1/2 w-full bg-pink-100 lg:p-10 leading-loose">
  //           <label className="block text-sm font-medium text-gray-700 underline">
  //             Address :
  //           </label>
  //           <div className="flex items-center justify-around">
  //             {address?.map((elem, index) => (
  //               <div key={index}>
  //                 <input
  //                   type="radio"
  //                   name="selectedAddress"
  //                   value={index}
  //                   checked={selectedAddressIndex === index}
  //                   onChange={() => handleRadioChange(index)}
  //                 />
  //                 <p>Street: {elem?.street}</p>
  //                 <p>City: {elem?.city}</p>
  //                 <p>State: {elem?.state}</p>
  //                 <p>Postal Code: {elem?.postalCode}</p>
  //               </div>
  //             ))}
  //           </div>

  //           <div className="md:flex items-center justify-between shadow-md">
  //           <button
  //             className="p-4 text-green-600"
  //             onClick={() => {
  //               setIsModalOpen(true);
  //               setEditMode(false);
  //             }}
  //           >
  //             Add Address
  //           </button>

  //           <button
  //             className="p-4 text-yellow"
  //             onClick={() => {
  //               if (selectedAddressIndex !== null) {
  //                 setIsModalOpen(true);
  //                 setEditMode(true);
  //               } else {
  //                 toast.error("please select a address", {
  //                   position: toast.POSITION.TOP_CENTER,
  //                   autoClose: 3000,
  //                 });
  //               }
  //             }}
  //           >
  //             Edit Address
  //           </button>

  //           <button
  //             className="p-4 text-red-600"
  //             onClick={() => {
  //               handleDeletAddress();
  //             }}
  //             disabled={selectedAddressIndex === null}
  //           >
  //             Delet Address
  //           </button>
  //           </div>
  //         </div>

  //         <AddressModal
  //           isOpen={isModalOpen}
  //           onClose={() => setIsModalOpen(false)}
  //           address={currentAddress}
  //           onSave={handleSaveAddress}
  //           isEditing={editMode}
  //           editedAddress={editedAddress}
  //           setEditedAddress={setEditedAddress}
  //           setNewAddress={setNewAddress}
  //           index={selectedAddressIndex}
  //         />

  //         <div className="h-1/2 w-full bg-slate-100 lg:p-10"></div>
  //       </div>
  //     </div>
  //   </div>
  // );
  const deliveryPerson = {
    name: "John Doe",
    profilePicture: "path_to_profile_picture.jpg",
    contact: "john.doe@example.com | (123) 456-7890",
    deliverySuccessRate: 92,
    averageDeliveryTime: "35 minutes",
    customerRatings: [
      { orderId: "ABC123", rating: 4.5 },
      { orderId: "DEF456", rating: 5.0 },
      // Add more ratings as needed
    ],
    earnings: {
      totalEarnings: 1500,
      tips: 100,
      bonuses: 200,
    },
    deliveryHistory: [
      {
        orderId: "ABC123",
        date: "2023-09-25",
        status: "Delivered",
        customer: "Jane Smith",
      },
      // Add more delivery history items as needed
    ],
  };
  const renderStarRating = (rating) => {
    const maxStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <span key={i} className="text-yellow">
          &#9733;
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow">
          &#9734;
        </span>
      );
    }

    const emptyStars = maxStars - (filledStars + (hasHalfStar ? 1 : 0));
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">
          &#9734;
        </span>
      );
    }

    return stars;
  };

  const averageRating =
    deliveryPerson.customerRatings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    ) / deliveryPerson.customerRatings.length;

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={
              employeeData.profile?.Image
                ? employeeData.profile?.Image
                : "/images/user.png"
            }
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
          {form ? (
            <div className="flex items-center">
        <input
          className="float-right border"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AiOutlineCheckSquare className="text-green-600" onClick={()=>{
          editEmplName();
        }}/>
        </div>
      ) : (
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">{employeeData.profile?.Name}</h2>
          <FiEdit
            className="text-gray-300 ml-2 cursor-pointer"
            onClick={() => {
              setForm(!form);
            }}
          />
        </div>
      )}
            <p className="text-gray-600">{employeeData.profile?.Email}</p>
            <p className="text-gray-600">{employeeData.profile?.Mobile}</p>
            <div className="flex items-center">
              <p className="mr-2">Rating:</p>
              {renderStarRating(averageRating)}
            </div>
            <p className="text-blue-500 cursor-pointer" onClick={()=>setIsModalOpen(true)}>View Profile</p>
            <EmployeeDetails
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            address={employeeData}
            // onSave={handleSaveAddress}
          />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Earnings</h3>
          <p>Total Earnings: ${deliveryPerson.earnings.totalEarnings}</p>
          {/* <p>Tips: ${deliveryPerson.earnings.tips}</p>
        <p>Bonuses: ${deliveryPerson.earnings.bonuses}</p> */}
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="text-lg font-bold mb-2">Delivery Performance</h3>
        <div className="flex items-center mb-2">
          <span className="text-green-500 mr-2">
            Success Rate: {deliveryPerson.deliverySuccessRate}%
          </span>
          <div className="flex-1 bg-gray-200 h-4 rounded-full">
            <div
              className="bg-green-500 h-full rounded-full"
              style={{ width: `${deliveryPerson.deliverySuccessRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* <div>
        <h3 className="text-lg font-bold mb-2">Delivery History</h3>
        <ul>
          {deliveryPerson.deliveryHistory.map((delivery, index) => (
            <li key={index} className="mb-2">
              <strong>Order ID:</strong> {delivery.orderId}<br />
              <strong>Date:</strong> {delivery.date}<br />
              <strong>Status:</strong> {delivery.status}<br />
              <strong>Customer:</strong> {delivery.customer}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Performance Metrics</h3>
        <p>
          Success Rate: {deliveryPerson.deliverySuccessRate}%
        </p>
        <p>
          Average Delivery Time: {deliveryPerson.averageDeliveryTime}
        </p>
        <h4 className="text-lg font-bold mt-4 mb-2">Customer Ratings</h4>
        <ul>
          {deliveryPerson.customerRatings.map((rating, index) => (
            <li key={index} className="mb-2">
              <strong>Order ID:</strong> {rating.orderId}<br />
              <strong>Rating:</strong> {rating.rating}
            </li>
          ))}
        </ul>
      </div> */}

      {/* Add more sections like delivery history, location, preferences, etc. */}
    </div>
  );
}

export default EmployeeProfile;
