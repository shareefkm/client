import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PasswordModal from "./PasswordModal";

function EmployeeDetails({
  isOpen,
  onClose,
  address,
  onSave,
  isEditing,
  setEditedAddress,
  editedAddress,
  setNewAddress,
  index,
}) {
  const userId = useSelector((state) => state.user._id);

  const handleSave = () => {
    onSave(userId, index);
    onClose();
  };

//   console.log(address.profile.address);
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-900 opacity-50"></div>

      <div
        className={`modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg overflow-y-auto transform ${
          isOpen ? "scale-100" : "scale-0"
        } transition-transform duration-500 ease-in-out`}
      >
        <div className="modal-header flex justify-between p-3 bg-cherry-Red text-off-White">
          <h2 className="text-xl font-semibold">
            Address Details
          </h2>
          <button className="modal-close text-3xl" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={address.profile?.address?.street}
            className="w-full border rounded-md p-2"
            readOnly
          />
        </div>

        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={address.profile?.address?.city}
            className="w-full border rounded-md p-2"
            readOnly
          />
        </div>
        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={address.profile?.address?.state}
            className="w-full border rounded-md p-2"
            readOnly
          />
        </div>
        <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={address.profile?.address?.postalCode}
            readOnly
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* <div className="modal-body p-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Id
          </label> */}
          {/* <input
            type="text"
            name="postalCode"
            value={address.profile.address?.postalCode}
            readOnly
            className="w-full border rounded-md p-2"
          /> */}
          {/* <img className="h-32 w-56" src={address.profile?.id_Proof} alt="/images/user.png" />
        </div> */}

        <div className="modal-footer p-3 bg-gray-800 items-center justify-center flex">
          <button
            className="text-cherry-Red font-bold text-lg py-2 px-4 rounded"
          >
            <PasswordModal />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;

