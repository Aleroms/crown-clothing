import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
const SignInForm = () => {
  //hook
  const [formFields, setFormFields] = useState(defaultFormFields);
  //destructoring formFields 4 easy use
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const responce = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(responce);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("user note found");
      } else if (
        error.code === "auth/wrong-password" ||
        "auth/user-not-found"
      ) {
        alert("password or email is incorrect");
      } else {
        console.log("error i signing in");
      }
    }
    console.log("successful log in");
  };

  //component code
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleLogIn}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">sign in</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
