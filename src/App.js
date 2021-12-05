import './App.css';
import Dashboard from "../src/components/dashboard/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import React, { useState } from 'react';


function App() {
  const [userId, setUserId] = useState(0);

  return (
    <div className="wrapper">
      <h1>Banana</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login userID={userId} onChange={value => setUserId(value)} />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard userID={userId} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
