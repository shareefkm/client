import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import BillModal from "../../assets/BillModal";
import Pagination from "../../assets/Pagination";
import { USER_API } from "../../Constants/API";

const baseUrl = USER_API

function OrdersItems() {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [itemData, setItemDta] = useState({});
  const [cartId, setCartId] = useState({});
  const [is_chage, setChange] = useState(false);
  const [is_statusUpdated, setStatusUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [socket, setSocket] = useState(null);
  const [orderStatus,setOrderStatus] = useState()
  const { id } = useParams()
  let total = 0;
  const restaurant = useSelector((state) => state.restaurant);

  // useEffect(() => {
  //   RestaurantAxios.get(`/vieworders?id=${restaurant._id}`)
  //     .then((response) => {
  //       const items = response.data.orders;
  //       if (response.data.orders.length) {
  //         setOrderItem(items);
  //       } else {
  //         toast.error("No orders", {
  //           position: toast.POSITION.TOP_CENTER,
  //           autoClose: 1500,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message, {
  //         position: toast.POSITION.TOP_CENTER,
  //         autoClose: 1500,
  //       });
  //     });
  // }, []);

  // const itemsPerPage = 5;
  // const totalPages = Math.ceil(orderItem.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = orderItem.slice(startIndex, endIndex);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  useEffect(()=>{
    RestaurantAxios.get(`/getorderitems?id=${id}`).then((response)=>{
      setOrderItem(response.data.orderItems)
    })
  },[is_chage,is_statusUpdated])
   // Initialize the socket connection
   useEffect(() => {
    const newSocket = io(baseUrl);
    setSocket(newSocket);

    newSocket.on("error", (error) => {
      console.log(error);
    });

    // Cleanup socket connection when the component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [baseUrl]);

  useEffect(() => {
    if (socket) {
      socket.on("order-status-update", (data) => {
        setOrderStatus(data)
        console.log("Order status update received:", data);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  const openModal = (ele) => {
    setModalOpen(true);
    setItemDta(ele);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateDeliveryStatus = (prodId, orderStatus) => {
    const updateStatus = {
      prodId,
      orderId:orderItem._id,
      orderStatus,
    }
    RestaurantAxios.patch("/updatedelivery", {
      prodId,
      orderId:orderItem._id,
      orderStatus,
    }).then((response) => {
      setStatusUpdated(!is_statusUpdated);
    });
    socket.emit("update-order-status", { updateStatus });
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
      RestaurantAxios.patch("/cancelorder", {
        itemId,
        orderId,
        userId:orderItem.userId
      }).then((response) => {
        setChange(!is_chage);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
    }
  };

  return (
    <div className="p-10">
      <BillModal
        isOpen={modalOpen}
        closeModal={closeModal}
        orderItem={itemData}
      />
      <div className="border flex">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-table-blue">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    QUANTITY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    RATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    PRICE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                    {orderItem?.item?.map((ele, ind) => (
                        <tr key={ele._id}>
                          {}
                          <td
                            className="flex px-6 py-2 whitespace-nowrap"
                            onClick={() => openModal(orderItem)}
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
                            {/* {ele.product?.price} */}

                           </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {ele?.price}
                            <h1 hidden> {(total = total + ele.price)}</h1>
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {(ele.is_canceled)?(<h1 className="text-cherry-Red">Order Rejected</h1>):
                              <button
                                className="text-green-300 bg-cherry-Red cursor-pointer p-1 flex items-center justify-center rounded"
                                onClick={()=>{updateDeliveryStatus(ele._id, ele.orderStatus)}}
                                
                              >
                                {(ele.orderStatus === "Pending" ? "Accept" : ele.orderStatus)}
                              </button>
                            }
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
                            </div>) :(ele.is_canceled)?(<button className="text-cherry-Red">Order Rejected</button>):(
                                   <button
                                   onClick={() => cancelOrder(orderItem._id, ele._id)}
                                   className="text-red-600 hover:text-red-900"
                                 >
                                   Cancel
                                 </button>)
                                }
                          </td>
                        </tr>
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
          {/* <div className="float-right mr-3 mt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default OrdersItems;
