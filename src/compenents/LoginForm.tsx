import React, { Component } from "react";
import propTypes from "prop-types";

export class LoginForm extends Component {
  state = {
    username: "",
    password: ""
  };
  submit = (event) => {
    event.preventDefault();
    let { handleSubmit } = this.props;
    let { username, password } = this.state;
    handleSubmit(username, password);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    let { error, toggleForm } = this.props;
    let { username, password } = this.state;
    return (
      <div className="user signinBx">
        {/* <div className="imgBx">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/chat-app-7919e.appspot.com/o/images%2Fundraw_mobile_messages_u848.png?alt=media&token=e38c3e77-0ee2-4bd8-8759-5ba3e81bdd47"
            alt=""
            style={{
position:"relative",
width:"100%",
height:"100%",
            }}
          />
        </div> */}
        <div className="formBx">
          <form action="" onSubmit={this.submit}>
            <h2>Sign In</h2>
            {error}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <input type="submit" name="" value="Login" />
            <p className="signup">
              Don't have an account ?
              <a href="\#" onClick={toggleForm}>
                Sign Up.
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.props = {
  toggleForm: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired
};
export default LoginForm;
