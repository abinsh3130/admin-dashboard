import { FaShoppingCart, FaChartLine, FaRupeeSign } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {

    const cardData = [
        {
            id: 1,
            title: "Total Sales",
            value: "₹45,231",
            change: "+20.1%",
            changeType: "positive",
            icon: FaRupeeSign,
            color: "bg-blue-500"
        },
        {
            id: 2,
            title: "Total Orders",
            value: "1,234",
            change: "+12.5%",
            changeType: "positive",
            icon: FaShoppingCart,
            color: "bg-green-500"
        },
        {
            id: 3,
            title: "Total Revenue",
            value: "₹89,450",
            change: "+8.2%",
            changeType: "positive",
            icon: FaChartLine,
            color: "bg-purple-500"
        }
    ];

    const salesData = [
        { month: "Jan", sales: 4000 },
        { month: "Feb", sales: 3000 },
        { month: "Mar", sales: 5000 },
        { month: "Apr", sales: 4500 },
        { month: "May", sales: 6000 },
        { month: "Jun", sales: 5500 },
        { month: "Jul", sales: 7000 },
        { month: "Aug", sales: 6500 },
        { month: "Sep", sales: 8000 },
        { month: "Oct", sales: 7500 },
        { month: "Nov", sales: 9000 },
        { month: "Dec", sales: 8500 }
    ];


    const ordersData = [
        { month: "Jan", orders: 120 },
        { month: "Feb", orders: 190 },
        { month: "Mar", orders: 300 },
        { month: "Apr", orders: 250 },
        { month: "May", orders: 400 },
        { month: "Jun", orders: 350 },
        { month: "Jul", orders: 450 },
        { month: "Aug", orders: 420 },
        { month: "Sep", orders: 500 },
        { month: "Oct", orders: 480 },
        { month: "Nov", orders: 550 },
        { month: "Dec", orders: 520 }
    ];

    return (
        <div className="space-y-4 sm:space-y-6">
            <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome Admin</h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Here's what's happening with your store today</p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {cardData.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{card.value}</p>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                        <span
                                            className={`text-xs sm:text-sm font-medium ${card.changeType === "positive" ? "text-green-600" : "text-red-600"
                                                }`}
                                        >
                                            {card.change}
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-500">from last month</span>
                                    </div>
                                </div>
                                <div className={`${card.color} p-2 sm:p-3 rounded-lg`}>
                                    <Icon className="text-white text-2xl" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Sales Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px"
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="sales"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                name="Sales (₹)"
                                dot={{ fill: "#3b82f6", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>


                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Orders Overview</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={ordersData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px"
                                }}
                            />
                            <Legend />
                            <Bar dataKey="orders" fill="#10b981" name="Orders" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;