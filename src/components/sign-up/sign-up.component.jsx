import React, { Component } from "react";
import "./sign-up.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import Loader from "react-loader-spinner";

export default class SignUp extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    message: "",
    isLoading: false,
  };

  handleSubmit = async (event) => {
    this.setState({ isLoading: true, message: "" });
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({
        message: "Passwords didn't match. Try again.",
        isLoading: false,
      });
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      this.setState({ message: error.message, isLoading: false });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I don't have an account </h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            value={displayName}
            handleChange={this.handleChange}
            name="displayName"
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            value={email}
            handleChange={this.handleChange}
            name="email"
            label="Email"
            required
          />
          <FormInput
            type="password"
            value={password}
            handleChange={this.handleChange}
            name="password"
            label="Password"
            required
          />
          <FormInput
            type="password"
            value={confirmPassword}
            handleChange={this.handleChange}
            name="confirmPassword"
            label="Confirm  Password"
            required
          />
          {this.state.isLoading ? (
            <div className="d-flex justify-content-between">
              <h5>Logging In</h5>
              <Loader
                className="ml-3"
                type="ThreeDots"
                color="rgb(93, 124, 219)"
                height={25}
                width={35}
              />
            </div>
          ) : (
            <CustomButton type="submit">SIGN UP</CustomButton>
          )}
          {this.state.message && (
            <p style={{ color: "rgb(255, 21, 21)" }}>
              <br /> {this.state.message}
            </p>
          )}
        </form>
      </div>
    );
  }
}
