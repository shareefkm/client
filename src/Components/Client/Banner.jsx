import React from "react";

function Banner() {
  return (
    <div>
      <div className="flex h-1/3 bg-purple w-full">
        <div className="w-2/3 md:w-1/2 items-center justify-center py-7 px-10 md:py-40 md:px-44">
          <div>
            <h3 className="font-extrabold text-2xl leading-loose md:text-3xl">Welcom To Yummi...</h3>
          </div>
          <div>
            <h4 className="font-bold text-white text-3xl md:leading-relaxed mt-4 md:text-4xl">Discover a Place <br/> where you’ll <br/> love to eat.</h4>
          </div>
        </div>
        <div className="w-1/3 md:w-1/2 items-center justify-center md:py-40 md:px-44">
            <img className="w-56 h-56 md:w-72 md:h-72" src="/images/welcome.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
