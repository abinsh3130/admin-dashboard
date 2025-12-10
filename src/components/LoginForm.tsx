import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaGoogle, FaGithub, FaPlay } from "react-icons/fa";
import authSideBg from "../assets/auth-side-bg.png";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 bg-white flex items-center justify-center p-6 md:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                            <FaPlay className="text-white text-lg" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                        Welcome back!
                    </h1>
                    <p className="text-gray-700 mb-8">
                        Please enter your credentials to sign in!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                >
                                    {showPassword ? (
                                        <AiOutlineEye className="text-xl" />
                                    ) : (
                                        <AiOutlineEyeInvisible className="text-xl" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <a
                                href="#"
                                className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                                Forgot password
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            <FaGoogle className="text-xl" />
                            <span className="text-gray-700 font-medium">Google</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200"
                        >
                            <FaGithub className="text-xl" />
                            <span className="text-gray-700 font-medium">Github</span>
                        </button>
                    </div>


                    <div className="text-center text-sm text-gray-600">
                        Don't have an account yet?{" "}
                        <a
                            href="#"
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Sign up
                        </a>
                    </div>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2 h-screen py-10 px-10 relative overflow-hidden">
                <img
                    src={authSideBg}
                    alt="Auth background"
                    className="w-full h-full rounded-xl object-cover"
                />
                <div className="absolute top-0 right-0 w-8 h-8 bg-white rounded-tl-3xl"></div>
            </div>
        </div>
    );
};

export default LoginForm;
