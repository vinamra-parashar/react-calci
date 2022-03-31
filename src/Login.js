import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "./features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState("1");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem("user")]);
  const users = useSelector(({ auth }) => auth?.users);
  // console.log("users", users);
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = { email: email, password: password };
    if (page === "1") {
      let userExist = users?.find((f) => f?.email === email);
      if (!userExist) {
        setError("User Not Exist,Please Register");
        return false;
      } else if (userExist?.password !== password) {
        setError("Password Incorrect");
        return false;
      } else {
        sessionStorage.setItem("user", email);
        navigate("/");
      }
    } else {
      dispatch(registerAction(obj));
      sessionStorage.setItem("user", email);
      navigate("/");
    }
  };
  const handlePage = (page) => {
    setPage(page);
    setError("");
    setEmail("");
    setPassword("");
  };
  return (
    <>
      <div className="App">
        <div className="login-container">
          <h1>{page === "1" ? "Login" : "Register"}</h1>
          <h3 style={{ color: "red" }}>{error}</h3>
          <form onSubmit={(e) => handleSubmit(e)} className="login-form">
            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
          <div style={{ textAlign: "center" }}>
            {page === "1" ? (
              <button className="common-btn" onClick={(e) => handlePage("2")}>
                Click To Register
              </button>
            ) : (
              <button className="common-btn" onClick={(e) => handlePage("1")}>
                Click To Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
