
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import Button from "../../assets/Button";
import { IMAGE_REGEX, PRICE_REGEX } from "../../Regex/Regex";

function AddProduct() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [prodName, setProdName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const restaurant = useSelector((state) => state.restaurant);
  const restaurant_id = restaurant._id;

  const validPrice = PRICE_REGEX.test(price)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;

    if (file && IMAGE_REGEX.test(fileName)) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrl(reader.result);
        setImages(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl("");
    }
  };

  const addProduct = () => {
    if(prodName.trim().length === 0 ||
    description.trim().length === 0 ||
    category.trim().length === 0 ||
    !validPrice
    ){
      setErrors(true)
    }else{
    RestaurantAxios.post("/addproduct", {
      name:prodName,
      description,
      price,
      category,
      images,
      restaurant_id,
    })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          setProdName("");
          setDescription("");
          setPrice("");
          setCategory("");
          navigate("/restaurant/products");
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
    }
  };

  return (
    <div className="p-10">
      <div className="md:flex p-4">
        <div className="md:w-1/2 leading-6">
          <label className="block font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={prodName}
            onChange={(e)=>{setProdName(e.target.value)}}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />
          {!prodName.trim().length && errors && (
            <p className="text-red-500 text-sm">{'Product Name is required'}</p>
          )}

          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 h-32 w-full"
          />
          {!description.trim().length && errors &&(
            <p className="text-red-500 text-sm">{'Description is required'}</p>
          )}

          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />
          {!category.trim().length && errors &&(
            <p className="text-red-500 text-sm">{'Category is required'}</p>
          )}
          <label htmlFor="price" className="block font-medium">
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 py-1 w-full"
          />
          {!validPrice && errors &&(
            <p className="text-red-500 text-sm">{'Invalid Price'}</p>
          )}
        </div>
        <div className="md:w-1/2">
          <label htmlFor="restaurant_id" className="block font-medium">
            Restaurant ID
          </label>
          <input
            type="text"
            id="restaurant_id"
            value={restaurant_id}
            readOnly
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />

          <div className="custom-file mt-3 h-52 items-center justify-center bg-gray-300 md:w-3/5 w-full">
            <label htmlFor="profImage" className="">
              <img
                className="h-52 object-cover w-full"
                src={imagePreviewUrl ? imagePreviewUrl : "/images/user.png"}
                alt=""
              />
            </label>
            <input
              className="form-control custom-file-input"
              name="file"
              multiple
              type="file"
              id="fileInput"
              required
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          <div className="pt-10">
            <Button
              value={"Addproduct"}
              onClick={addProduct}
              className="md:w-3/5 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;




