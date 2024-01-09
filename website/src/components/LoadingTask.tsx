import React from "react";

const LoadingTask = () => {
  return (
    <div className="shadow-md min-w-[15vw] max-w-[30vw] bg-gray-100 py-1 ">
        <div className=" m-2 flex items-center gap-2">
          <h4 className="flex-1 p-1 bg-gray-300 font-mono h-7 animate-pulse"></h4>
          <span className=" h-5 w-5 bg-gray-300 animate-pulse"></span>
          <span className="w-5 h-5 bg-gray-300 color-black animate-pulse hover:text-yellow-500 transition-all duration-300"></span>
        </div>
        <h5 className="p-1 m-2 bg-gray-300 font-bold h-7 animate-pulse"></h5>
    </div>
  );
};

export default LoadingTask;
