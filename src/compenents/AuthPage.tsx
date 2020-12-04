import React, { Component } from "react";
// import "./../../public/utils/form.css";
import { signup, signin, signInWithGoogle } from "../helpers/auth";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { db } from "../services/firebase";

class AuthPage extends Component {
  state = {
    username: "",
    password: "",
    errors: "",
    email: ""
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  toggleForm = (e) => {
    e.preventDefault();
    const container = document.querySelector(".container");
    container.classList.toggle("active");
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    // this.validateForm();
    let { username, password } = this.state;
    this.setState({ error: "" });
    console.log(username, password);
    try {
      await signin(username, password);
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
    }
  };
  Login = async (username, password) => {
    this.setState({ error: "" });
    console.log(username, password);
    try {
      await signin(username, password);
    } catch (error) {
      console.log(error.message);
      this.setState({ error: error.message });
    }
    // hamza@gmail.com
    // 1973Azer
  };
  validateForm() {
    let { errors } = this.state;
    let fields = ["email", "username", "password"];
    //required
    fields.map((field) => {
      if (this.state[field] === "") {
        errors.push({ name: field, type: "required" });
      }
      return null;
    });

    // //email
    // const expression = /\S+@\S+/;
    // let validEmail = expression.test(String(this.state.email).toLowerCase());

    // if (!validEmail) {
    //   errors.push("email");
    // }

    // this.setState({
    //   errors: errors
    // });

    if (errors.length > 0) {
      return false;
    } else {
      alert("everything good. submited form!");
    }
  }
  render() {
    const {error} = this.state;
    return (
      <section>
        <div className="container">
          <LoginForm
            toggleForm={this.toggleForm}
            error={error}
            handleSubmit={this.Login}
          />
          <RegisterForm
            toggleForm={this.toggleForm}
            error={error}
            handleSubmit={this.Register}
          />
        </div>
      </section>
    );
  }
}

export default AuthPage;

// test@gm.com
// 123456
