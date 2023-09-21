import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import { PW_REGEX } from "../Regex/Regex";
import UserAxios from "../Axios/UserAxios";
import { useSelector } from "react-redux";

function PasswordModal() {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = useSelector((state) => state.user);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const validPsw = PW_REGEX.test(newPassword);
      if (validPsw) {
        if (newPassword === confirmPassword) {
          const response = await UserAxios.patch("/editpassword", {
            oldPassword,
            newPassword,
            _id: user._id,
          });
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            handleClose();
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
          }
        } else {
          toast.error("Passwords do not match.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      } else {
        toast.error(
          "Passwords must include uppercase,lowercase,special charector and number",
          {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="relative">
    <button className="text-yellow mr-2" onClick={handleOpen}>
      Change Password
    </button>
    {open && (
      <div className={`fixed inset-0 flex items-center justify-center z-50  `}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className={`modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto transform  transition-transform duration-500 `}>
          
        <div className="modal-header flex justify-between p-3 bg-cherry-Red text-off-White">
          <h2 className="text-xl font-semibold">
            Change Password
          </h2>
          <button className="modal-close text-3xl" onClick={handleClose}>
            &times;
          </button>
        </div>
          <ToastContainer />
          <form onSubmit={handleChangePassword}>
            <div className="mb-3 p-3">
              <label htmlFor="oldPassword" className="block text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-3 p-3">
              <label htmlFor="newPassword" className="block text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="mb-4 p-3">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>

            <div className="text-center bg-gray-800">
              <button
                type="submit"
                className="text-cherry-Red font-bold text-lg py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
  );
}

export default PasswordModal;
