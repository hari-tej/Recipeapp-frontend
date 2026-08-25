import { Bookmark,SquareDot } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Recipecard = (props) => {
  const[loading,setLoading]=useState(false)
 const navigate=useNavigate()
  const userid=localStorage.getItem("userid");
  const token=localStorage.getItem("token");

    const handlebookmark=async(id)=>{
         try{
           const response = await axios.put(
             "https://recipeapp-backend-agi6.onrender.com/recipe/updatefavourites",
             {
               cardid: id,
             },
             {
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             },
           );
           if(response){
             toast.success("added to favourites")
           }
        }catch(e){
          console.log(e)
          toast.error(e.message);
        }
    }

    const handledeletefav=async(id)=>{
        try{
           const response = await axios.delete(
             "https://recipeapp-backend-agi6.onrender.com/recipe/deletefavourites",
             {
               data: {
                 cardid: id,
               },
               headers: {
                 Authorization: `Bearer ${token}`,
               }
             }
           );
           if(response){
             toast.success("removed from favourites")
             
           }
        }catch(e){
          console.log(e)
          toast.error(e.message);
        }
        navigate(0);
    }

    const handledelete=async(id)=>{
      setLoading(true)
       try{
          const response = await axios.delete(
            `https://recipeapp-backend-agi6.onrender.com/recipe/deleterecipe/${id}`,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );
          if(response){
            setLoading(false)
            toast.success("successfully deleted")
            navigate(0);
          }

       }catch(e){
        setLoading(false);
        console.log(e)
        toast.error(e.message);

       }
    }

    let description=props.data.recipedescription
    if(description.split(" ").length > 20){
      description=description.split(" ").slice(0,20).join(" ")
    }

  return (
    <>
      <div
        className={`flex flex-col gap-2 w-1/4  p-3 rounded-lg shadow-gray-700 shadow-xl ${props.location === "history" ? "opacity-55" : "opacity-100"}`}
      >
        <img
          src={`${props.data.recipeimageurl}`}
          alt="image"
          className="w-full h-40 rounded aspect-3/4 object-cover"
        />
        <div className="flex justify-between px-4">
          <p className="font-extrabold">
            {props.data.recipename.toUpperCase()}
          </p>
          <div className="flex gap-1">
            <SquareDot
              strokeWidth={2.5}
              color={
                props.data.recipecategory === "vegeterian" ? "green" : "red"
              }
            />
            {props.location === "home" ? (
              <Bookmark
                size={25}
                color={"black"}
                className="hover:cursor-pointer"
                onClick={() => {
                  handlebookmark(props.data._id);
                }}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="flex px-4">
          <p className="text-sm font-light">
            contributed by: {props.data.username}
          </p>
        </div>

        <div className="flex flex-wrap justify-start gap-2 px-4 py-1 ">
          <p className="bg-green-300 py-1 px-2 border-green-600 border-2 rounded-2xl text-white text-sm">
            {props.data.recipecategory}
          </p>
          <p className="bg-green-300 py-1 px-2 border-green-600 border-2 rounded-2xl text-white text-sm">
            {props.data.recipecookingtime}
          </p>
          <p className="bg-green-300 py-1 px-2 border-green-600 border-2  rounded-2xl text-white text-sm">
            {props.data.recipetype}
          </p>
          <p className="bg-green-300 py-1 px-2 border-green-600 border-2  rounded-2xl text-white text-sm">
            {props.data.recipeorigin}
          </p>
          <p className="bg-green-300 py-1 px-2 border-green-600 border-2  rounded-2xl text-white text-sm">
            {props.data.recipespice}
          </p>
        </div>

        <p className="font-medium text-start font-serif w-full px-3">
          {description}...
        </p>
        {props.location === "home" || props.location === "favourite" ? (
          <Link to={`/full-article/${props.data._id}`}>
            <div className="flex px-2">
              <p className="text-blue-700">Read More..</p>
            </div>
          </Link>
        ) : (
          ""
        )}
        {props.data.userId === userid && props.location === "home" ? (
          <div className="flex justify-between">
            <Link to={`/updatearticle/${props.data._id}`}>
              <button className="px-4 py-2 bg-black  text-sm text-white rounded-xl hover:cursor-pointer">
                Update
              </button>
            </Link>
            <button
              className="px-4 py-2 bg-black text-sm text-white rounded-xl hover:cursor-pointer"
              onClick={() => {
                handledelete(props.data._id);
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        ) : (
          ""
        )}
        {props.location === "favourite" ? (
          <div className="flex justify-center ">
            <button
              className="bg-black text-white rounded-lg p-2 hover:cursor-pointer"
              onClick={() => {
                handledeletefav(props.data._id);
              }}
            >
              Remove from Favourites
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default Recipecard