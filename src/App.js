import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import Input from "./components/Input";

import "./App.css";

function App() {
  const { success, setSuccess } = useState("");
 
  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      github: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required("Email is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      username: Yup.string()
        .required("Username is required")
        .min(4, "Username must be at least 4 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      birthDate: Yup.date()
        .required("Birthdate is required")
        .max(
          new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
          "You must be at least 18 years old"
        ),
      github: Yup.string().url().required("Github link is required"),
    }),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: (values) => {
      console.log(values);
      setSuccess("Form submitted successfully!");
      formik.resetForm();
    }
  });

  return (
    <>
      <h1>Validation</h1>
      <form className="form-group" onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          handleChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          handleChange={formik.handleChange}
          error={formik.errors.firstName}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          handleChange={formik.handleChange}
          error={formik.errors.lastName}
        />
        <Input
          type="text"
          name="username"
          placeholder="Username"
          handleChange={formik.handleChange}
          error={formik.errors.username}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          handleChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          handleChange={formik.handleChange}
          error={formik.errors.confirmPassword}
        />
        <Input
          type="date"
          name="birthDate"
          placeholder="Birthdate"
          handleChange={formik.handleChange}
          error={formik.errors.birthDate}
        />
        <Input
          type="url"
          name="github"
          placeholder="Github Link"
          handleChange={formik.handleChange}
          error={formik.errors.github}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>{success}</h3>
    </>
  );
}

export default App;
