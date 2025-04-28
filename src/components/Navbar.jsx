import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Sidebar from './Sidebar';

const categories = ['Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Sides'];

function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items } = useSelector((state) => state.cart);
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    const scrollToCategory = (category) => {
        const element = document.getElementById(category);
        if (element) {
            const navbarHeight = 64; // h-16 = 4rem = 64px
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
        setIsMenuOpen(false);
    };

    // Close menu when clicking outside
    const handleClickOutside = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 shadow-lg fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-90">
                <div className="container mx-auto px-4">
                    <div className="flex items-center h-16 relative">
                        {/* Mobile: Left hamburger menu */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 rounded-lg transition-all duration-200 md:hidden"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>

                        {/* Logo - centered on mobile, left on desktop */}
                        <div className="flex-1 flex justify-center md:justify-start">
                            <Link to="/" className="flex items-center group">
                                <span className="text-2xl font-bold text-white tracking-tight group-hover:scale-105 transition-transform duration-200">
                                    Digital Diner
                                </span>
                            </Link>
                        </div>

                        {/* Desktop: Navigation + Cart aligned to right */}
                        <div className="flex items-center">
                            <div className="hidden md:flex items-center space-x-8 mr-8">
                                {/* Menu Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                                        className="flex items-center space-x-1 text-white/90 hover:text-white transition-colors group"
                                    >
                                        <span>Menu</span>
                                        <ChevronDownIcon className={`h-4 w-4 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''} group-hover:scale-110`} />
                                    </button>

                                    {/* Desktop Dropdown Menu */}
                                    {isMenuOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-30"
                                                onClick={handleClickOutside}
                                            />
                                            <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-lg py-1 z-40 border border-purple-100">
                                                {categories.map((category) => (
                                                    <button
                                                        key={category}
                                                        onClick={() => scrollToCategory(category)}
                                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                                    >
                                                        {category}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <Link
                                    to="/order-history"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    Order History
                                </Link>
                            </div>

                            <Link
                                to="/cart"
                                className="relative text-white/90 hover:text-white transition-colors group"
                            >
                                <ShoppingCartIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Spacer to prevent content from going under fixed navbar */}
            <div className="h-16"></div>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                categories={categories}
                onCategoryClick={scrollToCategory}
            />
        </>
    );
}

export default Navbar; 