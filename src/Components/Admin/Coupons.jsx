import React, { useEffect, useState } from 'react'
import CouponModall from '../../assets/CouponModall'
import AdminAxios from '../../Axios/AdminAxios';


function Coupons() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coupon,setCoupon] = useState()


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const coupons = async ()=>{
    const { data } = await AdminAxios.get('/getcoupon')
    setCoupon(data)
  }
  useEffect(()=>{
    coupons()
  },[])
  return (
    <div>
        <h1 className='mb-5 mt-5 text-center text-lg font-bold'>Coupons</h1>
     <div className="overflow-x-auto pt-3">
     <table className="min-w-full divide-y divide-gray-200 bg-purple">
       <thead>
         <tr>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Coupon Code
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Discount %
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Expiry Date
           </th>
           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Actions
           </th>
         </tr>
       </thead>
       <tbody className="bg-white divide-y divide-gray-200">
       {coupon?.coupons.map((data,i) => (
       <tr >
         <td className="px-6 py-2 whitespace-nowrap">{data.couponCode}</td>
         <td className="px-6 py-2 whitespace-nowrap">{data.discountPercentage}</td>
         <td className="px-6 py-2 whitespace-nowrap">{data.expirationDate}</td>
         <td className="px-6 py-2 whitespace-nowrap">
           {
        //      data.Is_blocked ? 
        //    (<button
        //      className="text-blue-600 hover:text-blue-900 mr-2"
        //      onClick={() => handleBlockStatus(data._id)}
        //    >
        //      Ublock
        //    </button>) :
           (<button
             className="text-red-600 hover:text-red-900"
             onClick={() => handleBlockStatus(data._id)}
           >
             Block
           </button>)
               }
         </td>
       </tr>
     ))}
       </tbody>
     </table>
   </div>
   <button
        className="bg-cherry-Red text-off-White px-3 py-1 rounded"
        onClick={openModal}
      >
        Create Coupon
      </button>
      <CouponModall isOpen={isModalOpen} closeModal={closeModal} />
   </div>
  )
}

export default Coupons
