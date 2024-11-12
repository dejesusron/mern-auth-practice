import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div
        className='hero min-h-screen'
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1510987836583-e3fb9586c7b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        }}>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-neutral-content text-center'>
          <div className='max-w-md'>
            <h1 className='mb-5 text-5xl font-bold'>Hello there</h1>
            <p className='mb-5'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className='flex gap-x-3 justify-center'>
              <Link to='/login' className='btn btn-primary'>
                Sign in
              </Link>
              <Link to='/register' className='btn btn-primary'>
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
