import { useState } from "react";
import { FaUser, FaBell, FaLock, FaPalette, FaGlobe, FaSave, FaEnvelope, FaPhone } from "react-icons/fa";

const Settings = () => {
    const [settings, setSettings] = useState({
        profile: {
            firstName: "Abinesh",
            lastName: "S",
            email: "abinesh@gmail.com",
            phone: "8610440021",
            company: "ECME",
            role: "Admin"
        },
        notifications: {
            emailNotifications: true,
            pushNotifications: true,
            orderUpdates: true,
            productUpdates: false,
            marketingEmails: false
        },
        security: {
            twoFactorAuth: false,
            sessionTimeout: "30",
            passwordExpiry: "90"
        },
        appearance: {
            theme: "light",
            language: "en",
            timezone: "India"
        }
    });

    const handleInputChange = (section: string, field: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [field]: value
            }
        }));
    };

    const handleSave = () => {
        alert("Settings saved successfully!");
    };



    return (
        <div className="bg-white min-h-screen">
            <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

                <div className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                        <input
                                            type="text"
                                            value={settings.profile.firstName}
                                            onChange={(e) => handleInputChange("profile", "firstName", e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                        <input
                                            type="text"
                                            value={settings.profile.lastName}
                                            onChange={(e) => handleInputChange("profile", "lastName", e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="email"
                                                value={settings.profile.email}
                                                onChange={(e) => handleInputChange("profile", "email", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={settings.profile.phone}
                                                onChange={(e) => handleInputChange("profile", "phone", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                                        <input
                                            type="text"
                                            value={settings.profile.company}
                                            onChange={(e) => handleInputChange("profile", "company", e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                                        <input
                                            type="text"
                                            value={settings.profile.role}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <FaSave className="text-sm" />
                                <span>Save Changes</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Settings;

