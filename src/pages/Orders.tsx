import { useState, useEffect, useMemo } from "react";
import { FaSearch, FaEye, FaTrash, FaSortUp, FaSortDown, FaFileExcel, FaFilePdf } from "react-icons/fa";
import { exportToExcel, exportToPDF } from "../utils/exportUtils";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const Orders = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({ min: "", max: "" });
    const [minRating, setMinRating] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const data: Product[] = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
        return uniqueCategories;
    }, [products]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = products.filter(product => {
            const matchesSearch =
                product.id.toString().includes(searchTerm.toLowerCase()) ||
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());


            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;


            const matchesPrice =
                (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
                (!priceRange.max || product.price <= parseFloat(priceRange.max));

            const matchesRating = !minRating || product.rating.rate >= parseFloat(minRating);

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        });


        if (sortConfig) {
            result = [...result].sort((a, b) => {
                let aValue: any = a[sortConfig.key as keyof Product];
                let bValue: any = b[sortConfig.key as keyof Product];

                if (sortConfig.key === "rating") {
                    aValue = a.rating.rate;
                    bValue = b.rating.rate;
                }

                if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [products, searchTerm, sortConfig, selectedCategory, priceRange, minRating]);

    const clearFilters = () => {
        setSelectedCategory("all");
        setPriceRange({ min: "", max: "" });
        setMinRating("");
        setSearchTerm("");
    };

    const hasActiveFilters = selectedCategory !== "all" || priceRange.min || priceRange.max || minRating;


    const handleExportExcel = () => {
        const exportData = filteredAndSortedProducts.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            rating: product.rating.rate,
            ratingCount: product.rating.count,
            description: product.description
        }));
        exportToExcel(exportData, `orders_${new Date().toISOString().split('T')[0]}`);
    };

    const handleExportPDF = () => {
        const exportData = filteredAndSortedProducts.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            category: product.category,
            rating: product.rating.rate,
            ratingCount: product.rating.count,
            description: product.description
        }));
        exportToPDF(exportData, `orders_${new Date().toISOString().split('T')[0]}`, 'Orders Report');
    };

    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <FaSortUp className="text-gray-400" />;
        }
        return sortConfig.direction === "asc" ? (
            <FaSortUp className="text-gray-600" />
        ) : (
            <FaSortDown className="text-gray-600" />
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-600">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">

            <div className="bg-white border-b border-gray-200 px-3 sm:px-4 md:px-6 py-3 sm:py-4">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders</h1>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={handleExportExcel}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-green-500 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm sm:text-base"
                            title="Export to Excel"
                        >
                            <FaFileExcel className="text-xs sm:text-sm" />
                            <span className="hidden sm:inline">Excel</span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-red-500 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm sm:text-base"
                            title="Export to PDF"
                        >
                            <FaFilePdf className="text-xs sm:text-sm" />
                            <span className="hidden sm:inline">PDF</span>
                        </button>
                    </div>
                </div>


                <div className="flex items-center gap-2 sm:gap-4">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-3 sm:px-4 sm:pl-10 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                </div>



                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Min Price</label>
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange.min}
                                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Max Price</label>
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange.max}
                                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>


                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-2">Min Rating</label>
                            <select
                                value={minRating}
                                onChange={(e) => setMinRating(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Ratings</option>
                                <option value="1">1+ ⭐</option>
                                <option value="2">2+ ⭐</option>
                                <option value="3">3+ ⭐</option>
                                <option value="4">4+ ⭐</option>
                                <option value="4.5">4.5+ ⭐</option>
                            </select>
                        </div>
                    </div>


                    {hasActiveFilters && (
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

            </div>


            <div className="px-3 sm:px-4 md:px-6 py-3 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredAndSortedProducts.length}</span> of{" "}
                    <span className="font-semibold text-gray-900">{products.length}</span> orders
                    {hasActiveFilters && " (filtered)"}
                </p>
            </div>


            <div className="md:hidden space-y-4 px-3 sm:px-4">
                {filteredAndSortedProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                        <div className="flex items-start gap-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-20 h-20 object-contain rounded flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-500 mb-1">ID: {product.id}</p>
                                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{product.title}</h3>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Category:</span>
                                        <span className="text-xs font-medium text-gray-900 capitalize">{product.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Price:</span>
                                        <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">Rating:</span>
                                        <span className="text-xs font-medium text-gray-900">{product.rating.rate} ⭐ ({product.rating.count})</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium">
                                        <FaEye className="text-sm" />
                                        View
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-xs font-medium">
                                        <FaTrash className="text-sm" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="hidden md:block overflow-x-auto -mx-3 sm:mx-0">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th
                                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort("id")}
                            >
                                <div className="flex items-center gap-1 sm:gap-2">
                                    ID
                                    {getSortIcon("id")}
                                </div>
                            </th>
                            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                IMAGE
                            </th>
                            <th
                                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort("title")}
                            >
                                <div className="flex items-center gap-1 sm:gap-2">
                                    TITLE
                                    {getSortIcon("title")}
                                </div>
                            </th>
                            <th
                                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort("category")}
                            >
                                <div className="flex items-center gap-1 sm:gap-2">
                                    CATEGORY
                                    {getSortIcon("category")}
                                </div>
                            </th>
                            <th
                                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSort("price")}
                            >
                                <div className="flex items-center gap-1 sm:gap-2">
                                    PRICE
                                    {getSortIcon("price")}
                                </div>
                            </th>
                            <th
                                className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 hidden lg:table-cell"
                                onClick={() => handleSort("rating")}
                            >
                                <div className="flex items-center gap-1 sm:gap-2">
                                    RATING
                                    {getSortIcon("rating")}
                                </div>
                            </th>
                            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                DESCRIPTION
                            </th>
                            <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ACTIONS
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredAndSortedProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                    {product.id}
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded"
                                    />
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 max-w-xs">
                                    <div className="truncate" title={product.title}>
                                        {product.title}
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 capitalize">
                                    {product.category}
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 hidden lg:table-cell">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{product.rating.rate} ⭐</span>
                                        <span className="text-xs text-gray-500">({product.rating.count} reviews)</span>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 max-w-md hidden lg:table-cell">
                                    <div className="truncate" title={product.description}>
                                        {product.description}
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <button className="text-blue-600 hover:text-blue-800">
                                            <FaEye className="text-base sm:text-lg" />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <FaTrash className="text-base sm:text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    No orders found
                </div>
            )}
        </div>
    );
};

export default Orders;

