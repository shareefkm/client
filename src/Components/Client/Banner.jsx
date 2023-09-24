import React from "react";
import './Banner.css'

function Banner() {
  return (
    <div className="lg:flex h-1/3 bg-off-White w-full">
    <div className="lg:w-2/3 py-7 px-10 md:py-40 md:px-44 bg-no-repeat md:block hide-background-image">
      <div className="md:pl-40 text-center">
        <h3 className="font-extrabold text-2xl leading-loose md:text-3xl text-cherry-Red">Welcome To Yummi...</h3>
      </div>
      <div className="md:pl-40 text-center">
        <h4 className="font-bold text-3xl md:leading-relaxed mt-4 md:text-4xl">Discover a Place <br/> where you’ll <br/> love to eat.</h4>
      </div>
    </div>
    <div className="lg:flex lg:w-1/3 justify-end hidden">
      <img className="" src="/images/banner-img-2.webp" alt="" />
    </div>
  </div>
  );
}

export default Banner;
