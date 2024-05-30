import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';


const ProfileForm = () => {
  const passRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const newPass = passRef.current.value;
    const idToken = authCtx.token;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBmFQ6auuxLz_r89VDTS1vfvmwLFi2modU', {
      method: 'POST',
      body: JSON.stringify({
        idToken: idToken,
        password: newPass,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert('Password changed Successfully');
      })
      .catch(err => console.log(err));

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
