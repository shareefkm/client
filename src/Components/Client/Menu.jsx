import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiSolidStarHalf } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import ProductDetailModal from "./ProductDetailModal";
import RestaurantAxios from "../../Axios/RestaurantAxios";
import UserAxios from "../../Axios/UserAxios";
import Button from "../../assets/Button";
import Pagination from "../../assets/Pagination";
// import './Menu.css'

function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restData, setRestData] = useState();
  const [product, setProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterdProducts, setFilterdProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [item, setsetItem] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const price = [
    {fieled: '₹ : 0 - 50',
    startedAt: 0},
    {fieled: '₹ : 50 - 100',
    startedAt: 50},
    {fieled: '₹ : 100 - 500',
    startedAt: 100},
    {fieled: '₹ : 500 - 1000',
    startedAt: 500},
    {fieled: '₹ : 1000+',
    startedAt: 1000},
  ]

  const itemsPerPage = 5;
  const totalPages = Math.ceil(product.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = product.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const togglePriceDropdown = () => setIsPriceDropdownOpen(!isPriceDropdownOpen);

  const navigate = useNavigate();

  const { restId } = useParams();

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const response = async () => {
      try {
        const { data } = await RestaurantAxios.get(
          `/getresprofile?id=${restId}`
        );
        if (data) {
          setRestData(data.restData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, []);

  useEffect(() => {
    RestaurantAxios.get(`/getrestarantproduct?id=${restId}`).then(
      (response) => {
        setProduct(response.data.product);
      }
    );
  }, []);

  const categoryData = async () => {
    const { data } = await RestaurantAxios.get(`/getcategory?id=${restId}`);
    if (data) {
      setCategories(data.categoryDatas);
      // setCategory(data.categoryDatas[0].name);
    }
  };

  useEffect(() => {
    categoryData();
  }, []);

  useEffect(() => {
    const fetchProducts = () => {
      const searchTermLowercase = searchTerm.toLowerCase();
      const filteredProducts = product.filter((product) =>
        product.name.toLowerCase().includes(searchTermLowercase)
      );
      setFilterdProducts(filteredProducts);
    };
    fetchProducts();
  }, [searchTerm]);
  
  let totalRatings = 0;
  const calicAverRating = () => {
    if (!restData) return null;
    let numberOfRatings = 0;
    if (restData.rating && restData.rating.length > 0) {
      restData.rating.forEach((rating) => {
        totalRatings += rating;
        numberOfRatings += 1;
      });
    }

    return numberOfRatings > 0 ? totalRatings / numberOfRatings : 0;
  };
  const avrRating = calicAverRating();

  const handleCategorySelection = (ind) => {
    const selectedCat = categories[ind];
    setSelectedCategory(selectedCat);
  
    if (selectedCat) {
      const catId = selectedCat._id;
      const catProd = product.filter((product) => product.category === catId);
      toggleDropdown();
      setFilterdProducts(catProd);
    } else {
      setFilterdProducts([]);
    }
  };

  const handlePriceSelection = (indx) => {
    const priceSelected = price[indx]
    setSelectedPrice(priceSelected);
    console.log(priceSelected);
    let nearestPrice;
    if(indx < price.length-1){
       nearestPrice = price[indx+1].startedAt
    }else{
       nearestPrice = 5000
    }
  
    if (priceSelected) {
      const pricedProd = product.map((variant) => {
        const filteredVariants = variant.variants.filter((priceBetween) => {
          return (priceBetween.price >= priceSelected.startedAt && priceBetween.price < nearestPrice)
        });
        return { ...variant, variants: filteredVariants };
      });
      togglePriceDropdown();
      setFilterdProducts(pricedProd);
    }else{
      setFilterdProducts([]);
    }
  };
  
  
  return (
    <div className="container mx-auto px-5 my-element pt-5">
      <ProductDetailModal isOpen={isModalOpen} close={closeModal} item={item} />
      <div className="sm:px-24 px-3 md:px-32 lg:px-44 pt-3">
        <div className="grid grid-cols-1 p-2 py-3 shadow-md rounded-md">
          <div className="mb-10">
            <div className="flex justify-between items-baseline">
              <h4 className="text-xl font-bold mt-2">{restData?.Name}</h4>
              <div className="border rounded-sm px-3 py-1 shadow-md bg-white">
                <div className="flex ">
                  <h4 className="text-xl font-bold ml-auto mr-1">
                    {isNaN(avrRating) ? "N/A" : avrRating}
                  </h4>
                  <h4 className="flex text-xl mt-1 text-yellow">
                    <BiSolidStarHalf />
                  </h4>
                </div>
                <hr />
                <div className="font-lobster text-gray-500">N/A</div>
              </div>
            </div>
            <div className="">
              <h4 className="text-lg text-gray-500">{restData?.Place}</h4>
              <h4 className="text-lg text-gray-500">
                {restData?.Address?.state}
              </h4>
            </div>
          </div>
          <div className="border border-gray-300 h-2 bg-gray-300"></div>
        </div>

        <div className="text-center mt-8 flex items-center justify-between mb-4">
          <div className="navbar shadow-lg">
            <div className="navbar-start">
              <div className="dropdown ">
                <label
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden"
                  onClick={(e) =>
                    e.currentTarget.nextElementSibling.classList.toggle(
                      "hidden"
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu-md dropdown-content mt-3 z-[1] p-2 shadow w-52  bg-gray-800 text-off-White"
                >
                  <li className="font-semibold my-2 cursor-pointer ">
                    <button
                      type="button"
                      onClick={toggleDropdown}
                      className="flex items-center text-sm font-medium text-off-White hover:text-off-White focus:outline-none"
                    >
                     {selectedCategory ? selectedCategory.name :  "Category"}
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform ${
                          isDropdownOpen ? "" : "transform rotate-180"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  {isDropdownOpen && categories.map((cate,indx) => (
                    <li key={indx}>{cate.name}</li>
                  ))}
                </ul>
              </div>
              <input
                type="text"
                placeholder="Search an item..."
                className="px-2 py-2 border rounded-sm focus:outline-none focus:right-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
                <li className="font-semibold my-2 cursor-pointer">
                <section
                        aria-labelledby="information-heading"
                        className=""
                      >
                        <div className="relative">
                          <button
                            type="button"
                            onClick={toggleDropdown}
                            className="flex items-center text-sm font-medium focus:outline-none"
                          >
                            {selectedCategory ? selectedCategory.name :  "Category"}
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform ${
                                isDropdownOpen ? "" : "transform rotate-180"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {isDropdownOpen && (
                            <div
                              className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                              style={{ zIndex: 10 }}
                            >
                              {categories.map((option, index) => (
                                <div
                                  key={index}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer text-left"
                                  onClick={()=>handleCategorySelection(index)}
                                >
                                  {option.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                </li>

                <li className="font-semibold my-2 cursor-pointer">
                <section
                        aria-labelledby="information-heading"
                        className=""
                      >
                        <div className="relative">
                          <button
                            type="button"
                            onClick={togglePriceDropdown}
                            className="flex items-center text-sm font-medium focus:outline-none"
                          >
                            {selectedPrice ? selectedPrice.fieled :  "Select Price"}
                            <svg
                              className={`w-4 h-4 ml-2 transition-transform ${
                                isPriceDropdownOpen ? "" : "transform rotate-180"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.293 5.293a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L10 7.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>

                          {isPriceDropdownOpen && (
                            <div
                              className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                              style={{ zIndex: 10 }}
                            >
                              {price.map((option, index) => (
                                <div
                                  key={index}
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 cursor-pointer text-left"
                                  onClick={()=>handlePriceSelection(index)}
                                >
                                  {option.fieled}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </section>
                </li>
              </ul>
            </div>
          </div>
        </div>
        

        {filterdProducts.length !== 0
          ? filterdProducts?.map((prod) => (
              <div className="p-2" key={prod._id}>
                <div className="mb-10 sm:flex sm:justify-between block">
                  <div className="">
                    <h4 className="text-xl font-bold mt-2">{prod.name}</h4>
                    <h4 className="text-lg text-gray-500">
                      {prod.description}
                    </h4>
                    <h4 className="text-lg text-gray-500">
                      Best Price :₹ {prod.variants[0]?.offerPrice}
                    </h4>
                  </div>
                  <div
                    className="sm:w-36 sm:h-28 rounded-md bg-cover bg-center bg-no-repeat h-72 flex flex-col justify-between"
                    style={{ backgroundImage: `url(${prod?.images})` }}
                  >
                    <div className="flex flex-col justify-end h-full"></div>
                    <Button
                      onClick={() => handleProducData(prod._id)}
                      value="Buy Now"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="border border-gray-500"></div>
              </div>
            ))
            
          : 
          <div className="pb-8 mb-5">{
          currentItems?.map((prod) => (
              <div className="pb-2" key={prod._id}>
                <div className="mb-10 sm:flex sm:justify-between block">
                  <div className="">
                    <h4 className="text-xl font-bold mt-2">{prod.name}</h4>
                    <h4 className="text-lg text-gray-500">
                      {prod.description}
                    </h4>
                    <h4 className="text-lg text-gray-500">
                      Best Price :₹ {prod.variants[0]?.offerPrice}
                    </h4>
                  </div>
                  <div
                    className="sm:w-36 sm:h-28 rounded-md bg-cover bg-center bg-no-repeat h-72 flex flex-col justify-between"
                    style={{ backgroundImage: `url(${prod?.images})` }}
                  >
                    <div className="flex flex-col justify-end h-full"></div>
                    <Button
                      onClick={() => handleProducData(prod._id)}
                      value="Buy Now"
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="border border-gray-500"></div>
              </div>
            ))}
            <div className="float-right mr-3 mt-3 pb-10">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          </div>
            }
      
      </div>
    </div>
  );
}

export default Menu;
