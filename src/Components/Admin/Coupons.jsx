import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CouponModall from "../../assets/CouponModall";
import AdminAxios from "../../Axios/AdminAxios";

function Coupons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupon, setCoupon] = useState();
  const [is_deleted,setIs_deleted] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const coupons = async () => {
    const { data } = await AdminAxios.get("/getcoupon");
    setCoupon(data);
  };
  useEffect(() => {
    coupons();
  }, [is_deleted,coupon]);

  const deleteCoupon = async (couponId)=>{
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      AdminAxios.delete(`/deletecoupon?id=${couponId}`).then((response)=>{
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setIs_deleted(!is_deleted)
      })
    }
  }
  return (
    <div>
      <h1 className="mb-5 mt-5 text-center text-lg font-bold">Coupons</h1>
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
            {coupon?.coupons.map((data, i) => {
              const formattedDate = new Date(
                data.expirationDate
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <tr key={i}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {data.couponCode}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {data.discountPercentage}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    {formattedDate}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => deleteCoupon(data._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
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
  );
}

export default Coupons;
