import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, login } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import SigninGoogle from '../components/SigninGoogle';
import Loading from '../components/Loading';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
      });

      setFormData({ email: '', password: '' });
      navigate('/login');
    }

    if (isSuccess && user) {
      navigate('/profile');
    } else {
      navigate('/login');
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };
    dispatch(login(userData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='grid place-items-center min-h-screen'>
        <div className='card bg-base-100 max-w-96 shadow-2xl'>
          <div className='card-body flex flex-col gap-y-3'>
            <h2 className='card-title'>Sign in</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <form className='flex gap-y-3 flex-col' onSubmit={handleSubmit}>
              <div>
                <input
                  type='email'
                  placeholder='Email'
                  className='input input-bordered w-full max-w-xs'
                  name='email'
                  value={email}
                  onChange={handChange}
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Password'
                  className='input input-bordered w-full max-w-xs'
                  name='password'
                  value={password}
                  onChange={handChange}
                />
              </div>
              <div>
                <button className='btn btn-neutral w-full' type='submit'>
                  Sign in
                </button>
                <Link to='/forgot-password' className='block mt-2 underline'>
                  Forgot password?
                </Link>
              </div>
              <div>
                <div className='divider'>OR</div>
                <SigninGoogle />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
