import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function Sidebar({ isOpen, onClose, categories, onCategoryClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCategoryClick = (category) => {
        onCategoryClick(category);
        onClose();
    };

    return (
        <>
            {/* Backdrop with blur effect */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-700 shadow-xl transform transition-all duration-300 ease-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Digital Diner</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <nav className="space-y-3">
                        {/* Menu with dropdown */}
                        <div>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center justify-between w-full px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                            >
                                <span className="text-lg">Menu</span>
                                <ChevronDownIcon
                                    className={`h-5 w-5 transform transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Categories Dropdown */}
                            <div className={`mt-1 ml-4 space-y-1 transition-all duration-200 ${isMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'
                                }`}>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => handleCategoryClick(category)}
                                        className="block w-full text-left px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/order-history"
                            onClick={onClose}
                            className="block px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-lg"
                        >
                            Order History
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Sidebar; 