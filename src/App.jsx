import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Home from "./components/Home";
import Products from "./components/Products";
import Users from "./components/Users";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Footer from "./components/Footer";

function App() {
  const {user} = useSelector((state) => state.users);

  return (
    <main>
      {user ? <Header /> : <></>}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
      </Routes>
      {user ? <Footer /> : <></>}
    </main>
  )
}

export default App
