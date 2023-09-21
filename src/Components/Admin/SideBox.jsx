import React, { useState } from "react";

function SideBox() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div>
      <div className="flex">
        <div className={"flex bg-purple h-screen"}>
          <div
            className={` ${
              open ? "w-72" : "w-20"
            } ${open && "bg-white"} border border-purple h-20 p-5  pt-6 relative duration-300`}
          >
            <img
              src="/icons/control.png"
              className={`absolute cursor-pointer -right-3 top-7 w-7
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center justify-center">
              <h1
                className={`text-3xl font-bold text-purple font-lobster duration-200${
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
              className={`flex rounded-md p-2 cursor-pointer hover:bg-purplelite-600 text-yellow text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`/icons/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
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

export default SideBox;
