import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { reset, resetPassword } from '../features/auth/authSlice';
import Loading from '../components/Loading';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { id, token } = useParams();

  const { isError, isLoading, isSuccess, message } = useSelector(
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

      dispatch(reset());
      navigate('/login');
    }
  }, [isError, isSuccess, dispatch, message, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { id, token, password };

    dispatch(resetPassword(userData));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-4'>
      <div className='grid place-items-center min-h-screen'>
        <div className='card bg-base-100 max-w-96 shadow-2xl'>
          <div className='card-body flex flex-col gap-y-3'>
            <h2 className='card-title'>Reset password</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <form onSubmit={handleSubmit} className='flex gap-y-3 flex-col'>
              <div>
                <input
                  type='text'
                  placeholder='New password'
                  className='input input-bordered w-full max-w-xs'
                  name='email'
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <button className='btn btn-neutral w-full' type='submit'>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
