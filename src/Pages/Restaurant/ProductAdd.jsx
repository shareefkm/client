import React from "react";
import AddProduct from "../../Components/Restaurant/AddProduct";
import Header from "../../Layouts/Header/Header";
import SideBar from "../../Components/Restaurant/SideBar";

function ProductAdd() {
  return (
    <div>
      <Header restaurant={true}/>
      <div className="lg:flex">
        <div>
        <SideBar/>
        </div>
        <div className="lg:w-full">
        <AddProduct />
        </div>
      </div>
    </div>
  );
}

export default ProductAdd;
