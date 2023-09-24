import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import UserAxios from "../../Axios/UserAxios";

function Orders() {
  let total = 0;
  let charges = 0;
  let discount = 0;
  let grandTotal = 0;
  const [orderItem, setOrderItem] = useState([]);
  const [cartId, setCartId] = useState({});
  const [is_chage, setChange] = useState(false);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    UserAxios.get(`/getorders?id=${user._id}`).then((response) => {
      const items = response.data.orders;
      setOrderItem(items);
      // setCartId(response.data.cartData);
    });
  }, []);

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
      <div className="border md:flex">
        <div className="h-full md:w-2/3">
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
                    {item.item.map((ele) => (
                      <tr key={ele._id}>
                        <td className="flex px-6 py-2 whitespace-nowrap">
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
        <div className="p-3 md:w-1/3">
          <div className="border h-full w-full shadow-md ">
            <div className="space-y-4 p-4">
              <h1>
                Total: <span className="float-right">{total}</span>
              </h1>
              <h1>
                Charges:<span className="float-right">{charges}</span>
              </h1>
              <h1>
                Discount: <span className="float-right">{discount}</span>
              </h1>
              <p hidden>{(grandTotal = total + charges - discount)}</p>
              <h1>
                Grand Total: <span className="float-right">{grandTotal}</span>
              </h1>
            </div>
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
