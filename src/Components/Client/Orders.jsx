import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import UserAxios from "../../Axios/UserAxios";
import OrderTrack from "../../assets/OrderTrack";

function Orders() {
  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;
  const [orderItem, setOrderItem] = useState([]);
  const [cartId, setCartId] = useState({});
  const [is_chage, setChange] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemData, setItemDta] = useState({});

  const user = useSelector((state) => state.user);

  useEffect(() => {
    UserAxios.get(`/getorders?id=${user._id}`).then((response) => {
      const items = response.data.orders;
      setOrderItem(items);
    });
  }, [is_chage]);

  const openModal = (ele) => {
    setIsModalOpen(true);
    setItemDta(ele)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const cancelOrder = async (orderId,itemId) => {
    const result = await Swal.fire({
      title: "Do you really want to cancel this Order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      UserAxios.patch("/cancelorder", {
        itemId,
        orderId,
        userId:user._id
      }).then((response) => {
        setChange(!is_chage);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
    }
  };

  return (
    <div className="p-10">
      <div className="border md:flex">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-table-blue text-off-White">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    QUANTITY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    RATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    PRICE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                {orderItem.map((item) => (
                  <Fragment key={item._id}>
                    {console.log(item.item)}
                    {item.item.map((ele) => (
                      <tr key={ele._id}>
                        <td
                          className="flex px-6 py-2 whitespace-nowrap"
                          onClick={() => openModal(ele)}
                        >
                          <img
                            src={ele.product?.images}
                            alt=""
                            className="h-10 w-10 mr-10"
                          />

                          {ele.product?.name}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {ele?.quantity}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {ele.product?.price}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {ele?.price}
                          <h1 hidden> {(total = total + ele.price)}</h1>
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap flex justify-center">
                          {(ele.orderStatus === "Delivered") ? (<div className="bg-green-500 text-white rounded-full p-2">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>) : (
                            <button
                              onClick={() => cancelOrder(item._id,ele._id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>)
                          }
                        </td>
                      </tr>
                    ))}
                    <OrderTrack
                      isOpen={isModalOpen}
                      closeModal={closeModal}
                      orderItem={itemData}
                    />
                  </Fragment>
                ))}
                <tr className="px-6 py-2 whitespace-nowra justify-between items-end">
                  <td></td>
                  <td></td>
                  <td className="text-lg font-semibold">Total:</td>
                  <td className="text-end text-lg font-semibold">{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Orders;
