import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Contribute from './components/Contribute'
import Profile from './components/Profile'
import Error from './components/Error'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Fullarticle from './components/Fullarticle'
import Protectedroute from './components/Protectedroute'
import Updatearticle from './components/Updatearticle'

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<Protectedroute/>}>
            <Route path="/home" element={<Home />} />
            <Route path="/updatearticle/:id" element={<Updatearticle />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/full-article/:id" element={<Fullarticle />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
