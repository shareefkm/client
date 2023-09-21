import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import UserAxios from "../../Axios/UserAxios";
import Button from "../../assets/Button";

function PopularItems() {
  const navigate = useNavigate()
  const [product, setProduct] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    RestaurantAxios.get("/getproduct").then((response) => {
      setProduct(response.data.product);
    });
  }, []);

  const handleAddToCart = (proId) => {
    const productId = proId;
    const userId = user._id;
    UserAxios.post("/add-to-cart", { productId, userId })
      .then((response) => {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  };
  return (
    <div >
      <div className="items-center justify-center flex pt-10 text-3xl font-semibold mb-4">
        <h1>Popular items</h1>
      </div>
      <div className="sm:flex pl-3 pr-3">
        {product.map((item, index) => (
          <div key={index} className="mb-10 md:w-1/3 sm:w-1/2">
            <div className="">
              <img
                src={item.images}
                alt={item.name}
                className="rounded-md"
              />
            </div>
            <div>
              <h4 className="text-lg md:text-xl lg:text-2xl">{item.name}</h4>
              <h1 className="text-base md:text-xl lg:text-2xl font-semibold">
                {item.price}
              </h1>
            </div>
            <div className="">
              <Button
                value={"Order now"}
                onClick={() => {
                  handleAddToCart(item._id);
                  navigate('/cart')
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularItems;
