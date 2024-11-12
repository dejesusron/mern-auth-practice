import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (location.pathname === '/login') {
      setLogin(true);
      setRegister(false);
    } else if (location.pathname === '/register') {
      setLogin(false);
      setRegister(true);
    } else if (location.pathname === '/profile') {
      setLogin(true);
      setRegister(true);
    }
  }, [location]);

  const onLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logout!',
          text: 'Your account has been logged out.',
          icon: 'success',
        });

        dispatch(logout());
        dispatch(reset());
        navigate('/login');
      }
    });
  };

  return (
    <header className='navbar fixed top-0 left-0 bg-base-200'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost text-xl'>
          daisyUI
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1 flex  gap-x-3'>
          <li className={`${login ? 'hidden' : 'block'}`}>
            <Link to='/login' className='btn btn-neutral'>
              Sign in
            </Link>
          </li>
          <li className={`${register ? 'hidden' : 'block'}`}>
            <Link to='/register' className='btn btn-neutral'>
              Sign up
            </Link>
          </li>
          {user && (
            <li>
              <button onClick={onLogout} className='btn btn-error'>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
