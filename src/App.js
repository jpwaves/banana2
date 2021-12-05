import "./App.css";
import Dashboard from "../src/components/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import CreatePage from "./components/createPage/CreatePage";

function App() {
  return (
    <div className="wrapper">
      <h1>Banana</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createPage" element={<CreatePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
