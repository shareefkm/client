import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { IMAGE_REGEX } from "../../Regex/Regex";
import RestaurantAxios from "../../Axios/RestaurantAxios";

const CategoryModal = ({ showModal, closeModal, categoryId, categoryToEdit, editMode,imageToEdit }) => {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const restaurant = useSelector((state) => state.restaurant);
  const restId = restaurant._id;

  const handleCategoryNameChange = (e) => {
      setCategoryName(e.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;
    if (file && IMAGE_REGEX.test(fileName)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl("");
    }
  };
  const toCloseModal = ()=>{
    setCategoryName("")
    setImage(null)
    setImagePreviewUrl("")
    closeModal()
  }

  useEffect(()=>{
    setCategoryName(categoryToEdit)
    setImage(imageToEdit)
    setImagePreviewUrl(imageToEdit)
  },[editMode])

  const handleAddCategory = () => {
    if (categoryName.trim() !== "") {
      if (editMode && categoryId) {
       RestaurantAxios.patch('/editcategory',{ categoryName, image, categoryId, restId })
       .then((response) => {
        console.log(response);
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        closeModal();
        setCategoryName("");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      });
      } else {
        RestaurantAxios.post("/addcategory", { categoryName, restId, image })
          .then((response) => {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
            closeModal();
            setCategoryName("");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response?.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 1500,
            });
          });
      }
    } else {
      toast.error("Please enter category name", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };
  

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showModal ? "visible" : "invisible"
      }`}
    >
      <div className="modal-container border rounded-md bg-off-White">
        <div className="modal-content">
          <div className="rounded-t-md modal-header bg-cherry-Red p-3 flex justify-between text-off-White items-center">
            <h2 className="text-xl font-bold">
              {editMode ? "Edit Category" : "Add Category"}
            </h2>
            <button className="text-2xl" onClick={toCloseModal}>
              &times;
            </button>
          </div>
          <div className="modal-body p-3">
            <label htmlFor="categoryName" className="block mb-2">
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={handleCategoryNameChange}
              className="w-full p-2 border border-gray-300"
            />
            <label htmlFor="image" className="block mb-2">
              Image:
            </label>
            <input
              type="file"
              id="image"
              accept=""
              onChange={handleImageChange}
              className="w-full mb-2"
            />
            {(imagePreviewUrl ) && (
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="w-56 mb-2"
              />
            )}
            <button
              onClick={handleAddCategory}
              className="bg-green-600 text-off-White mt-2 p-1 rounded-sm"
            >
              {editMode ? "Edit Category" : "Add Category"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryModal;
