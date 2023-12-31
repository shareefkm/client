import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

import EmployeeAxios from "../../Axios/EmployeeAxios";
import { USER_API } from "../../Constants/API";
const baseUrl = USER_API;

function EmployeeHome() {
  const [emplDetail, setEmplDetail] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isDropdownVisible, setDropdownVisibility] = useState(false);
  const [is_statusUpdated, setStatusUpdated] = useState(false);
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  const employee = useSelector((state) => state.employee);

  useEffect(() => {
    EmployeeAxios.get(`/getprofile/${employee._id}`).then((response) => {
      setEmplDetail(response.data);
    });
  }, [employee._id]);

  useEffect(() => {
    EmployeeAxios.get(`/getordersempl/?id=${employee._id}`).then((response) => {
      setOrders(response.data);
    });
  }, [is_statusUpdated]);
  const toggleDropdown = (orderId) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
    setDropdownVisibility(!isDropdownVisible);
  };

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

  const acceptOrder = (orderId) => {
    const updateStatus = {
      orderId,
      emplId: employee._id,
    };
    EmployeeAxios.patch("/acceptorder", {
      orderId,
      emplId: employee._id,
    }).then((response) => {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setStatusUpdated(!is_statusUpdated);
    });
    socket.emit("update-order-status", { updateStatus });
  };
  const createChat = (orderId) => {
    EmployeeAxios.post("/chat", { id: orderId._id, senderRole: "employee" }).then(
      (res) => {
        navigate(`/employee/chat`);
      }
    );
  };
  const renderOrderDetails = (orderId) => {
    const selectedOrder = orders?.ordersDetails.find(
      (order) => order._id === orderId
    );
    if (!selectedOrder) return null;
    return (
      <div>
        {selectedOrder.employeeId === employee._id ||
        !selectedOrder.employeeId ? (
          <div className="sm:flex">
            <div className="order-details">
              <h3 className="underline">Order Details</h3>
              <ul>
                {selectedOrder.item.map((item, index) =>
                  selectedOrder.employeeId === employee._id ||
                  !selectedOrder.employeeId ? (
                    <li className="text-cherry-Red" key={index}>
                      Product: {item.product._id.toString().substr(-4)}
                    </li>
                  ) : null
                )}
              </ul>
              <h3 className="underline">Delivery Address</h3>
              <p>
                Street: {selectedOrder.address[0].street}
                <br />
                City: {selectedOrder.address[0].city}
                <br /> Postal Code: {selectedOrder.address[0].postalCode}
                <br /> State: {selectedOrder.address[0].state}
              </p>
              <p
                className="text-green-600 cursor-pointer"
                onClick={() => createChat(selectedOrder)}
              >
                Chat
              </p>
            </div>
            <div className="Restaurant sm:ml-12">
              <ul>
                {selectedOrder.item.map((item, index) => (
                  <Fragment key={index}>
                    {/* {console.log(selectedOrder)} */}
                    {selectedOrder.employeeId === employee._id ||
                    !selectedOrder.employeeId ? (
                      <>
                        <h3 className="underline">Restaurant Details</h3>
                        <li className="text-cherry-Red" key={item._id}>
                          Restaurant: {item.product.restaurant_id.Name} <br />
                          Product: {item.product._id.toString().substr(-4)}
                        </li>

                        <h3 className="underline">Restaurant Location</h3>
                        <p>
                          Street: {item.product.restaurant_id?.Address?.street}
                          <br />
                          City: {selectedOrder.address[0]?.city}
                          <br /> Postal Code:{" "}
                          {selectedOrder.address[0]?.postalCode}
                          <br /> State: {selectedOrder.address[0]?.state}
                        </p>
                        <hr />
                        {!selectedOrder.employeeId ? (
                          <button
                            onClick={() => acceptOrder(selectedOrder._id)}
                            className="text-green-600 underline"
                          >
                            Accept
                          </button>
                        ) : (
                          <p className="bg-green-200 p-1 rounded-sm font-semibold text-sm">Accepted</p>
                          
                        )}
                      </>
                    ) : null}
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full p-5 md:flex bg-off-White shadow-md">
        <div
          className={`h-28 p-4 md:w-1/3 shadow-md bg-cherry-Red rounded w-full md:mr-3 mb-3 cursor-pointer`}
          onClick={() => navigate("/employee/profile")}
        >
          <div className="space-y-2 flex justify-center items-stretch">
            <img
              className="h-20 w-20 mr-3 rounded-full"
              src={emplDetail.profile?.id_Proof}
              alt=""
            />
            <h3 className="text-2xl font-semibold text-off-White text-center">
              {emplDetail.profile?.Name}
            </h3>
          </div>
        </div>
        <div
          className={`h-28 md:w-1/3 p-4 shadow-md bg-cherry-Red rounded w-full md:mr-3 mb-3`}
        >
          <div className="space-y-2 justify-center items-center">
            <h3 className="text-2xl font-semibold text-off-White text-center">
              Earnings:
            </h3>
            <h3 className="text-2xl font-semibold text-off-White text-center">
              $:2500.00
            </h3>
          </div>
        </div>
        <div className={`md:w-1/3  shadow-md rounded w-full md:mr-3 mb-3`}>
          <div className="space-y-2 justify-center items-stretch bg-cherry-Red rounded">
            <h3 className="text-md font-semibold text-off-White text-center">
              {`New ${orders?.ordersDetails?.length || 0} Orders`}
            </h3>
            <ul className="border shadow-md bg-off-White rounded p-1">
              {orders?.ordersDetails?.map((prod) => (
                <li key={prod._id} className="flex border">
                  <img
                    className="h-10 w-12 mr-2"
                    src={prod?.item[0]?.product?.images}
                    alt="Product Image"
                  />
                  <div className="">
                    <h1>
                      {prod?.address[0].street}, {prod?.address[0].city}
                    </h1>

                    <button
                      className="text-green-600"
                      onClick={() => toggleDropdown(prod._id)}
                    >
                      View
                    </button>
                    {selectedOrderId === prod._id &&
                      renderOrderDetails(prod._id)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;
