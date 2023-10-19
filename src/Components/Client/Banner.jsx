import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";
import axios from "axios";
import UserAxios from "../../Axios/UserAxios";
import PopularItems from "./PopularItems";

import "./Banner.css";

function Banner() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [restaurants, setrestaurants] = useState([]);
  const [suggestion, setSuggestion] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [searchLocation, setSearchLocation] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const rest = async () => {
      try {
        const { data } = await UserAxios.get("/getrestaurants");
        if (data) {
          setrestaurants(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    rest();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await UserAxios.get(
          `/searchproduct?keyword=${searchTerm}`
        );

        if (searchTerm === "") setProducts(null);
        else setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  // Function to get location suggestions from Mapbox Geocoding API
  const getLocationSuggestions = async (query) => {
    const MAPBOX_API_KEY =
      "pk.eyJ1Ijoieml5YWR1IiwiYSI6ImNsa2tyb3hycjBmMHQza28zY2JyeGE5bXEifQ.uK6EfNoLf37b1K6oFdjFJw";
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
    const params = {
      access_token: MAPBOX_API_KEY,
      types: "place,locality,neighborhood", // Limit results to places only
      limit: 5, // Number of suggestions to retrieve
      country: "IN",
    };

    try {
      const response = await axios.get(endpoint, { params });
      return response.data.features;
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
      return [];
    }
  };

  // Function to handle location suggestion selection
  const handleLocationSuggestion = async (query) => {
    // Get location suggestions when the user types
    const suggestions = await getLocationSuggestions(query);
    setLocationSuggestions(suggestions);
  };

  // Function to calculate distance between two sets of coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      const filtered = restaurants?.restaurants?.filter((restaurant) => {
        const distance = calculateDistance(
          latitude,
          longitude,
          restaurant.latitude,
          restaurant.longitude
        );
        return distance <= 100; // You can change the distance threshold as needed
      });
      setFilteredProducts(filtered);
    }
  }, [latitude, longitude, location]);

  return (
    <>
      <div className="lg:flex h-1/3 bg-off-White w-full">
        <div className="lg:w-2/3 py-7 px-10 md:py-40 md:px-44 bg-no-repeat md:block hide-background-image">
          <div className="md:pl-40 text-center">
            <h3 className="font-extrabold text-2xl leading-loose md:text-3xl text-cherry-Red">
              Welcome To Yummi...
            </h3>
          </div>
          <div className="md:pl-40 text-center">
            <h4 className="font-bold text-3xl md:leading-relaxed mt-4 md:text-4xl">
              Discover a Place <br /> where you’ll <br /> love to eat.
            </h4>
          </div>
          <div className="md:pl-40 text-center mt-8 flex items-center justify-center">
            <button
              onClick={() => setSearchLocation(!searchLocation)}
              className="bg-cherry-Red text-white py-3 px-4 rounded-l-full focus:outline-none focus:ring-1 text-lg"
            >
              <ImLocation2 />
            </button>
            {searchLocation ? (
              <div className="relative">
                <input
                  onChange={(e) => {
                    const inputLocation = e.target.value;
                    setSuggestion(inputLocation.trim() !== "");
                    setLocation(inputLocation);
                    handleLocationSuggestion(inputLocation);
                  }}
                  value={location}
                  type="text"
                  placeholder="Find nearest restaurant"
                  className="px-4 py-2 border focus:outline-none focus:right-1"
                />
                {location && (
                  <button
                    onClick={() => {
                      setLocation("");
                      setFilteredProducts([]);
                      setLocationSuggestions([]);
                      setSearchLocation(!searchLocation);
                    }}
                    className="w-8 h-6 flex-colo bg-subMain rounded-full hover:bg-dry"
                  >
                    X
                  </button>
                )}

                {/* Display location suggestions */}
                <ul className="absolute z-10 mt-2  bg-main border border-border rounded-lg shadow-lg">
                  {suggestion &&
                    locationSuggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        className="p-2 hover:bg-subMain cursor-pointer"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSuggestion(false);
                            setLocation(suggestion.place_name);
                            setLocationSuggestions([]);
                            const [long, lat] =
                              suggestion?.geometry.coordinates;
                            setLatitude(lat);
                            setLongitude(long);
                          }}
                        >
                          {suggestion.place_name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Search an item..."
                className="px-4 py-2 border focus:outline-none focus:right-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            )}
            <button className="bg-cherry-Red text-white py-3 px-4 rounded-r-full focus:outline-none focus:ring-1 text-lg">
              <FiSearch />
            </button>
          </div>
        </div>
        <div className="lg:flex lg:w-1/3 justify-end hidden">
          <img className="" src="/images/banner-img-2.webp" alt="" />
        </div>
      </div>

      <PopularItems
        products={products}
        restaurants={restaurants}
        filteredProducts={filteredProducts}
        location={location}
      />
    </>
  );
}

export default Banner;
