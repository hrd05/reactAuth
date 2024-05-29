import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    setLoading(true);
    // console.log(enteredEmail, enteredPass);
    if (isLogin) {

    }
    else {
      try {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmFQ6auuxLz_r89VDTS1vfvmwLFi2modU',
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPass,
              returnSecureToken: true
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        const data = await response.json();
        setLoading(false);
        console.log(data);
        if (!response.ok) {
          throw new Error(data.error.message);
          // console.log(data.error.message);
        }
      }
      catch (err) {
        console.log(err, 'inside catch');
        alert(err);
      }

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form >
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler} >
            {isLogin && !loading ? 'Login' : 'Create Account'}
          </button>
          {loading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
