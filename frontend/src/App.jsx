import Login from "./login/login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routes } from "react-router-dom";
import Register from "./register/Register";


function App() {
  

  return (
    <>
      <div className="p-2 w-screen h-screen flex items-center justify-center ">
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <ToastContainer/>
      </div>
    </>
  )
}

export default App
