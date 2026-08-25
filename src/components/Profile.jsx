import Navbar from "./Navbar";
import Footer from "./Footer";
import { CircleUserRound } from "lucide-react";
import { Clock } from "lucide-react";
import Recipecard from "./Recipecard";
import Emptyhistory from "./Emptyhistory";
import { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const[loading,setLoading]=useState(false);
  const[loadingd,setLoadingd]=useState(false);
  const [data,setData]=useState([])

  const token = localStorage.getItem("token");
   const navigate = useNavigate();
   const username = localStorage.getItem("username");
   const userid=localStorage.getItem("userid");
   const email = localStorage.getItem("email");

  useEffect(()=>{
    setLoadingd(true)
    const getdata=async()=>{
          try{
              const response= await axios.get("https://recipeapp-backend-agi6.onrender.com/recipe/getrecipes",{
                headers:{
                  authorization:`Bearer ${token}`
                }
              })
              if(response){
                setData(response.data.data);
                setLoadingd(false)
              }

            }catch(e){
              console.log(e)
              toast.error(e.message);

            }
    }
    getdata()
      
  },[token])

  const filterdata=data.filter((item)=>{
    return (item.status === "completed") && (item.userId === userid)
  })

  const handlelogout=()=>{
       setLoading(true)
       toast.success("logout successful");
      
       setTimeout(()=>{
           setLoading(false);
           navigate("/")
           localStorage.removeItem("token");
           localStorage.removeItem("userid");
           localStorage.removeItem("username");
           localStorage.removeItem("email");

       },1000)
  }

  const userdata=data.filter((item)=>{
    return item.userId===userid
  })


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full gap-10 my-20 ">
        <div className=" flex flex-col gap-5 pt-20 pb-10 px-5 mb-2 rounded-2xl text-black  shadow-gray-700 shadow-2xl w-75">
          <div className="flex justify-center">
            <CircleUserRound size={60} className="" />
          </div>
          <div className="flex gap-2">
            <label>Username:</label>
            <p className="font-bold">{username.toUpperCase()}</p>
          </div>

          <div className="flex gap-2">
            <label>Email:</label>
            <p className="font-bold">{email}</p>
          </div>
          <div className="flex gap-2">
            <label>Contributions:</label>
            <p className="font-bold">{userdata.length}</p>
          </div>
          <button
            className="bg-red-500 py-2 rounded-lg text-white hover:cursor-pointer"
            onClick={handlelogout}
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
        <div className="px-5 flex-1 my-10 max-h-screen w-full">
          <div className=" w-full p-5 flex gap-2">
            <p className="text-2xl font-extrabold">History of Recipes </p>
            <Clock size={35} />
          </div>
          {loadingd ? (
            <div className="flex justify-center py-8">
              <p className="text-2xl"> Loading...</p>
            </div>
          ) : filterdata.length > 0 ? (
            <div className="flex flex-wrap justify-evenly gap-2">
              {filterdata.map((item, ind) => {
                return (
                  <Recipecard
                    data={item}
                    key={item._id}
                    ind={ind}
                    location={"history"}
                  />
                );
              })}
            </div>
          ) : (
            <Emptyhistory />
          )}
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Profile