import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import UserAxios from "../../Axios/UserAxios";
import RestaurantAxios from "../../Axios/RestaurantAxios";
import BillModal from "../../assets/BillModal";
import Pagination from "../../assets/Pagination";
// import { socket } from "../../Axios/EmployeeAxios";

function OrdersData() {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [itemData, setItemDta] = useState({});
  const [cartId, setCartId] = useState({});
  const [is_chage, setChange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;

  const user = useSelector((state) => state.user);
  const restaurant = useSelector((state) => state.restaurant);

  useEffect(() => {
    RestaurantAxios.get(`/vieworders?id=${restaurant._id}`)
      .then((response) => {
        const items = response.data.orders;
        if (response.data.orders.length) {
          setOrderItem(items);
        } else {
          toast.error("No orders", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  }, []);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(orderItem.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = orderItem.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   socket.on("deliveryStatusUpdated", ({ prodId, orderStatus }) => {
  //     const updatedOrders = orderItem.map((order) => {
  //       if (order._id === prodId) {
  //         return {
  //           ...order,
  //           orderStatus: orderStatus,
  //         };
  //       }
  //       return order;
  //     });
  //     setOrderItem(updatedOrders);
  //   });

  //   return () => {
  //     socket.off("deliveryStatusUpdated");
  //   };
  // }, []);

  const openModal = (ele) => {
    setModalOpen(true);
    setItemDta(ele);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const cancelCartItem = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      UserAxios.patch("/cancelcartitem", {
        itemId: id,
        cartId: cartId._id,
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
                {currentItems.map((item) => (
                  <React.Fragment key={item._id}>
                    {item.item
                      .filter((data) => data.product !== null)
                      .map((ele, ind) => (
                        <tr key={ele._id}>
                          <td
                            className="flex px-6 py-2 whitespace-nowrap"
                            onClick={() => openModal(item)}
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
                          <td className="px-6 py-2 whitespace-nowrap">
                            {
                              <p
                                // onClick={() => cancelCartItem(item.productId._id)}
                                className="text-yellow hover:text-amber-600"
                              >
                                {ele.orderStatus}
                              </p>
                            }
                          </td>
                          <td className="px-6 py-2 whitespace-nowrap">
                            {
                              <button
                                // onClick={() => cancelCartItem(item.productId._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Cancel
                              </button>
                            }
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="float-right mr-3 mt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersData;
