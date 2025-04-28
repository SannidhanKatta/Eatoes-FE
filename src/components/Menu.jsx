import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../store/menuSlice';
import { addItem } from '../store/cartSlice';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function Menu() {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.menu);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMenu());
        }
    }, [status, dispatch]);

    const handleAddToCart = (item) => {
        dispatch(addItem(item));
        toast.success(`You Grabbed ${item.name}`, {
            position: 'bottom-right',
            duration: 2000,
            style: {
                background: '#4F46E5',
                color: '#ffffff',
                padding: '16px',
            },
        });
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 border-t-4 border-purple-600 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="text-center text-red-600 p-4">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-7xl mx-auto px-4 py-8">
            {Object.entries(categories).map(([category, items]) => (
                <div key={category} id={category} className="space-y-6 scroll-mt-20">
                    <div className="relative">
                        <h2 className="text-3xl font-bold text-gray-800 inline-block">
                            {category}
                        </h2>
                        <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1"
                            >
                                {item.imageUrl && (
                                    <div className="relative w-full pt-[75%] overflow-hidden">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                        <span className="text-lg font-bold text-purple-600 ml-3 whitespace-nowrap">
                                            ₹{item.price}
                                        </span>
                                    </div>

                                    {item.nutritionalInfo && (
                                        <div className="mt-2 mb-4 text-sm text-gray-500 space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                                    {item.nutritionalInfo.calories} cal
                                                </span>
                                                {item.nutritionalInfo.allergens?.length > 0 && (
                                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs line-clamp-1">
                                                        Contains: {item.nutritionalInfo.allergens.join(', ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="mt-auto w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <PlusIcon className="h-5 w-5" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Menu; 