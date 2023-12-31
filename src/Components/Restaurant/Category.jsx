import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { toast } from "react-toastify";

import CategoryModal from "./CategoryModal";
import Pagination from "../../assets/Pagination";
import RestaurantAxios from "../../Axios/RestaurantAxios";

function Category() {
  const [categories, setCategories] = useState([]);
  const [is_deleted, setDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const [categoryToEdit, setCategoryToEdit] = useState("");
  const [imageToEdit, setImageToEdit] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdCategories, setFilterdCategories] = useState([]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = categories.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const activeEditMode = () => {
    setEditMode(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
  };

  const editCategory = (catId, catName, catImage) => {
    setCategoryId(catId);
    setCategoryToEdit(catName);
    setImageToEdit(catImage);
    activeEditMode();
    openModal();
  };

  const restaurant = useSelector((state) => state.restaurant);
  const restId = restaurant._id;
  const navigate = useNavigate();

  const categoryData = async () => {
    const { data } = await RestaurantAxios.get(`/getcategory?id=${restId}`);
    if (data) {
      setCategories(data.categoryDatas);
    }
  };

  useEffect(() => {
    categoryData();
  }, [is_deleted, showModal]);

  useEffect(() => {
    const fetchProducts = () => {
      const searchTermLowercase = searchTerm.toLowerCase();
      const filteredProducts = categories.filter((product) =>
        product.name.toLowerCase().includes(searchTermLowercase)
      );
      // console.log(filteredProducts, searchTerm);
      setFilterdCategories(filteredProducts);
    };
    fetchProducts();
  }, [searchTerm]);

  const deleteCategory = async (catId) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });
    if (result.isConfirmed) {
      RestaurantAxios.patch("/deletcategory", { catId })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            setDeleted(!is_deleted);
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        });
    } else {
      toast.error("Cancelled", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
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
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider">
                    CATEGORY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-off-White uppercase tracking-wider"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium tracking-wider">
                    <input
                      type="text"
                      className="w-full px-2 py-1 border rounded-sm outline-none focus:ring-0"
                      placeholder="Search category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 border">
                {filterdCategories.length !== 0
                  ? filterdCategories.map((item, ind) => (
                      <tr key={item._id}>
                        <td className="px-6 py-2">
                          <div className="flex items-end font-semibold">
                            {(currentPage - 1) * itemsPerPage + ind + 1}
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center h-full">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center justify-center h-full">
                            <img
                              className="w-24 h-20"
                              src={item?.image}
                              alt={item.name}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center justify-center h-full">
                            <button
                              className="text-yellow hover:text-orange-500"
                              onClick={() => {
                                editCategory(item._id, item.name, item.image);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 ml-4"
                              onClick={() => deleteCategory(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  : currentItems?.map((item, ind) => (
                      <tr key={item._id}>
                        <td className="px-6 py-2">
                          <div className="flex items-end font-semibold">
                            {(currentPage - 1) * itemsPerPage + ind + 1}
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center h-full">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center justify-center h-full">
                            <img
                              className="w-24 h-20"
                              src={item?.image}
                              alt={item.name}
                            />
                          </div>
                        </td>
                        <td className="px-6 py-2">
                          <div className="flex items-center justify-center h-full">
                            <button
                              className="text-yellow hover:text-orange-500"
                              onClick={() => {
                                editCategory(item._id, item.name, item.image);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 ml-4"
                              onClick={() => deleteCategory(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="pt-3 ">
            <button
              onClick={openModal}
              className="btn-primary md:w-3/5 w-full p-1 rounded-sm"
            >
              Add Categories
            </button>

            <CategoryModal
              showModal={showModal}
              closeModal={closeModal}
              categoryId={categoryId}
              categoryToEdit={categoryToEdit}
              editMode={editMode}
              imageToEdit={imageToEdit}
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

export default Category;
