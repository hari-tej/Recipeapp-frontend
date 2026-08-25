import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate=useNavigate();

  
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const response = await axios.post(
          "https://recipeapp-backend-agi6.onrender.com/user/register",
          {
            username,
            email,
            password,
          },
        );
        if(response){
          toast.success("registration successful");
          setTimeout(() => {
            setLoading(false);
            setEmail("");
            setUsername("");
            setPassword("");
            navigate("/");
          }, 1000);
            
        }
    }catch(e){
      setLoading(false);
      console.log(e)
      toast.error("username exists");
    }

    
  };

  return (
    <>
      <div className="flex justify-center items-center my-20">
        <div className="py-15 w-full max-w-md flex justify-center h-full">
          <form
            className=" px-10 py-3  rounded-lg shadow-xl shadow-green-200 border-green-500 border-2"
            onSubmit={handlesubmit}
          >
            <h1 className="flex justify-center items-center my-3 font-bold text-xl text-green-600">
              REGISTER
            </h1>
            <div className="flex flex-col justify-center gap-4">
              <div>
                <label>Username</label>
                <input
                  className="p-1  border-green-500 border-2 w-full rounded"
                  type="text"
                  value={username}
                  placeholder="enter your name"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  className="p-1 border-green-500 border-2 w-full rounded"
                  type="email"
                  value={email}
                  placeholder="enter your email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  className="p-1  border-green-500 border-2 w-full rounded"
                  type="password"
                  value={password}
                  placeholder="enter your password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>

              <button className="bg-green-500 text-white py-2 rounded w-full hover:bg-green-700 cursor-pointer ">
                {loading ? "Registering..." : "Register"}
              </button>
              <div className="flex justify-center">
                <p className="mb-2">
                  Already Register?
                  <Link to="/" className="text-blue-500">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right"/>
      </div>
    </>
  );
};

export default Register;
