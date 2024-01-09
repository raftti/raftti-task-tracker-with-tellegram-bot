"use client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";
import { FiArchive, FiHome, FiChevronUp, FiChevronDown } from "react-icons/fi";

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

  return (
    <div className={clsx("flex flex-col w-[9vw] mt-3 rounded-md gap-1 items-center", {'bg-deepBlue shadow-xl': isOpen})}>
      <div
        className={clsx(
          "gap-5 transition-all duration-700",
          isOpen ? "flex m-2" : "hidden"
        )}
      >
        <button onClick={() => router.push("/")}>
          <FiHome size={25} fill={'pink'}/>
        </button>
        <button onClick={() => router.push("/archive")}>
          <FiArchive size={25} fill={'pink'}/>
        </button>
      </div>
      <button
        className=" w-fit border-2 border-transparent hover:border-black rounded-md hover:border-2 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiChevronUp size={25} /> : <FiChevronDown size={25} />}
      </button>
    </div>
  );
};

export default Navigation;
