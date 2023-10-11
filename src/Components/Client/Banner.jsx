import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import "./Banner.css";
import UserAxios from "../../Axios/UserAxios";
import PopularItems from "./PopularItems";

function Banner() {
  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [restaurants, setrestaurants] = useState([]);

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

        if (searchTerm === "") 
        setProducts(null);
      else
      setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [searchTerm]);

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
            <input
              type="text"
              placeholder="Search an item..."
              className="px-4 py-2 border rounded-l-md focus:outline-none focus:right-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-cherry-Red text-white py-3 px-4 rounded-r-md focus:outline-none focus:ring-1 text-lg">
              <FiSearch />
            </button>
            <div>
              {/* <select onChange={(e) => setCategory(e.target.value)}> */}
              {/* <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option> */}
              {/* Add more categories as needed */}
              {/* </select> */}

              {/* <select onChange={(e) => setSort(e.target.value)}> */}
              {/* <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="price">Price</option> */}
              {/* Add more sorting options as needed */}
              {/* </select> */}
            </div>
          </div>
        </div>
        <div className="lg:flex lg:w-1/3 justify-end hidden">
          <img className="" src="/images/banner-img-2.webp" alt="" />
        </div>
      </div>

      <PopularItems products={products} restaurants={restaurants} />
    </>
  );
}

export default Banner;
