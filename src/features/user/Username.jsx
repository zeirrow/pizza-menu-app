import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, clearUser } from './userSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../cart/cartSlice';

const Username = () => {
  const username = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  if (!username) return null;

  const handleClearUsername = (e) => {
    e.preventDefault();
    dispatch(clearUser());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div
      className="relative rounded-lg bg-stone-800 px-3 py-2 text-sm font-semibold text-white md:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {username}

      {isHovered && (
        <button
          className="absolute right-[6px] top-[2px] mt-1 rounded bg-red-500 px-2 py-1 text-xs text-white shadow-md hover:bg-red-600 sm:right-0 sm:top-4"
          onClick={handleClearUsername}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Username;
