import { Route, Routes } from "react-router-dom"
import { Toaster } from 'react-hot-toast';

import Signup from "./pages/Signup";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { PrivateRoute, OpenRoute } from "./components";

function App() {

  return (
    <div className="w-screen flex flex-col bg-background-primary text-text-primary">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>}
        />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>}
        />

        <Route path="/dashboard" element={
          <PrivateRoute> 
            <Dashboard /> 
          </PrivateRoute>} 
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
