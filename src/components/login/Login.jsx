import React, { useState, useEffect, useRef } from "react";
import "./Login.scss";
import Axios from "axios";
import { useNavigate } from "react-router";

export default function Login({ userID, onChange }) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [loginUsername, setLoginName] = useState("");

  const [loginStatus, setLoginStatus] = useState("none");

  const [localID, setLocalID] = useState(0);
  const [userRole, setRole] = useState("");

  // check if login status was update correctly (firstUpdate to prevent useEffect from execing on page load)
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (loginStatus) {
      initUserID();
    }
  }, [loginStatus]);

  const firstUpdate2 = useRef(true);
  useEffect(() => {
    if (firstUpdate2.current) {
      firstUpdate2.current = false;
      return;
    }
    initUserRole();
    updateLoyaltyCounter();
  }, [userID]);

  useEffect(() => {
    handleLogin();
  }, [userRole]);

  const addUser = () => {
    if (username.length > 20) {
      alert("Username must be less than or equal to 20 characters");
      return;
    }
    if (password.length > 40) {
      alert("Password must be less than or equal to 40 characters");
      return;
    }

    Axios.post("http://localhost:3001/createUser", {
      username: username,
      password: password,
    })
      .then(() => {
        alert("Succesfully registered");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            alert("Must enter in a username and password");
            break;
          case 500:
            alert("User already exists");
            break;
          default:
        }
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
    if (userRole === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  }

  function updateLoyaltyCounter() {
    Axios.post("http://localhost:3001/updateDaysRegistered", {
      userID,
    }).catch((err) => {
      console.log(err);
    });
  }

  const initUserRole = () => {
    Axios.post("http://localhost:3001/getRole", {
      userID: userID,
    })
      .then((res) => {
        setRole(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initUserID = () => {
    Axios.post("http://localhost:3001/getUserID", {
      username: loginUsername,
    })
      .then((res) => {
        onChange(res.data.result);
        setLocalID(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <form id="login">
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
