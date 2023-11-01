import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiSolidBarChartSquare, BiSolidUserRectangle,BiFoodMenu,BiCategory } from 'react-icons/bi'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { MdSettingsApplications, MdOutlineFastfood } from 'react-icons/md'

function SideBar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate()
  const Menus = [
    { title: "Dashboard", icon: <BiSolidBarChartSquare/>, path: "/restaurant" },
    { title: "Profile", icon: <BiSolidUserRectangle/>, path: "/restaurant/profile", gap: true },
    { title: "Category", icon: <BiCategory/> , path: "/restaurant/category"},
    { title: "Add Menu Item", icon: <AiOutlinePlusSquare/> , path: "/restaurant/addproduct"},
    { title: "Menu Item", icon: <MdOutlineFastfood/>,  path: "/restaurant/products" },
    { title: "Orders", icon: <BiFoodMenu/>,  path: "/restaurant/orders" },
    // { title: "Setting", icon: <MdSettingsApplications/>, path: "/restaurant/profile" },
  ];

  return (
    <div>
      <div className="flex bg-cherry-Red">
        <div className={"flex bg-cherry-Red lg:h-screen"}>
        <div className="dropdown ">
      <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={e => e.currentTarget.nextElementSibling.classList.toggle('hidden')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu-md dropdown-content mt-3 z-[1] p-2 shadow w-52  bg-gray-800 text-off-White">
        {Menus.map((title, index) => (
            <li key={index} className="font-semibold my-2 cursor-pointer">
              <Link className='hover:bg-transparent hover:text-off-White flex' to={title.path}>
                {title.icon}&nbsp;&nbsp;{title.title}</Link>
            </li>
          ))}
      </ul>
    </div>
          <div
            className={` ${
              open ? "w-72" : "w-20"
            } ${open} h-20 p-5  pt-6 relative duration-300 hidden lg:block`}
          >
            <img
              src="/icons/control.png"
              className={`absolute cursor-pointer -right-3 top-7 w-7
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center justify-center">
              <h1
                className={`text-3xl font-bold text-off-White font-lobster duration-200${
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
              className={`flex rounded-md p-2 cursor-pointer text-off-White  items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
              onClick={()=>navigate(Menu.path)}
            > 
              <span className='text-2xl'>{Menu.icon}</span>
              <span className={`${!open && "hidden"} origin-left duration-200 text-sm`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar
