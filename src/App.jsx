import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import "./App.css";
import Register from "./components/Auth/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Users from "./components/users/Users";
import Profile from "./components/Profile/Profile";
import Comments from "./components/comments/Comments";
function App() {
  return (
    <Router>
      <ChakraProvider>
        <Routes>
          <Route path="/protected" element={<Layout />}>
            <Route path="/protected/dashboard" element={<Dashboard />} />
            <Route path="/protected/users" element={<Users />} />
            <Route path="/protected/profile/:id" element={<Profile />} />
            <Route path="/protected/comments/:id" element={<Comments />} />
          </Route>
          <Route path="/" element={<Layout />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </ChakraProvider>
    </Router>
  );
}

export default App;
