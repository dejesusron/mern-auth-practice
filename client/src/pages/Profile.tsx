import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { userDetails, reset, deleteUser } from '../features/auth/authSlice';
import Loading from '../components/Loading';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user, details, message, isError, isLoading } = useSelector(
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
      navigate('/login');
    }

    if (!user) {
      navigate('/login');
    } else {
      dispatch(userDetails(user._id));
    }
  }, [user, message, isError, navigate, dispatch]);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        if (user) {
          Swal.fire({
            title: 'Account deleted!',
            text: 'Your account has been deleted.',
            icon: 'success',
          });

          dispatch(deleteUser(user._id));
          dispatch(reset());
          localStorage.removeItem('user');
          navigate('/login');
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='grid place-items-center min-h-screen'>
      <div className='card bg-base-100 w-96 shadow-xl'>
        <figure>
          <img
            src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp'
            alt='Shoes'
          />
        </figure>
        <div className='card-body'>
          <h2 className='card-title font-normal'>
            <span className='text-lg font-bold'>Name: </span>
            {details?.name}
          </h2>
          <p>
            <span className='text-lg font-bold'>Email: </span>
            {details?.email}
          </p>
          <p>
            <span className='text-lg font-bold'>Created: </span>
            {new Date(details?.createdAt ?? new Date()).toLocaleDateString(
              'en-US'
            )}
          </p>
          <br />
          <button onClick={handleDelete} className='btn btn-error'>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
