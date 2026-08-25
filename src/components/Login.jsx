import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios.post(
        "https://recipeapp-backend-agi6.onrender.com/user/login",{
          email,
          password
        }
      );
      if(response){
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("userid",response.data.userexists._id);
        localStorage.setItem(
          "username",
          response.data.userexists.username
        );
         localStorage.setItem(
           "email",
           response.data.userexists.email
         );
         toast.success("login successful");
        setTimeout(() => {
          setLoading(false);
          setEmail("");
          setPassword("");
          navigate("/home");
        }, 1000);
      }

    }catch(e){
      setLoading(false);
      console.log(e);
      toast.error("username or password is incorrect");
    }

    
  };

  return (
    <>
      <div className="flex justify-center items-center my-20">
        <div className="px-20 py-10 w-full max-w-md flex justify-center h-full">
          <form
            onSubmit={handlesubmit}
            className=" p-8 max-w-md rounded-lg shadow-green-200 shadow-xl border-green-600 border-2 w-full"
          >
            <h1 className="flex justify-center text-green-700 items-center my-3  font-bold text-xl">
              LOGIN
            </h1>
            <div className="flex flex-col justify-center gap-5">
              <div>
                <label>Email</label>
                <input
                  className="p-1  border-green-500 border-2 rounded w-full"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  placeholder="enter your email"
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  className="p-1  border-green-500 border-2 rounded w-full"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  placeholder="enter your password"
                  required
                />
              </div>

              <button className="bg-green-500 w-full text-white px-7 py-2 rounded cursor-pointer hover:bg-green-700">
                {loading ? "Logging in..." : "Login"}
              </button>

              <div className="flex justify-center">
                <p className="col-span-2">
                  Not registered?
                  <Link to="/register" className="text-blue-600 cursor-pointer">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
};

export default Login;
