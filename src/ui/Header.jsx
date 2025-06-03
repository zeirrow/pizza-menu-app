import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Icons for toggle
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="z-40 flex items-center justify-between py-3 uppercase bg-yellow-500 border-b-2 border-yellow-500 sm:px-6 md:px-4 md:py-5">
      {/* Logo */}
      <Link className="tracking-widest" to="/">
        Fast React Pizza Co.
      </Link>

      {/* Desktop: Show normally | Mobile: Toggle dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none sm:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dropdown (Hidden on larger screens) */}
        <div
          className={`absolute right-0 w-dvw space-y-2 md:space-y-0 rounded-lg bg-yellow-500 px-4 py-4 shadow-lg md:top-[-20px] ${
            isOpen ? 'block' : 'hidden'
          } sm:flex sm:w-auto sm:items-center sm:space-x-4 sm:bg-transparent sm:p-0 sm:shadow-none`}
        >
          <SearchOrder />
          <Username />
        </div>
      </div>
    </header>
  );
};

export default Header;
