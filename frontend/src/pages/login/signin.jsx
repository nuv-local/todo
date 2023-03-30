import React from "react";

function SignIn({submit, emailError, passwordError, swap}) {
  return (
    <div className="login-form">
      <form method="POST" action='/signin' onSubmit={submit}>
        <h1>Sign In</h1>
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
        <div className="form-options">
          <p><label onClick={swap}>Create an account</label></p>
          <button>Sign In</button>
        </div>
      </form>
    </div>
  )
}
export default SignIn