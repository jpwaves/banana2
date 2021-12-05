import React, { useState, useEffect, useRef } from "react";
import "./Login.scss";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router";


export default function Login({ userID, onChange }) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");


  const [loginPassword, setLoginPassword] = useState("");
  const [loginUsername, setLoginName] = useState("");

  const [loginStatus, setLoginStatus] = useState("none");


  // check if login status was update correctly (firstUpdate to prevent useEffect from execing on page load)
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (loginStatus) {
      handleLogin();
    }
    console.log(loginStatus);
  }, [loginStatus]);

  const addUser = () => {
    Axios.post("http://localhost:3001/createUser", {
      username: username,
      password: password,
    }).then(() => {
      console.log("success");
    });
  };

  const loginUsernameField = useRef(null);
  const loginPasswordField = useRef(null);
  const clearLoginTxtFields = () => {
    loginUsernameField.current.value = "";
    loginPasswordField.current.value = "";
  };

  const registerUsernameField = useRef(null);
  const registerPasswordField = useRef(null);
  const clearRegisterTxtFields = () => {
    registerUsernameField.current.value = "";
    registerPasswordField.current.value = "";
  };

  let navigate = useNavigate();

  function handleLogin() {
    initUserID();
    navigate("/dashboard");
  }

  const initUserID = () => {
    Axios.post("http://localhost:3001/getUserID", {
      username: loginUsername,
    })
      .then((res) => {
        onChange(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const login = () => {
    Axios.post("http://localhost:3001/checkCreds", {
      username: loginUsername,
      password: loginPassword,
    })
      .then((res) => {
        setLoginStatus(res.data.result);
        clearLoginTxtFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="login-wrapper">
      <form id="exist">
        <h2>Log In</h2>
        <label for="name"> Username </label>
        <input
          ref={loginUsernameField}
          type="text"
          id="name"
          onChange={(event) => {
            setLoginName(event.target.value);
          }}
        />

        <label for="pass"> Password </label>
        <input
          ref={loginPasswordField}
          type="text"
          id="pass"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <div>
          <button
            onClick={() => {
              login();
            }}
            type="button"
            id="submit-login"
          >
            Log In
          </button>
        </div>
      </form>

      <form id="register">
        <h2> Register </h2>
        <label for="name"> Username </label>
        <input
          ref={registerUsernameField}
          type="text"
          id="name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label for="pass"> Password </label>
        <input
          ref={registerPasswordField}
          type="text"
          id="pass"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          <button
            onClick={() => {
              addUser();
              clearRegisterTxtFields();
            }}
            type="button"
            id="submit-register"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
