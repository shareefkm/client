import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";

import UserAxios from "../../Axios/UserAxios";
import Loader from "../../assets/Loader";

function Shops() {
  const navigate = useNavigate();
  const [restaurants, setrestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { catName } = useParams();

  useEffect(() => {
    const rest = async () => {
      try {
        const { data } = await UserAxios.get("/getrestaurants");
        if (data) {
          setrestaurants(data);
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    };
    rest();
  }, []);

  useEffect(() => {
    UserAxios.get("/getcategories").then((response) => {
      setCategories(response.data.categories);
    });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const ratingsMap = {};
  if (restaurants && restaurants.ratings) {
    restaurants.ratings.forEach((rating) => {
      ratingsMap[rating._id] = rating.averageRating;
    });
  }
  return (
    isLoading ? (<Loader/>) : (
    <div className="md:flex">
      <div className="md:w-1/4 pl-4 w-full">
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
          {categories.map((cat) => (
            <label key={cat._id} className="flex h-10 items-center">
              <input
                type="radio"
                name="category"
                value={selectedOption}
                // checked={}
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
      <div className="bg-gray-100 md:w-3/4 ml-auto w-full">
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
            {restaurants?.restaurants?.map((item, index) => (
              <div
                key={index}
                className="mb-10 cursor-pointer bg-white"
                onClick={() => navigate(`/menu/${item._id}`)}
              >
                <div className="flex items-center justify-between">
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="w-full h-44"
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
    </div>
      )
  );
}

export default Shops;
