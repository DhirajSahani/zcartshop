import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SellerLogin = () => {
  const { isSeller, setIsSeller, axios, navigate } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // ✅ moved to top

    try {
      const { data } = await axios.post('/api/seller/login', { email, password });

      if (data.success) {
        setIsSeller(true);
        toast.success("Login successful");
        navigate('/seller');
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  // Render form only if not logged in
  if (isSeller) return null;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center text-sm text-gray-600"
    >
      <div className="flex flex-col gap-5 p-8 py-12 min-w-80 sm:min-w-80 rounded-lg shadow-xl border border-gray-200 w-full max-w-sm">
        <p className="text-2xl font-medium m-auto">
          Seller<span className="text-primary">Login</span>
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Enter your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>
        <button type="submit" className="bg-primary text-white w-full py-2 rounded-md cursor-pointer">
          Login
        </button>
      </div>
    </form>
  );
};

export default SellerLogin;
