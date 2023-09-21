import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import Button from "../../assets/Button";
import { IMAGE_REGEX, PRICE_REGEX } from "../../Regex/Regex";

function EditProduct() {
  const fileInputRef = useRef(null);

  const navigate = useNavigate()
  const { productId } = useParams()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState(false)
  const [images, setImages] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);

  const restaurant = useSelector((state) => state.restaurant);
  const restaurant_id =restaurant._id

  const validPrice = PRICE_REGEX.test(price)

  useEffect(()=>{
    RestaurantAxios.get(`/editproduct?id=${productId}`).then((response)=>{
        setName(response.data.product.name)
        setDescription(response.data.product.description)
        setPrice(response.data.product.price)
        setCategory(response.data.product.category)
        setImages(response.data.product.images)
    }).catch((erro)=>{
        console.log(erro);
    })
  },[])

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

  const editProduct = ()=>{
    if(name.trim().length === 0 ||
    description.trim().length === 0 ||
    category.trim().length === 0 ||
    !validPrice
    ){
      setErrors(true)
    }else{
  RestaurantAxios.patch("/editproduct", {
    productId,
    name,
    description,
    price,
    category,
    images,
  }).then((response) => {
    if (response.data.success) {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
      setName('')
      setDescription('')
      setPrice('')
      setCategory('')
      navigate('/restaurant/products')
    } else {
      toast.error(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  });
}
}

  return (
    <div className="p-10">
      <div className="md:flex p-4 w-full">
        <div className="md:w-1/2 leading-6">
          <label htmlFor="name" className="block font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />
             {!name.trim().length && errors && (
            <p className="text-red-500 text-sm">{'Product Name is required'}</p>
          )}
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            type="number"
            id="price"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 py-1 w-full"
          />
          {!validPrice && errors &&(
            <p className="text-red-500 text-sm">{'Invalid Price'}</p>
          )}
        </div>
        <div className="md:w-1/2 ">
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
                src={images}
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
          <Button value={"Edit Product"} onClick={editProduct} className="md:w-3/5 w-full"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
 