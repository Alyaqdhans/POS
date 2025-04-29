import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
      </Routes>
    </>
  )
}

export default App
