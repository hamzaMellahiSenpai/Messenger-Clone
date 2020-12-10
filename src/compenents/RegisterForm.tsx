import React, { Component, useState } from "react";
import propTypes from "prop-types";
import { useForm } from "react-hook-form";
import { signup } from "../helpers/auth";
// import "./form.module.css";

export const RegisterForm = (props) => {
  const [error, setError] = useState(0);
  const RegisterNewUser = async (newUser) => {
    setError('');
    // this.setState({ error: "" });
    // uid
    // email
    // password
    // displayName
    // phoneNumber
    // photoURL
    // emailVerified
    console.log(newUser);
    try {
      await signup(newUser);
    } catch (e) {
      console.log(e.message);
      setError(e.message)
    }
    // hamza@gmail.com
    // 1973Azer
  };
  let { toggleForm } = props;
  const { register, handleSubmit } = useForm();
  return (
    <div className="user signupBx">
      <div className="formBx">
        <form action="" onSubmit={handleSubmit(RegisterNewUser)}>
          <h2>Create an account</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            ref={register}
          />
          {/* // 123456789 | hamza | hamzas@gmail.com */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            ref={register}
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            ref={register}
          />
          <input
            type="number"
            name="phoneNumber"
            placeholder="number (eg : 066556456"
            ref={register}
          />
          {/* {error} */}
          {/* <input type="password" name="" placeholder="Confirm Password" /> */}
          <input type="submit" name="" value="Sign Up" />
          <p className="signup">
            Already have an account ?
            <a href="\#" onClick={toggleForm}>
              Sign in.
            </a>
          </p>
        </form>
      </div>
      {/* <div className="imgBx">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/chat-app-7919e.appspot.com/o/images%2Fundraw_date_night_bda8.png?alt=media&token=3475583c-ba48-40ef-99d1-ceb6786c5aab"
          alt=""
        />
      </div> */}
    </div>
  );
};

RegisterForm.props = {
  toggleForm: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired
};

export default RegisterForm;

// test@gm.com
// 123456
