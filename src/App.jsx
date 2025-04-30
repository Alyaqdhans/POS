import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import "./App.css";

function App() {

  const {user} = useSelector((state) => state.users);

  return (
    <>
      {(user !== null) ? <Header /> : <></>}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
