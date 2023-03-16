import React from "react";

export default function SignUp({submit, emailError, passConfError, passwordError, swap}) {
  return (
    <div className="login-form">
      <form onSubmit={submit}>
        <h1>Sign Up</h1>
        <div className="field">
          <label>Email</label>
          <input required placeholder="Email" name="email" />
          <p>{emailError}</p>
        </div>
        <div className="field">
          <label>Password</label>
          <input required type='password' placeholder="Password" name="password" />
          <p>{passwordError}</p>
        </div>
        <div className="field">
          <label>Password Confirmation</label>
          <input required type='password' placeholder="Password Confirmation" name="passwordConfirmation" />
          <p>{passConfError}</p>
        </div>
        <div className="form-options">
          <p>Already have an account? <label onClick={swap}>Log In</label></p>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  )
}