import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        navigate("/secret");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  /******************** VALIDATION ********************/
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Email Required";
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
    <div>
      <h2>Login Page</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />
        {/* button is disabled until formik is valid */}
        <button type="submit" disabled={!formik.isValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
