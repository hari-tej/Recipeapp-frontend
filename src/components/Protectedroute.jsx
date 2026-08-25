import { Outlet, Navigate } from "react-router-dom"

const Protectedroute = () => {
    const token=localStorage.getItem("token");
    return token ? <Outlet/> : <Navigate to="/" replace/>
  
}

export default Protectedroute