import React from 'react';
import "./Login.scss";

export default function Login() {

    return(
        <div className="login-wrapper">
        <form id = "exist">
        <h2>Log In</h2>
          <label for="name"> Username </label>
            <input type="text" id = "name" />

          <label for="pass"> Password </label>
            <input type="text" id = "pass" />
          <div>
            <button type="submit" id = "submit-login">Submit</button>
          </div>
        </form>

        <form id = "register">

            <h2> Register </h2>
          <label for="name"> Username </label>
            <input type="text" id = "name" />

          <label for="pass"> Password </label>
            <input type="text" id = "pass" />
          <div>
            <button type="submit" id = "submit-register">Submit</button>
          </div>
        </form>
      </div>
    );
}