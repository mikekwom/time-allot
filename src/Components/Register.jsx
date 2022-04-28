import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";

function Register() {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    axios
      .post("http://localhost:4000/register", values)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("email", res.data[0][0].email);
        localStorage.setItem("id", res.data[0][0].id);
        localStorage.setItem("name", res.data[0][0].name);
      })
      .catch((err) => console.log(err.response.data));
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
    if (!values.name) {
      errors.name = "Name Required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please Confirm Password";
    }
    // compare values of password and confrimPassword
    else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords Must Match";
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
    <div>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3 mt-3">
          <label for="name" className="form-label">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="John Doe"
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="email" className="form-label">
            Email:
          </label>
          <input
            className="form-control"
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="john56@gmail.com"
          />
        </div>
        <div className="mb-3 mt-3">
          <label for="password" className="form-label">
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
        <div className="mb-3 mt-3">
          <label for="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            placeholder="Password"
          />
        </div>
        {/* button is diabled until formik is valid */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!formik.isValid}
        >
          Submit
        </button>
      </form>
      <div>
        {/* if errors exists, return error that display error, else do not display */}
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        {formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
      </div>
      <Link to="/login">Login</Link>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Register;
