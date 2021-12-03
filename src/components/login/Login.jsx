import React, { useState } from 'react';
import "./Login.scss";
import Axios from 'axios';

export default function Login() {

    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    const addUser = () => {
        Axios.post('http://localhost:3001/create', {
                username: username,
                password: password,
            }).then(() => {
                console.log("success");
        });
    };

    const display = () => {
        console.log(username + password);
    }

    return(
        <div className="login-wrapper">
        <form id = "exist">
        <h2>Log In</h2>
          <label for="name"> Username </label>
            <input type="text" id = "name" />

          <label for="pass"> Password </label>
            <input type="text" id = "pass" />
          <div>
            <button type="submit" id = "submit-login">Log In</button>
          </div>
        </form>

        <form id = "register">

            <h2> Register </h2>
          <label for="name"> Username </label>
            <input type="text" id = "name" 
            onChange={
                (event) => {setName(event.target.value)}
            } />

          <label for="pass"> Password </label>
            <input type="text" id = "pass" 
            onChange={
                (event) => {setPassword(event.target.value)}
            }/>
          <div>
            <button onClick={() => {addUser()}} type="submit" id = "submit-register"
            >Register</button>
          </div>
        </form>
      </div>
    );
}