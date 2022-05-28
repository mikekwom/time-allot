import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";

function Login(props) {
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = (values) => {
    console.log("on submit");
    axios
      .post("http://localhost:4000/login", values)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("name", res.data.name);
        props.logFunction();
        navigate("/today");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  /******************** VALIDATION ********************/
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Email Required";
    }
    if (!values.password) {
      errors.password = "Password Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be longer than 8 characters";
    }
    return errors;
  };
  /******************** END VALIDATION ********************/

  // formik connects to the objects and can validate for us
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="login-page">
      <div className="new-header">
        <h1 className="logo new-logo">TimeAllot</h1>
      </div>
      <div className="form">
        <h2>Login Page</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              className="form-control"
              type="text"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
            />
          </div>
          {/* button is disabled until formik is valid */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!formik.isValid}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="login-register--link">
        <Link to="/register">Create an Account</Link>
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Login;
