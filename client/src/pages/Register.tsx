import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, register } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SigninGoogle from '../components/SigninGoogle';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (isError) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${message}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }

    if (isSuccess && user) {
      navigate('/profile');
    } else {
      navigate('/register');
      dispatch(reset());
    }
  }, [isError, message, dispatch, user, isSuccess, navigate]);

  const handChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `Password do not match`,
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='grid place-items-center min-h-screen'>
        <div className='card bg-base-100 max-w-96 shadow-2xl'>
          <div className='card-body flex flex-col gap-y-3'>
            <h2 className='card-title'>Sign up</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <form className='flex gap-y-3 flex-col' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  placeholder='Name'
                  className='input input-bordered w-full max-w-xs'
                  onChange={handChange}
                  name='name'
                  value={name}
                />
              </div>
              <div>
                <input
                  type='email'
                  placeholder='Email'
                  className='input input-bordered w-full max-w-xs'
                  onChange={handChange}
                  name='email'
                  value={email}
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Password'
                  className='input input-bordered w-full max-w-xs'
                  onChange={handChange}
                  name='password'
                  value={password}
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Confirm password'
                  className='input input-bordered w-full max-w-xs'
                  onChange={handChange}
                  name='password2'
                  value={password2}
                />
              </div>
              <div>
                <button className='btn btn-neutral w-full' type='submit'>
                  Sign up
                </button>
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

export default Register;
