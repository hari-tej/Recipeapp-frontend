import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";


const Updatearticle = () => {
  const [imageurlbackend, setImageurlbackend] = useState(null);
  const[loading,setLoading]=useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [spice, setSpice] = useState("");
  const [origin, setOrigin] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [cookingtime, setCookingtime] = useState("");
  const [type, setType] = useState("");
  const [procedure, setProcedure] = useState("");

  const [url, setUrl] = useState("../public/blank.png");

  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const { id } = useParams();
 

  
    const handleimageupload = async (e) => {
      const img = e.target.files[0];
      if (!img) {
        toast.error("select an image");
        return;
      }
      setUrl("../public/loading.webp");
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "recipe-images");
      data.append("cloud_name", "xuxyxkpb");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/xuxyxkpb/image/upload",
          data,
        );
        if (response) {
          setUrl(URL.createObjectURL(img));
          toast.success("image uploaded successfully");
          setImageurlbackend(response.data.secure_url);
          console.log(response.data.secure_url);
        }
      } catch (e) {
        console.log(e);
        toast.error("image upload failed");
      }

    };

    const handleupdate =async(e) => {
      e.preventDefault();
    setLoading(true)
     try{
       const response = await axios.put(
         `https://recipeapp-backend-agi6.onrender.com/recipe/putrecipe/${id}`,{
          recipename:name,
          recipecategory:category,
          recipetype:type,
          recipeorigin:origin,
          recipespice:spice,
          recipecookingtime:cookingtime,
          recipeingredients:ingredients,
          recipedescription: description,
          recipeimageurl:imageurlbackend,
          recipeprocedure:procedure
         },{
          headers:{
            authorization:`Bearer ${token}`
          }
         }
       );
       if(response){
         toast.success("recipe updated successfully")
         setLoading(false);
         setCategory("");
         setCookingtime("");
         setDescription("");
         setIngredients("");
         setName("");
         setOrigin("");
         setProcedure("");
         setSpice("");
         setType("");
         setUrl("../public/blank.png");
         setTimeout(()=>{
              navigate("/home");
         },1000)
         
         
       }

     }catch(e){
      setLoading(false)
      console.log(e)
      toast.error(e.message);
    
     }
    };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 my-10">
          <div>
            <div className="flex justify-center mt-20">
              <form
                className="grid grid-cols-2 justify-center p-5 gap-x-3 gap-y-6 w-2/4 shadow-gray-600 shadow-lg rounded-lg"
                onSubmit={handleupdate}
              >
                <div className="col-span-2 text-center font-extrabold text-2xl text-yellow-400">
                  <p>Update your Recipe</p>
                </div>
                <div>
                  <label>Recipe Name</label>
                  <input
                    value={name}
                    type="text"
                    placeholder="Recipe name.."
                    className="border border-green-500 text-center rounded p-2 w-full"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div>
                  <label>Category</label>
                  <br />
                  <select
                    value={category}
                    className="p-2 border border-green-500 w-full hover:cursor-pointer"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    <option value={""} disabled>
                      select category
                    </option>
                    <option value={"vegeterian"}>vegeterian</option>
                    <option value={"non-vegeterian"}>non-vegeterian</option>
                  </select>
                </div>
                <div>
                  <label>Cooking Time</label>
                  <br />
                  <select
                    value={cookingtime}
                    className="p-2 border border-green-500 w-full hover:cursor-pointer"
                    onChange={(e) => {
                      setCookingtime(e.target.value);
                    }}
                  >
                    <option value={""} disabled>
                      select cooking time
                    </option>
                    <option value={"10 mins"}>10 mins</option>
                    <option value={"15 mins"}>15 mins</option>
                    <option value={"30 mins"}>30 mins</option>
                    <option value={"45 mins"}>45 mins</option>
                    <option value={"1 hour"}>1 hour</option>
                    <option value={"1-2 hours"}>1-2 hours</option>
                    <option value={"more than 2 hours"}>
                      more than 2 hours
                    </option>
                  </select>
                </div>
                <div>
                  <label>Recipe Type</label>
                  <br />
                  <select
                    value={type}
                    className="p-2 border border-green-500 w-full hover:cursor-pointer"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <option value={""} disabled>
                      select recipe type
                    </option>
                    <option value={"Breakfast"}>Breakfast</option>
                    <option value={"Lunch"}>Lunch</option>
                    <option value={"Snacks"}>Snacks</option>
                    <option value={"Dinner"}>Dinner</option>
                  </select>
                </div>
                <div>
                  <label>Recipe Origin</label>
                  <br />
                  <select
                    value={origin}
                    className="p-2 border border-green-500 w-full hover:cursor-pointer"
                    onChange={(e) => {
                      setOrigin(e.target.value);
                    }}
                  >
                    <option value={""} disabled>
                      select origin
                    </option>
                    <option value={"Indian"}>Indian</option>
                    <option value={"Western"}>Western</option>
                    <option value={"Asian"}>Asian</option>
                    <option value={"African"}>African</option>
                  </select>
                </div>
                <div>
                  <label>Recipe Spice</label>
                  <br />
                  <select
                    value={spice}
                    className="p-2 border border-green-500 w-full hover:cursor-pointer"
                    onChange={(e) => {
                      setSpice(e.target.value);
                    }}
                  >
                    <option value={""} disabled>
                      select spice level
                    </option>
                    <option value={"Low"}>Low</option>
                    <option value={"Medium"}>Medium</option>
                    <option value={"High"}>High</option>
                    <option value={"Extreme"}>Extreme</option>
                  </select>
                </div>
                <div>
                  <label>Recipe Ingredients</label>
                  <textarea
                    value={ingredients}
                    className="border border-green-600 text-start rounded p-2 w-full h-45 resize-none"
                    required
                    onChange={(e) => {
                      setIngredients(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div>
                  <label>Recipe Description</label>
                  <textarea
                    value={description}
                    className="border border-green-600 text-start rounded p-2 w-full h-45 resize-none"
                    required
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div>
                  <label>Recipe Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleimageupload}
                    required
                    className="border border-green-600 text-start rounded p-2 w-full bg-gray-400"
                  />
                  <img
                    src={`${url}`}
                    alt="image"
                    className="w-2/3 h-35"
                    required
                  />
                </div>
                <div>
                  <label>Recipe Procedure</label>
                  <textarea
                    value={procedure}
                    className="border border-green-600 text-start rounded p-2 w-full h-45 resize-none"
                    required
                    onChange={(e) => {
                      setProcedure(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <button className="bg-yellow-600 w-full p-2 text-white rounded-lg hover:cursor-pointer hover:bg-yellow-500">
                    {loading ? "updating recipe..." : "update recipe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default Updatearticle;
