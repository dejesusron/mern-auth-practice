import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, reset } from '../features/auth/authSlice';
import { AppDispatch, RootState } from '../app/store';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (location.pathname === '/forgot-password') {
      dispatch(reset());
    }

    if (isError) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch(reset());
    }

    if (isSuccess) {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/login');
    }
  }, [message, isSuccess, isError, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailData = { email };

    dispatch(forgotPassword(emailData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='grid place-items-center min-h-screen'>
        <div className='card bg-base-100 max-w-96 shadow-2xl'>
          <div className='card-body flex flex-col gap-y-3'>
            <h2 className='card-title'>Forgot password</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <form onSubmit={handleSubmit} className='flex gap-y-3 flex-col'>
              <div>
                <input
                  type='email'
                  placeholder='Email'
                  className='input input-bordered w-full max-w-xs'
                  name='email'
                  value={email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button className='btn btn-neutral w-full' type='submit'>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
