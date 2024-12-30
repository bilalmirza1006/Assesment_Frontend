import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import ProtectedRoute from "./components/ProtectedRoute";
// import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import { connectSocket } from "./socket/socket";
import { useSelector } from "react-redux";

function App() {
//     const { token, userType } = useSelector((state) => state.user?.isLoggedIn);

//   useEffect(() => {
//     // const token = localStorage.getItem("authToken");
//     if (token) {
//         connectSocket(token);
//     }
// }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/chat" element={<Chat />} /> */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-blog"
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <Chats />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
