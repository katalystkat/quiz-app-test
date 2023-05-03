import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/kiwibird.png";
import styles from "../styles/home.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerUser } from "../helper/apiCalls";
type Props = {};

export default function Register({}: Props) {
  const [isRegistered, setRegistered] = useState(false);
  const handleClick = (event: any) => {
    event.preventDefault();
    formik.handleSubmit();
  };
  // update formik helper functions to be combined into one validation function
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    // validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await registerUser(values);
        if (response.data) {
          const userId = response.data;
          localStorage.setItem("userId", userId);
          setRegistered(true);
          return toast.success("Successfully registered new user!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex justify-center h-screen items-center">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h2 className="text-5xl font-bold">Register to Play!</h2>
            <span className="text-xl text-center w-2/3 px-10">
              One of us! One of us! One of us!
            </span>
          </div>
          <form
            className="py-1"
            onSubmit={(e) => {
              handleClick(e);
            }}
          >
            <div className="logo flex justify-center py-4">
              <img
                src={logo}
                className={styles.logo_img}
                alt="logo of a plant"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                {" "}
                <Link className="text-xl text-green-800" to="/login">
                  {isRegistered ? "Back to Login" : "Login Instead"}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
