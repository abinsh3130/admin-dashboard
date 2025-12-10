import { FaBars, FaSearch, FaBell, FaCog, FaUser } from "react-icons/fa";

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            aria-label="Menu"
          >
            <FaBars className="text-lg sm:text-xl" />
          </button>
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 hidden sm:block"
            aria-label="Search"
          >
            <FaSearch className="text-lg sm:text-xl" />
          </button>
        </div>

        <div className="flex-1 mx-2 sm:mx-4 md:mx-8 hidden md:block">
          <div className="max-w-2xl mx-auto">
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

          <button
            type="button"
            className="relative text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            aria-label="Notifications"
          >
            <FaBell className="text-lg sm:text-xl" />
            <span className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 hidden sm:block"
            aria-label="Settings"
          >
            <FaCog className="text-lg sm:text-xl" />
          </button>

          <button
            type="button"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-gray-300 focus:outline-none"
            aria-label="Profile"
          >
          <FaUser className="text-lg sm:text-xl text-gray-600 flex items-center justify-center" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;