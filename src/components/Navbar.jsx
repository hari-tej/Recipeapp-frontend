import {CookingPot} from 'lucide-react'
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="bg-green-600 flex justify-end gap-2 p-5 shadow-gray-700 shadow-2xl">
      <div className="mx-auto w-full flex gap-2">
        <h1 className="font-extrabold tracking-widest text-xl text-white">
          CookBook
        </h1>
        <CookingPot strokeWidth={2.5} color="white" />
      </div>
      <div className="flex gap-4 text-white font-medium">
        <Link to="/home">
          <h3 className="cursor-pointer">Home</h3>
        </Link>
        <Link to="/contribute">
          <h3 className="cursor-pointer">Contribute</h3>
        </Link>
        <Link to="/profile">
          <h3 className="cursor-pointer">Profile</h3>
        </Link>
      </div>
    </div>
  );
}

export default Navbar