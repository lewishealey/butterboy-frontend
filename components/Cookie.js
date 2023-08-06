import React from "react";
import { urlFor } from "helpers/sanity";

const Cookie = ({ cookie, readMore = false }) => {
  return (
    <div className="flex flex-col space-y-4">
      {cookie.thumbnail && (
        <div className="relative h-60">
          <img
            src={urlFor(cookie.thumbnail).width(400)}
            className="h-full w-auto m-auto"
            layout="fill"
            objectfit="contain"
          />
        </div>
      )}
      <h2 className="text-vibrant font-body uppercase font-normal text-xl text-center">
        {cookie.title}
      </h2>
      {readMore && (
        <button className="text-vibrant font-body uppercase font-normal text-base text-center underline">
          Read more
        </button>
      )}
    </div>
  );
};

export default Cookie;
