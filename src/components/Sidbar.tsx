import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaBox,
    FaShoppingCart,
    FaCog,
    FaSignOutAlt,
    FaTimes
} from "react-icons/fa";

interface SidbarProps {
    onClose?: () => void;
}

const Sidbar = ({ onClose }: SidbarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
           
        navigate('/');
       
        if (onClose) onClose();
    };

    const menuItems = [
        {
            path: "/dashboard",
            label: "Dashboard",
            icon: FaHome
        },
        {
            path: "/products",
            label: "Products",
            icon: FaBox
        },
        {
            path: "/orders",
            label: "Orders",
            icon: FaShoppingCart
        },
      
    ];

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="w-64 bg-white min-h-screen shadow-lg border-r border-gray-200 flex flex-col">

            <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                        <FaBox className="text-white text-sm sm:text-lg" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">ECME</h2>
                </div>
                <button
                    onClick={onClose}
                    className="lg:hidden text-gray-500 hover:text-gray-700 p-2"
                    aria-label="Close menu"
                >
                    <FaTimes className="text-xl" />
                </button>
            </div>


            <nav className="flex-1 px-2 sm:px-4 py-4 sm:py-6 overflow-y-auto">
                <div className="space-y-1 sm:space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={`
                                    flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200
                                    ${active
                                        ? "bg-blue-50 text-blue-700 font-medium  border-blue-600"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }
                                `}
                            >
                                <Icon className={`text-base sm:text-lg ${active ? "text-blue-600" : "text-gray-500"}`} />
                                <span className="text-xs sm:text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>


            <div className="px-2 sm:px-4 py-4 sm:py-6 border-t border-gray-200 space-y-1 sm:space-y-2">
                <Link
                    to="/settings"
                    onClick={onClose}
                    className={`
                        flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200
                        ${isActive("/settings")
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }
                    `}
                >
                    <FaCog className={`text-base sm:text-lg ${isActive("/settings") ? "text-blue-600" : "text-gray-500"}`} />
                    <span className="text-xs sm:text-sm">Settings</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full text-left"
                >
                    <FaSignOutAlt className="text-base sm:text-lg text-gray-500" />
                    <span className="text-xs sm:text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidbar;