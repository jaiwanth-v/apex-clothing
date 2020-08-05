import React, { Component } from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import Loader from "react-loader-spinner";

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    isValid: true,
    isLoading: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true, isValid: true });

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      this.setState({ isValid: false, isLoading: false });
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="Password"
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
            <div className="buttons">
              <CustomButton type="submit">SIGN IN</CustomButton>
              <CustomButton
                type="button"
                onClick={signInWithGoogle}
                isGoogleSignin
              >
                SIGN IN WITH GOOGLE
              </CustomButton>
            </div>
          )}
          {!this.state.isValid && (
            <h6>
              <br /> Please enter valid credentials
            </h6>
          )}
          <br />
        </form>
      </div>
    );
  }
}
