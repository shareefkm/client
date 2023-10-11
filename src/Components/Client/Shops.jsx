import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi"

import { toast } from "react-toastify";

import RestaurantAxios from "../../Axios/RestaurantAxios";
import UserAxios from "../../Axios/UserAxios";
import Button from "../../assets/Button";
import StarRating from "../../assets/StarRating";

function Shops() {
  const navigate = useNavigate()
  const [restaurants, setrestaurants] = useState([]);
  const [userRating, setUserRating] = useState(0);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const rest = async()=>{
      try {
        const { data } = await UserAxios.get("/getrestaurants")
        if(data){
          setrestaurants(data)
        }
      } catch (error) {
        
      }
    }
    rest()
  }, []);

  const calicAverRating = () =>{
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
  }
  const avrRating = calicAverRating()
  
    const handleRatingChange = (rating) => {
      setUserRating(rating);
    };
  return (
     <div className="container mx-auto px-5">
      <div className="text-3xl font-semibold mb-4 flex items-center justify-center"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {restaurants?.restaurants?.map((item, index) => (
          <div key={index} className="mb-10 cursor-pointer" onClick={()=>navigate(`/menu/${item._id}`)}>
            <div className="flex items-center justify-between">
              <img
                src={item.Image}
                alt={item.Name}
                className="rounded-md sm:w-64 sm:h-44 w-full h-72"
              />
            </div>
            <div className="flex justify-between">
              <h4 className="text-xl font-bold mt-2">{item.Name}</h4>
              <h4 className="text-xl font-bold mt-3 ml-auto mr-1">{avrRating}</h4>
              <h4 className="flex text-xl mt-4 mr-6 text-yellow"><BiSolidStarHalf/></h4>
            </div>
            <div className="">
              <h4 className="text-lg text-gray-500">{item.Place}</h4>
              <h4 className="text-lg text-gray-500">{item.Address?.state}</h4>
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
  );
}

export default Shops;

