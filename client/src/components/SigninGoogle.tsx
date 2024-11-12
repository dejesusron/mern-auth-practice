import { GoogleLoginButton } from 'react-social-login-buttons';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../configs/firebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { loginGoogle } from '../features/auth/authSlice';

const SigninGoogle = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const { user } = result;
      const { displayName, email } = user;
      const userData = { name: displayName, email: email, password: '1234' };

      dispatch(loginGoogle(userData));
    } catch (err) {
      console.log('Could not login with google', err);
    }
  };

  return <GoogleLoginButton onClick={handleSignin} />;
};

export default SigninGoogle;
