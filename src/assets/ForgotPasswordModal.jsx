import React, { useState } from 'react';
import { toast } from 'react-toastify';
import UserAxios from '../Axios/UserAxios';
import RestaurantAxios from '../Axios/RestaurantAxios';
import EmployeeAxios from '../Axios/EmployeeAxios';

const ForgotPasswordModal = ({ closeModal, userType, show }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendResetLink = () => {
    if(userType === "user"){
      UserAxios.post('/forgetpassword', { email })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            closeModal();
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        });
    }else if(userType === "restaurant"){
      RestaurantAxios.post('/forgetpassword', { email })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            closeModal();
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        });
    }else if(userType === "employee"){
      EmployeeAxios.post('/forgetpassword', { email })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            closeModal();
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        });
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? 'modal-open' : ''}`}>
      <div className="bg-white p-6 rounded shadow-lg max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Forgot Password</h2>
          <button className="close-button" onClick={closeModal}>
            <span className="text-red-500 text-2xl">&times;</span>
          </button>
        </div>
        <p className="mb-4">Please enter your email address:</p>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={handleSendResetLink}
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
