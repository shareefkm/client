import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

import { toast } from "react-toastify";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import UserAxios from "../../Axios/UserAxios";
import Button from "../../assets/Button";
import StarRating from "../../assets/StarRating";

function FilteredRestaurants() {
  const navigate = useNavigate();
  const [restaurants, setrestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  //   const [cateName, setCateName] = useState()
  const [userRating, setUserRating] = useState(0);

  const user = useSelector((state) => state.user);

  const { catName } = useParams();

  useEffect(() => {
    UserAxios.get("/getcategories").then((response) => {
      setCategories(response.data.categories);
    });
  }, []);

  useEffect(() => {
    let cateName;
    if (selectedOption) {
      cateName = selectedOption;
    } else {
      cateName = catName;
    }
    UserAxios.get(`/getcatrestaurants?catName=${cateName}`).then((response) => {
      setrestaurants(response.data);
    });
  }, [selectedOption]);
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
  const ratingsMap = {};
  if (restaurants && restaurants.ratings) {
    restaurants.ratings.forEach((rating) => {
      ratingsMap[rating._id] = rating.averageRating;
    });
  }
  return (
    <div className="flex">
      <div className="w-1/4 pl-4">
        <div className="py-8">
          <h1 className="font-sans font-bold text-2xl">Food Categories</h1>
          <div className="flex pt-4 ">
            <span className="border border-t-2 border-amber-500 w-10"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1  ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
          </div>
        </div>
        <div>
          {categories.map((cat, indx) => (
            <label key={indx} className="flex h-10 items-center">
              <input
                type="radio"
                name="category"
                value={cat._id.name}
                checked={selectedOption === cat._id.name}
                onChange={handleOptionChange}
                className="mr-4"
              />
              <span className="tracking-wide font-semibold text-lg opacity-50 font-mono">
                {cat._id.name}
              </span>
              <span className="ml-auto mr-3 font-semibold text-lg opacity-50 font-mono">
                ({cat.count})
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 w-3/4 ml-auto">
        <div className="py-10">
          {/* <h1 className='font-sans text-amber-500 font-bold tracking-wider flex items-center justify-center text-lg pb-3'>TOP FOODS</h1> */}
          <h1 className="font-sans font-semibold ml-8 flex items-center text-4xl">
            {restaurants?.restaurants?.length}+ Restaurant
          </h1>
          <div className="flex items-center pl-8 pt-6 ">
            <span className="border border-t-2 border-amber-500 w-10"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1  ml-1"></span>
            <span className="border border-t-2 border-amber-500 w-1 ml-1"></span>
          </div>
        </div>
        <div className="container mx-auto px-8">
          <div className="text-3xl font-semibold mb-4 flex items-center justify-center"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {restaurants?.restaurants?.map((item) => (
              <div
                key={item._id}
                className="mb-10 cursor-pointer bg-white"
                onClick={() => navigate(`/menu/${item.restaurant._id}`)}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={item.restaurant.Image}
                    alt={item.restaurant.Name}
                    className="w-full h-44"
                  />
                </div>
                <div className="flex justify-between px-5 pb-5">
                  <h4 className="text-xl font-bold mt-2">
                    {item.restaurant.Name}
                  </h4>
                  <h4 className="text-xl font-bold mt-3 ml-auto mr-1">
                    {ratingsMap[item.restaurant._id] !== undefined ? (
                      <span>{ratingsMap[item.restaurant._id]}</span>
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
                    {item.restaurant.Place}
                  </h4>
                  <h4 className="text-lg text-gray-500">
                    {item.restaurant.Address?.state}
                  </h4>
                </div>
                <hr />
                <div className="px-5 py-3 flex">
                  <div className="flex items-center justify-start">
                    <img
                      src={item.restaurant.Image}
                      alt={item.restaurant.Name}
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
                      <h4 className="text-lg text-gray-500">
                        {item.restaurant.Place}
                      </h4>
                    </div>
                  </div>
                </div>
                {/* <div>
              <h2>Rate this item:</h2>
              <StarRating totalStars={5} onRatingChange={handleRatingChange} />
              <div>
                <p>User's Rating: {userRating}</p>
              </div>
            </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilteredRestaurants;
