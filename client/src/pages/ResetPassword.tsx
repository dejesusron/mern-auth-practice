import { useState } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordData = { password };

    console.log(passwordData);
  };

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
                  type='email'
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
