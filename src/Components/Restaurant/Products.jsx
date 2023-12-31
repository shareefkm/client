import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Button from "../../assets/Button";
import RestaurantAxios from "../../Axios/RestaurantAxios";
import Pagination from "../../assets/Pagination";

function Products() {
  const [product, setProduct] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const restaurant = useSelector((state) => state.restaurant);
  const restaurant_id = restaurant._id;
  const navigate = useNavigate();

  useEffect(() => {
    RestaurantAxios.get(`/getrestarantproduct?id=${restaurant_id}`).then((response) => {
      setProduct(response.data.product);
    });
  }, [is_deleted]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(product.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = product.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const deletProduct = async (proId) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      RestaurantAxios.patch("/deletproduct", { proId })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            setDeleted(!is_deleted)
          } else {
            toast.error(response.data.message, {
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
    } else {
      toast.error("Cancelled", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="p-10 w-full">
      <div className="border">
        <div className="h-full w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-table-blue">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    DESCRIPTION
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    RATE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    PRICE
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td className="flex px-6 py-2 whitespace-nowrap">
                      <img
                        src={item.images}
                        alt=""
                        className="h-10 w-10 mr-10"
                      />
                      {item.name}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {item.description}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      {item.price}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap">
                      { <div className="flex justify-between">
                        <button
                          className="text-yellow hover:text-orange-500"
                          onClick={() => navigate(`/restaurant/editproduct/${item._id}`)}
                        >
                          Edit Menu
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deletProduct(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                      }
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-10">
            <Button
              onClick={() => navigate("/restaurant/addproduct")}
              value={"Add Menu"}
              className={"w-40"}
            />
          </div>
          <div className="float-right mr-3 mt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Products;
