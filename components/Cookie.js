import React from "react";
import { urlFor } from "helpers/sanity";
import RenderBody from "utils/body";

const Cookie = ({ cookie, readMore = false }) => {
  return (
    <div className="flex flex-col space-y-4 lg:space-y-4 h-full justify-between items-between">
      {cookie.thumbnail && (
        <div className="relative h-full flex justify-center items-center">
          <img
            src={urlFor(cookie.thumbnail).width(800)}
            layout="responsive"
            objectfit="contain"
          />
        </div>
      )}
      <h2 className="text-vibrant font-body uppercase font-normal text-xl xl:text-2xl text-center">
        {cookie.title}
      </h2>
      <RenderBody
        body={cookie.extraInfo}
        className="text-lg md:text-xl font-body text-vibrant text-center"
      />
      {readMore && (
        <button className="text-vibrant font-body uppercase font-normal text-base text-center underline">
          Read more
        </button>
      )}
    </div>
  );
};

export default Cookie;
