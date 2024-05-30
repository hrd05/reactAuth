import { useState, useRef, useContext } from 'react';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    setLoading(true);
    // console.log(enteredEmail, enteredPass);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBmFQ6auuxLz_r89VDTS1vfvmwLFi2modU'

    }
    else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBmFQ6auuxLz_r89VDTS1vfvmwLFi2modU';
    }
    fetch(url,
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
    ).then((res) => {
      setLoading(false);
      if (res.ok) {
        return res.json();
      }
      else {
        return res.json().then((data) => {
          throw new Error(data.error.message);
        })
      }
    })
      .then((data) => {
        // console.log(data.idToken);
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err);
      })
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
          {!loading && <button onClick={submitHandler} >
            {isLogin && !loading ? 'Login' : 'Create Account'}
          </button>}
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
