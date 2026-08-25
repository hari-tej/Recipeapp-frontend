import Navbar from "./Navbar";
import Heading from "./Heading";
import Footer from "./Footer";
import Recipecard from "./Recipecard"
import { useState,useEffect } from "react";
import axios from "axios";

const Home = () => {
 const[search,setSearch]=useState("");
 const[data,setData]=useState([])
 const[category,setCategory]=useState("");
  const [type, setType] = useState("");
  const[time,setTime]=useState("");
  const[origin,setOrigin]=useState("");
  const[spice,setSpice]=useState("");
  const[loading,setLoading]=useState(false);

const token=localStorage.getItem("token")

useEffect(()=>{
   setLoading(true)
   const getdata=async()=>{
    try{
       const response = await axios.get(
         "https://recipeapp-backend-agi6.onrender.com/recipe/getrecipes",
         {
           headers: {
             authorization: `Bearer ${token}`,
           },
         },
       )
       if(response){
          setData(response.data.data)
       }
       setLoading(false)

   }catch(e){
    console.log(e)
    toast.error(e.message);
  }
  
}
 getdata();
},[token])

const handlesearch=(e)=>{
  setSearch(e.target.value);
}

const data1=data.filter((item)=>{
  return item.status==="pending" 
})
 const filterdata=data1.filter((item)=>{
  return (
    item.recipename.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.recipecategory === category) &&
    (type === "" || item.recipetype === type) &&
    (origin === "" || item.recipeorigin === origin) &&
    (time === "" || item.recipecookingtime === time) &&
    (spice === "" || item.recipespice === spice)
  );
 })

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Navbar />
        <Heading />
        <div className="px-10 py-5">
          <div className="flex justify-between">
            <p className="text-2xl font-extrabold font-serif">
              Explore new recipes
            </p>
            <input
              type="text"
              placeholder="search by recipe name"
              className="px-5 py-1 text-center w-2/5 bg-green-200 rounded-lg border border-green-600"
              onChange={handlesearch}
            />
          </div>
          <div className="flex justify-between bg-green-200 p-2 my-5 rounded-2xl">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="bg-green-400 rounded-2xl p-2 border-green-700 text-center"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="vegeterian">Vegeterian</option>
              <option value="non-vegeterian">Non-vegeterian</option>
            </select>
            <select
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              className="bg-green-400 rounded-2xl p-2 border-green-700 text-center"
            >
              <option value=""> Select cooking time</option>
              <option value="10 mins">10 mins</option>
              <option value="15 mins">15 mins</option>
              <option value="30 mins">30 mins </option>
              <option value="45 mins">45 mins </option>
              <option value="1 hour">1 hour</option>
              <option value="1-2 hours">1-2 hours</option>
              <option value="more than 2 hours">more than 2 hours</option>
            </select>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              className="bg-green-400 rounded-2xl p-2 border-green-700 text-center"
            >
              <option value="">Select type</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Snacks">Snacks</option>
              <option value="Dinner">Dinner</option>
            </select>
            <select
              value={origin}
              onChange={(e) => {
                setOrigin(e.target.value);
              }}
              className="bg-green-400 rounded-2xl p-2 border-green-700 text-center"
            >
              <option value="">Select origin</option>
              <option value="Indian">Indian</option>
              <option value="Asian">Asian</option>
              <option value="Western">Western</option>
              <option value="African">African</option>
            </select>
            <select
              value={spice}
              onChange={(e) => {
                setSpice(e.target.value);
              }}
              className="bg-green-400 rounded-2xl p-2 border-green-700 text-center"
            >
              <option value="">Select spice</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Extreme">Extreme</option>
            </select>
          </div>
        </div>
        <div className="min-h-screen">
          {loading ? (
            <div className="flex justify-center py-8">
              <p className="text-2xl"> Loading...</p>
            </div>
          ) : (
            <div className="px-4 my-10 h-full flex justify-evenly flex-wrap gap-4">
              {filterdata.map((item, ind) => {
                return (
                  <Recipecard
                    key={item._id}
                    data={item}
                    ind={ind}
                    location={"home"}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );}

export default Home;
