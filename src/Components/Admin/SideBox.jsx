import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbSettings2 } from 'react-icons/tb'
import { PiUserSquare } from 'react-icons/pi'
import { RiCoupon2Line } from 'react-icons/ri'
import { BiSearchAlt, BiChart, BiBarChartSquare } from 'react-icons/bi'
import CouponModall from "../../assets/CouponModall"; 
function SideBox() {
  const [open, setOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const Menus = [
    { title: "Dashboard", src:<BiBarChartSquare/>,  path:()=>navigate('/admin') },
    { title: "Accounts", src: <PiUserSquare/>,  path:()=>navigate('/admin'), gap: true },
    { title: "Coupon", src: <RiCoupon2Line/>, path: () => navigate('/admin/coupon') }, 
    { title: "Search", src: <BiSearchAlt/>,  path:()=>navigate('/admin') },
    { title: "Analytics", src: <BiChart/>,  path:()=>navigate('/admin') },
    { title: "Setting", src: <TbSettings2/>,  path:()=>navigate('/admin') },
  ];

  return (
    <div>
      <div className="flex">
        <div className={"flex bg-cherry-Red h-screen"}>
          <div
            className={` ${
              open ? "w-72" : "w-20"
            } ${open && "bg-off-White"} border border-cherry-Red bg-cherry-Red h-20 p-5  pt-6 relative duration-300`}
          >
            <img
              src="/icons/control.png"
              className={`absolute cursor-pointer -right-3 top-7 w-7
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center justify-center">
              <h1
                className={`text-3xl font-bold text-cherry-Red font-lobster duration-200${
                  !open && "scale-0"
                }`}
              >
                Yummi
              </h1>
            </div>
            <ul className="pt-6">
              {Menus.map((Menu, index) => (
                <li
                  key={index}
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-cherry-Red text-off-White items-center gap-x-4 
                  ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                  } `}
                  onClick={Menu.path} // Use the provided path function
                >
                  <span className="text-2xl">{Menu.src}</span>
                  <span className={`${!open && "hidden"} origin-left duration-200 text-sm`}>
                    {Menu.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <CouponModall isOpen={isModalOpen} closeModal={closeModal} /> */}
    </div>
  );
}

export default SideBox;
