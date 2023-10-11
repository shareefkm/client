import React, { useState } from 'react';
import { toast } from 'react-toastify';

import AdminAxios from '../Axios/AdminAxios';

const CouponModall = ({ isOpen, closeModal }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [usageLimit, setUsageLimit] = useState('');

  const handleSaveCoupon = () => {
    AdminAxios.post('/createcoupon',{couponCode,discountPercentage,expirationDate,usageLimit}).then((response)=>{
        toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          closeModal();
    }).catch((err)=>{
        toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
    })
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-10 w-96">
        <h2 className="text-2xl mb-4">Create a New Coupon</h2>
        <div className="mb-4">
          <label htmlFor="couponCode" className="block text-sm font-medium text-gray-700">Coupon Code</label>
          <input
            id="couponCode"
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount Percentage</label>
          <input
            id="discountPercentage"
            type="number"
            placeholder="Enter discount percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
          <input
            id="expirationDate"
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">Usage Limit</label>
          <input
            id="usageLimit"
            type="number"
            placeholder="Enter usage limit"
            value={usageLimit}
            onChange={(e) => setUsageLimit(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSaveCoupon}
          >
            Save Coupon
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CouponModall;