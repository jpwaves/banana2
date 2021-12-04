import './App.css';
import Dashboard from "../src/components/dashboard/Dashboard";
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';


function App() {
  
  return (
    <div className="wrapper">
        <h1>Banana</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
