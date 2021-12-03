import React, { useState } from 'react';
import "./Login.scss";
import Axios from 'axios';
import { checkCredentials } from '../../middleware';

export default function Login() {

    const [username, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loginPassword, setLoginPassword] = useState("");
    const [loginUsername, setLoginName] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    const addUser = () => {
        Axios.post('http://localhost:3001/create', {
                username: username,
                password: password,
            }).then(() => {
                console.log("success");
        });
    };

    const login = () => {
        setLoginStatus(checkCredentials(loginUsername, loginPassword));
        console.log(loginStatus);
    }

    return(
        <div className="login-wrapper">
        <form id = "exist">
        <h2>Log In</h2>
          <label for="name"> Username </label>
            <input type="text" id = "name"
            onChange={
                (event) => {setLoginName(event.target.value)}
            } />

          <label for="pass"> Password </label>
            <input type="text" id = "pass"
            onChange={
                (event) => {setLoginPassword(event.target.value)}
            } />
          <div>
            <button onClick={() => {login()}} type="submit" id = "submit-login">Log In</button>
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