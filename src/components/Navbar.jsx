import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios
  } = useAppContext();

  const Logout = async () => {
    try {
      const { data } = await axios.get('api/user/logout')
      if (data.message) {
        toast.success(data.message)
        setUser(null);
        navigate('/');
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)

    }

  };

  useEffect(() => {
    if (searchQuery?.length > 0) {
      navigate('/products');
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50">

      {/* Logo */}
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img className="w-20 h-20" src={assets.zlogo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <NavLink to='/' className={({ isActive }) => isActive ? "font-medium text-primary" : ""}>Home</NavLink>
        <NavLink to='/products' className={({ isActive }) => isActive ? "font-medium text-primary" : ""}>All Products</NavLink>
        <NavLink to='/' className={({ isActive }) => isActive ? "font-medium text-primary" : ""}>Contact</NavLink>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt='search' className='w-4 h-4' />
        </div>

        {/* Cart */}
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* User Auth */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary/90 transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className='w-10 cursor-pointer' alt="profile" />
            <ul className='hidden group-hover:block absolute top-12 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-40'>
              <li onClick={() => navigate("/my-orders")} className='p-2 px-4 hover:bg-primary/10 cursor-pointer'>My Orders</li>
              <li onClick={Logout} className='p-2 px-4 hover:bg-primary/10 cursor-pointer'>Logout</li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className='flex items-center gap-6 sm:hidden'>
        <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
          <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80' />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
          <img src={assets.menu_icon} alt='menu' />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden">
          <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>
          {user && <NavLink to="/my-orders" onClick={() => setOpen(false)}>My Orders</NavLink>}
          <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={Logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary/90 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
