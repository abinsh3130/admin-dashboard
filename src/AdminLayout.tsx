import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidbar from "./components/Sidbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex relative">

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}


            <div
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <Sidbar onClose={() => setSidebarOpen(false)} />
            </div>


            <div className="flex-1 bg-gray-100 min-h-screen w-full lg:w-auto">
                <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                <div className="p-3 sm:p-4 md:p-6">{children}</div>
            </div>
        </div>
    );
};

export default AdminLayout;