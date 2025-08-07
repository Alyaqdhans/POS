import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Products from "./components/Products";
import Users from "./components/Users";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const {user} = useSelector((state) => state.users);

  return (
    <main>
      {user && <Header />}
      <ToastContainer theme="colored" position="bottom-center" pauseOnFocusLoss={false} draggable />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/settings/*" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {user && <Footer />} */}
    </main>
  )
}

export default App
