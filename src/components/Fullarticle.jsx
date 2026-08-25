import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Fullarticle = () => {
    const[loading,setLoading]=useState(false)
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [spice, setSpice] = useState("");
    const [origin, setOrigin] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [cookingtime, setCookingtime] = useState("");
    const [type, setType] = useState("");
    const[username,setUsername]=useState("");
    const [date, setDate]= useState("")
    const [procedure, setProcedure]= useState("");
    const [url, setUrl] = useState("./public/blank.png");
   
  const{id}=useParams();

  const token=localStorage.getItem("token");


  useEffect(()=>{
    setLoading(true)
       const getdata=async()=>{
           try{
              const response = await axios.get(
                `https://recipeapp-backend-agi6.onrender.com/recipe/getsinglerecipe/${id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              if (response) {
                setName(response.data.data.recipename);
                setCategory(response.data.data.recipecategory);
                setType(response.data.data.recipetype);
                setOrigin(response.data.data.recipeorigin);
                setIngredients(response.data.data.recipeingredients);
                setDescription(response.data.data.recipedescription);
                setCookingtime(response.data.data.recipecookingtime);
                setUrl(response.data.data.recipeimageurl);
                setProcedure(response.data.data.recipeprocedure);
                setSpice(response.data.data.recipespice);
                setUsername(response.data.data.username);
                setDate(response.data.data.postdate);
                setLoading(false)
              }
           }catch(e){
            console.log(e)
            toast.error(e.message);
           }
            
       }
       getdata();
  },[id,token])

 const onlydate=date.split("T")[0]
 
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex-col my-10 mx-25 shadow-2xl justify-center p-5 min-h-screen">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-2xl"> Loading...</p>
            </div>
          ) : (
            <div className="flex gap-5">
              <div className="w-1/3">
                <img
                  src={`${url}`}
                  alt="image"
                  className="rounded-2xl h-2/3 w-full aspect-3/4 object-cover"
                />
              </div>
              <div className="flex flex-col w-2/3 gap-5 ">
                <div className="flex gap-4">
                  <label className="text-start text-lg font-bold">
                    Recipe Name:
                  </label>
                  <p className=" text-start text-lg">{name.toUpperCase()} </p>
                </div>
                <div className="flex gap-4">
                  <label className="text-start text-lg font-bold">
                    Contributed By:
                  </label>
                  <p className=" text-start text-lg">{username}</p>
                </div>
                <div className="flex gap-4">
                  <label className="text-start text-lg font-bold">Date:</label>
                  <p className=" text-start text-lg">{onlydate} </p>
                </div>
                <div className="flex gap-4">
                  <label className="text-start text-lg font-bold ">
                    Description:
                  </label>
                  <p className=" text-start text-lg whitespace-pre-wrap">
                    "{description}"
                  </p>
                </div>

                <div className="flex justify-evenly my-5">
                  <p className="bg-green-400 px-3 py-2 text-white border-2 border-green-800 rounded-4xl">
                    {category}
                  </p>
                  <p className="bg-green-400 px-3 py-2 text-white border-2 border-green-800 rounded-4xl">
                    {cookingtime}
                  </p>
                  <p className="bg-green-400 px-3 py-2 text-white border-2 border-green-800 rounded-4xl">
                    {origin}
                  </p>
                  <p className="bg-green-400 px-3 py-2 text-white border-2 border-green-800 rounded-4xl">
                    {spice}
                  </p>
                  <p className="bg-green-400 px-3 py-2 text-white border-2 border-green-800 rounded-4xl">
                    {type}
                  </p>
                </div>
                <div className="flex gap-2">
                  <label className="text-start text-lg font-bold whitespace-pre-wrap">
                    INGREDIENTS:
                  </label>
                  <p className="w-full text-start text-lg">{ingredients}</p>
                </div>
                <div className="flex gap-2">
                  <label className="text-start text-lg font-bold ">
                    PROCEDURE:
                  </label>
                  <p className="w-full text-start text-lg whitespace-pre-wrap">
                    {procedure}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Fullarticle