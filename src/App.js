import "./App.css";
import Dashboard from "../src/components/dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import AdminDashboard from "./components/adminDash/AdminDashboard";
import React, { useState } from "react";
import CreatePage from "./components/createPage/CreatePage";
import MyPages from "./components/myPages/MyPages";
import MemePage from "./components/memePage/MemePage";

function App() {
  const [userId, setUserId] = useState(0);
  return (
    <div className="wrapper">
      <h1>Banana</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login userID={userId} onChange={(value) => setUserId(value)} />
            }
          />
          <Route path="/dashboard" element={<Dashboard userID={userId} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/createPage" element={<CreatePage userID={userId} />} />
          <Route path="/myPages" element={<MyPages userID={userId} />} />
          <Route path="/myPages/memePage" element={<MemePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
