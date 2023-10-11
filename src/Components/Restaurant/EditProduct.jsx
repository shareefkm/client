import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import Button from "../../assets/Button";
import { IMAGE_REGEX, PRICE_REGEX } from "../../Regex/Regex";

function EditProduct() {
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const { productId } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState([]);
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState(false);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [crrCat, setCrrCat] = useState()
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);

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

  useEffect(() => {
    RestaurantAxios.get(`/editproduct?id=${productId}`)
      .then((response) => {
        console.log(response);
        setName(response.data.product.name);
        setDescription(response.data.product.description);
        setCategory(response.data.product.category._id);
        setCrrCat(response.data.product.category.name);
        setImages(response.data.product.images);
        setVariants(response.data.product.variants);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  const categoryData = async () => {
    const { data } = await RestaurantAxios.get(`/getcategory?id=${restId}`);
    if (data) {
      setCategories(data.categoryDatas);
    }
  };
  useEffect(() => {
    categoryData();
  }, []);

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

  const editProduct = () => {
    if (
      name.trim().length === 0 ||
      description.trim().length === 0 ||
      category.trim().length === 0 ||
      !validPrice()
    ) {
      setErrors(true);
    } else {
      RestaurantAxios.patch("/editproduct", {
        productId,
        name,
        description,
        category,
        images,
        variants,
      }).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
          setName("");
          setDescription("");
          setCategory("");
          setVariants([]);
          navigate("/restaurant/products");
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      });
    }
  };

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
            <p className="text-red-500 text-sm">{"Product Name is required"}</p>
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
          {!description.trim().length && errors && (
            <p className="text-red-500 text-sm">{"Description is required"}</p>
          )}

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
            <option value="">{crrCat}</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

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
              <button
                className="text-cherry-Red"
                onClick={() => removeVariant(index)}
              >
                Remove Variant
              </button>
            </div>
          ))}
          <button className="text-green-600" onClick={addVariant}>
            Add Variant
          </button>
        </div>
        <div className="md:w-1/2 ">
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
              <img className="h-52 object-cover w-full" src={images} alt="" />
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
              value={"Edit Product"}
              onClick={editProduct}
              className="md:w-3/5 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
