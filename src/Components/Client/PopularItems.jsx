import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

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
          totalRatings += rating.rating;
          numberOfRatings += 1;
        });
      }
    });

    return numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
  };
  {
    console.log(restaurants);
  }
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

  const ratingsMap = {};
  if (restaurants && restaurants.ratings) {
    restaurants.ratings.forEach((rating) => {
      ratingsMap[rating._id] = rating.averageRating;
    });
  }
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto md:px-20 px-3">
        <div className="text-3xl font-semibold mb-4 flex items-center justify-center py-10">
          <div>
            <h1 className="font-sans text-amber-500 font-bold tracking-wider flex items-center justify-center md:text-lg pb-3 text-xs">
              TOP RESTAURANTS
            </h1>
            <h1 className="font-sans font-bold flex items-center justify-center md:text-5xl text-xl">
              Most Featured Restaurant
            </h1>
            <div className="flex items-center justify-center pt-6 ">
              <span className="border border-t-2 border-amber-500 w-10"></span>
              <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
              <span className="border border-t-2 border-amber-500 w-1  ml-1"></span>
              <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <ProductDetailModal
            isOpen={isModalOpen}
            close={closeModal}
            item={item}
          />
          {search
            ? search?.products?.map((item, index) => (
                <div
                  key={index}
                  className="mb-10 cursor-pointer bg-white"
                  onClick={() => handleProducData(item._id)}
                >
                  <div className="flex items-center justify-between">
                    <img
                      src={item.images}
                      alt={item.name}
                      className="w-full md:h-56"
                    />
                  </div>
                  <div className="sm:flex justify-between px-5 pb-5">
                    <h4 className="text-xl font-bold mt-2">{item.name}</h4>
                    <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                      {ratingsMap[item._id] !== undefined ? (
                        <span>{ratingsMap[item._id]}</span>
                      ) : (
                        "N/A"
                      )}
                    </h4>
                    <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                      <BiSolidStarHalf />
                    </h4>
                  </div>
                  <div className="px-5 pb-3">
                    <h4 className="text-lg text-gray-500">
                      size : {item.variants[0].name}
                    </h4>
                    <h4 className="text-lg text-gray-500">
                      Price : {item.variants[0].offerPrice}
                    </h4>
                  </div>
                  <hr />
                  <div className="px-5 py-3 flex">
                    <div className="flex items-center justify-start">
                      <img
                        src={item.Image}
                        alt={item.Name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <AiFillClockCircle className="text-green-900 text-xl" />
                        <h4 className="text-lg text-cherry-Red ml-2">
                          12.30 - 1.00
                        </h4>
                      </div>
                      <div className="flex items-center">
                        <ImLocation2 className="text-blue-700 text-xl" />
                        <h4 className="text-lg text-gray-500">{item.Place}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : location !== "" && filteredProducts?.length !== 0
            ? filteredProducts?.map((item, index) => (
                <div
                  key={index}
                  className="mb-10 cursor-pointer bg-white"
                  onClick={() => navigate(`/menu/${item._id}`)}
                >
                  {/* {console.log(item)} */}

                  <div className="flex items-center justify-between">
                    <img
                      src={item.Image}
                      alt={item.Name}
                      className="w-full md:h-56"
                    />
                  </div>
                  <div className="flex justify-between px-5 pb-5">
                    <h4 className="text-xl font-bold mt-2">{item.Name}</h4>
                    <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                      {ratingsMap[item._id] !== undefined ? (
                        <span>{ratingsMap[item._id]}</span>
                      ) : (
                        "N/A"
                      )}
                    </h4>
                    <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                      <BiSolidStarHalf />
                    </h4>
                  </div>
                  <div className="px-5 pb-3">
                    <h4 className="text-lg text-gray-500">{item.Place}</h4>
                    <h4 className="text-lg text-gray-500">
                      {item.Address?.state}
                    </h4>
                  </div>
                  <hr />
                  <div className="px-5 py-3 flex">
                    <div className="flex items-center justify-start">
                      <img
                        src={item.Image}
                        alt={item.Name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <AiFillClockCircle className="text-green-900 text-xl" />
                        <h4 className="text-lg text-cherry-Red ml-2">
                          12.30 - 1.00
                        </h4>
                      </div>
                      <div className="flex items-center">
                        <ImLocation2 className="text-blue-700 text-xl" />
                        <h4 className="text-lg text-gray-500">{item.Place}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : restaurants?.restaurants?.map((item, index) => (
                <div
                  key={index}
                  className="mb-10 cursor-pointer bg-white"
                  onClick={() => navigate(`/menu/${item._id}`)}
                >
                  <div className="flex items-center justify-between">
                    <img
                      src={item.Image}
                      alt={item.Name}
                      className="w-full md:h-56"
                    />
                  </div>
                  <div className="flex justify-between px-5 pb-5">
                    <h4 className="text-xl font-bold mt-2">{item.Name}</h4>
                    <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                      {ratingsMap[item._id] !== undefined ? (
                        <span>{ratingsMap[item._id]}</span>
                      ) : (
                        "N/A"
                      )}
                    </h4>
                    <h4 className="flex text-xl mt-4 mr-6 text-yellow">
                      <BiSolidStarHalf />
                    </h4>
                  </div>
                  <div className="px-5 pb-3">
                    <h4 className="text-lg text-gray-500">{item.Place}</h4>
                    <h4 className="text-lg text-gray-500">
                      {item.Address?.state}
                    </h4>
                  </div>
                  <hr />
                  <div className="px-5 py-3 flex">
                    <div className="flex items-center justify-start">
                      <img
                        src={item.Image}
                        alt={item.Name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <AiFillClockCircle className="text-green-900 text-xl" />
                        <h4 className="text-lg text-cherry-Red ml-2">
                          12.30 - 1.00
                        </h4>
                      </div>
                      <div className="flex items-center">
                        <ImLocation2 className="text-blue-700 text-xl" />
                        <h4 className="text-lg text-gray-500">{item.Place}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default PopularItems;
