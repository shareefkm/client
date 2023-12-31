import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import Button from "../../assets/Button";
import Category from "./Category";
import { IMAGE_REGEX, PRICE_REGEX } from "../../Regex/Regex";

function AddProduct() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [prodName, setProdName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [variants, setVariants] = useState([
    { name: "", price: "", offer: "", offerPrice: "" },
  ]);

  const restaurant = useSelector((state) => state.restaurant);
  const restId = restaurant._id;

  const validPrice = () => {
    if (
      (variants.length === 1 && !variants[0].name && !variants[0].price) ||
      (variants.length > 1 &&
        variants.every((variant) => !variant.name && !variant.price))
    ) {
      return false;
    }
    for (const variant of variants) {
      if (variant.price && !PRICE_REGEX.test(variant.price)) {
        return false;
      }
    }
    return true;
  };

  const categoryData = async () => {
    const { data } = await RestaurantAxios.get(`/getcategory?id=${restId}`);
    if (data) {
      setCategories(data.categoryDatas);
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleVariantNameChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].name = e.target.value;
    setVariants(updatedVariants);
  };

  const handleVariantPriceChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].price = e.target.value;
    setVariants(updatedVariants);
  };

  const handleVariantOfferChange = (e, index) => {
    const updatedVariants = [...variants];
    updatedVariants[index].offer = e.target.value;
    updatedVariants[index].offerPrice =
      parseFloat(variants[index].price) -
      (parseFloat(variants[index].price) * parseFloat(e.target.value)) / 100;
    setVariants(updatedVariants);
  };


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
    if (
      prodName.trim().length === 0 ||
      description.trim().length === 0 ||
      category.trim().length === 0 ||
      !validPrice()
    ) {
      setErrors(true);
    } else {
      RestaurantAxios.post("/addproduct", {
        name: prodName,
        description,
        category,
        images,
        restId,
        variants: variants,
      })
        .then((response) => {
          if (response.data.success) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 3000,
            });
            navigate("/restaurant/products");
            setProdName("");
            setDescription("");
            setPrice("");
            setCategory("");
            setOfferPrice();
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
          <label className="block font-medium">Product Name:</label>
          {!prodName.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Product Name is required"}</p>
          )}
          <input
            type="text"
            id="name"
            name="name"
            value={prodName}
            onChange={(e) => {
              setProdName(e.target.value);
            }}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          {!description.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Description is required"}</p>
          )}
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 h-32 w-full"
          />

          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          {!category.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Select a Category"}</p>
          )}
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <label htmlFor="price" className="block font-medium">
            Price:
          </label>
  
          {!validPrice() && errors && (
            <p className="text-red-500 text-sm">{"Invalid Price"}</p>
          )}
          {variants.map((variant, index) => (
            <div key={index} className="border rounded-sm md:w-3/5 w-full">
              <input
                type="text"
                placeholder="Variant Name"
                value={variant.name}
                onChange={(e) => handleVariantNameChange(e, index)}
                className="md:border-r-4 rounded-sm md:w-1/2 bg-gray-300 py-1 w-full"
              />
              <input
                type="number"
                placeholder="Variant Price"
                value={variant.price}
                onChange={(e) => handleVariantPriceChange(e, index)}
                className="border rounded-sm md:w-1/2 bg-gray-300 py-1 w-full "
              />
              <input
                type="number"
                placeholder="Offer (%)"
                value={variant.offer}
                onChange={(e) => handleVariantOfferChange(e, index)}
                className="md:border-r-4 rounded-sm md:w-1/2 bg-gray-300 py-1 w-full "
              />
              <input
                type="number"
                placeholder="Offer Price"
                value={variant.offerPrice}
                readOnly
                className="border rounded-sm md:w-1/2 bg-gray-300 py-1 w-full "
              />
              <button className="text-cherry-Red" onClick={() => removeVariant(index)}>
                Remove Variant
              </button>
            </div>
          ))}
          <button className="text-green-600" onClick={addVariant}>Add Variant</button>

        </div>
        <div className="md:w-1/2">
          <label htmlFor="restId" className="block font-medium">
            Restaurant ID
          </label>
          <input
            type="text"
            id="restId"
            value={restId}
            readOnly
            className="border border-gray-300 rounded-sm md:w-3/5 bg-gray-300 mb-5 py-1 w-full"
          />

          <div className="custom-file mt-3 h-52 items-center justify-center bg-gray-300 md:w-3/5 w-full">
            <label htmlFor="profImage" className="">
              <img
                className="h-52 object-cover w-full"
                src={imagePreviewUrl && imagePreviewUrl }
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
          <div className="pt-3 ">
            <button
              onClick={() => navigate("/restaurant/category")}
              className="btn-primary md:w-3/5 w-full p-1 rounded-sm"
            >
              Manage Categories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
