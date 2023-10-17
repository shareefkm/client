import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";

import { toast } from "react-toastify";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import UserAxios from "../../Axios/UserAxios";
import Button from "../../assets/Button";
import StarRating from "../../assets/StarRating";
import ProductDetailModal from "./ProductDetailModal";

function PopularItems({ products, restaurants, filteredProducts, location }) {
  let search = products;
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [item, setsetItem] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector((state) => state.user);
  const calicAverRating = () => {
    if (!restaurants?.restaurants) return null;

    let totalRatings = 0;
    let numberOfRatings = 0;

    restaurants.restaurants.forEach((restaurant) => {
      if (restaurant.rating && restaurant.rating.length > 0) {
        restaurant.rating.forEach((rating) => {
          totalRatings += rating;
          numberOfRatings += 1;
        });
      }
    });

    return numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
  };
  const avrRating = calicAverRating();

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleProducData = async (proId) => {
    try {
      const { data } = await UserAxios.get(`/getproductdetail?id=${proId}`);
      if (data) {
        setsetItem(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(true);
  };

  

  return (
    <div className="container mx-auto px-5">
      <div className="text-3xl font-semibold mb-4 flex items-center justify-center">
        Popular items
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      <ProductDetailModal isOpen={isModalOpen} close={closeModal} item={item} />
        {search
          ? search?.products?.map((item, index) => (
              <div
                key={index}
                className="mb-10 cursor-pointer"
                onClick={() => handleProducData(item._id)}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={item.images}
                    alt={item.name}
                    className="rounded-md sm:w-64 sm:h-44 w-full h-72"
                  />
                </div>
                <div className="flex justify-between">
                  <h4 className="text-xl font-bold mt-2">{item.name}</h4>
                  <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                    {isNaN(avrRating) ? "N/A" : avrRating}
                  </h4>
                  <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                    <BiSolidStarHalf />
                  </h4>
                </div>
                <div>
                  <h4 className="text-lg text-gray-500">size : {item.variants[0].name}</h4>
                  <h4 className="text-lg text-gray-500">
                    Price : {item.variants[0].offerPrice}
                  </h4>
                </div>
              </div>
            )) : (location !== "" && filteredProducts?.length !==0) ? filteredProducts?.map((item, index) => (
              <div
                key={index}
                className="mb-10 cursor-pointer"
                onClick={() => navigate(`/menu/${item._id}`)}
              >
                {/* {console.log(item)} */}

                <div className="flex items-center justify-between">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="rounded-md sm:w-64 sm:h-44 w-full h-72"
                  />
                </div>
                <div className="flex justify-between">
                  <h4 className="text-xl font-bold mt-2">{item.Name}</h4>
                  <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                    {isNaN(avrRating) ? "N/A" : avrRating}
                  </h4>
                  <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                    <BiSolidStarHalf />
                  </h4>
                </div>
                <div>
                  <h4 className="text-lg text-gray-500">{item.Place}</h4>
                  <h4 className="text-lg text-gray-500">
                    {item.Address?.state}
                  </h4>
                </div>
              </div>
            ))
          : restaurants?.restaurants?.map((item, index) => (
              <div
                key={index}
                className="mb-10 cursor-pointer"
                onClick={() => navigate(`/menu/${item._id}`)}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="rounded-md sm:w-64 sm:h-44 w-full h-72"
                  />
                </div>
                <div className="flex justify-between">
                  <h4 className="text-xl font-bold mt-2">{item.Name}</h4>
                  <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                    {isNaN(avrRating) ? "N/A" : avrRating}
                  </h4>
                  <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                    <BiSolidStarHalf />
                  </h4>
                </div>
                <div>
                  <h4 className="text-lg text-gray-500">{item.Place}</h4>
                  <h4 className="text-lg text-gray-500">
                    {item.Address?.state}
                  </h4>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PopularItems;
