import React from 'react'
import { Link } from 'react-router-dom';
const Heading = () => {
  return (
    <div className="bg-black flex flex-col p-5 h-7/12  text-white max-h-85 gap-1 my-7 mx-5 rounded-lg shadow-2xl shadow-gray-700">
      <div className="flex w-full">
        <div className="w-2/4 ">
          <h1 className="font-bold text-3xl">Explore a range of recipes.</h1>
          <h1 className="font-bold ">Cook. Share. Repeat.</h1>
          <p className="font-extralight text-start lg:w-2/3">
            Food is an emotion, and tasty food is undeniable.Discover a range of
            recipes from continental to desi. Share your recipes and let others
            discover new tastes. Learn, Cook, Enjoy, Repeat.
          </p>
        </div>
        <div className="w-1/2 flex justify-center h-1/2">
          <img src="/food.jpg" alt="" className="w-1/2 rounded-2xl" />
        </div>
      </div>
      <div className="">
        <div className="flex gap-2">
          <Link to="/contribute">
            <button className="bg-blue-500 py-2 px-5 my-3 rounded-xl hover:bg-black hover:border-blue-500 hover:border hover:cursor-pointer">
              Explore Favourites
            </button>
          </Link>
          <Link to="/contribute">
            <button className="bg-blue-500 py-2 px-5 my-3 rounded-xl hover:bg-black hover:border-blue-500 hover:border hover:cursor-pointer">
              Share Recipe
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Heading