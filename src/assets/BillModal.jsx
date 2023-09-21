import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import RestaurantAxios from "../Axios/RestaurantAxios";

const BillModal = ({ isOpen, closeModal, orderItem }) => {
  const [resData, setResData] = useState({});
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [image, setImage] = useState([]);

  let total = 0;

  const restaurant = useSelector((state) => state.restaurant);
  const restaurant_id = restaurant._id;

  useEffect(() => {
    RestaurantAxios.get(`/getresprofile?id=${restaurant_id}`).then(
      (response) => {
        setResData(response.data.restData);
        setAddress({
          street: response.data.restData.Address.street,
          city: response.data.restData.Address.city,
          state: response.data.restData.Address.state,
          postalCode: response.data.restData.Address.postalCode,
        });
        setImage(response.data.restData.Image);
      }
    );
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-container border">
        <div className="modal-content bg-white p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-purple font-lobster duration-200">
              Yummi
            </h2>
            <h2 className="text-lg font-bold">Billing Details...</h2>
            <button className="text-gray-600" onClick={closeModal}>
              <span className="text-3xl">×</span>
            </button>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
          <div className="embed-container flex justify-between items-center">
            <div>
              <div>
                <h1 className="text-xl font-bold">{resData.Name}</h1>
                <h1 className="italic font-semibold">{resData.Place}</h1>
                <h1 className="italic font-semibold">{address.city}</h1>
                <h1 className="italic font-semibold">{address.postalCode}</h1>
                <h1 className="italic font-semibold">{resData.Mobile}</h1>
              </div>
              <div className="pt-7">
                <h1 className="text-sm font-bold">Billing Address.</h1>
                {orderItem.map((data, index) => (
                  <div key={index}>
                    {data.address.map((addr, idx) => (
                      <div key={idx}>
                        <h1 className="italic ">{addr.street}</h1>
                        <h1 className="italic">{addr.city}</h1>
                        <h1 className="italic ">{addr.state}</h1>
                        <h1 className="italic ">{addr.postalCode}</h1>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="border p-3 justify-between shadow-md">
              <p>Reference No.:</p>
              <p>Invoice Date:</p>
              <p>Location:</p>
              <p>Carrier</p>
              <p></p>
            </div>
          </div>
          <hr className="border-t-2 border-blue-500 my-4" />
          <div className="template-text mt-4">
            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Sl</th>
                    <th className="py-2 px-4 border-b text-left">Item</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                    <th className="py-2 px-4 border-b text-left">Rate</th>
                    <th className="py-2 px-4 border-b text-left">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItem.map((item) => (
                    <React.Fragment key={item._id}>
                      {item.item
                        .filter((data) => data.product !== null)
                        .map((ele) => (
                          <tr key={ele._id}>
                            <td className="py-2 px-4 border-b">#</td>
                            <td className="py-2 px-4 border-b">{ele.product?.name}</td>
                            <td className="py-2 px-4 border-b">
                            {ele?.quantity}
                            </td>
                            <td className="py-2 px-4 border-b">
                            {ele.product?.price}
                            </td>
                            <td className="py-2 px-4 border-b">
                            {ele?.price}
                            <h1 hidden> {(total = total + ele.price)}</h1>
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                  <tr>
                    <td className="py-2 px-4 border-b" colSpan="3">
                      Total Price:
                    </td>
                    <td className="py-2 px-4 border-b">{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillModal;
