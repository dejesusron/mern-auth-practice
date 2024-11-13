import { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='grid place-items-center min-h-screen'>
        <div className='card bg-base-100 max-w-96 shadow-2xl'>
          <div className='card-body flex flex-col gap-y-3'>
            <h2 className='card-title'>Forgot password</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <form className='flex gap-y-3 flex-col'>
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
