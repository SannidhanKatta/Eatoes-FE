import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderHistory } from '../store/orderSlice';
import { PhoneIcon } from '@heroicons/react/24/outline';

function OrderHistory() {
    const dispatch = useDispatch();
    const { orderHistory, status, error } = useSelector((state) => state.order);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        try {
            await dispatch(fetchOrderHistory(phoneNumber)).unwrap();
        } catch (err) {
            console.error('Failed to fetch order history:', err);
        } finally {
            setIsSearching(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                Order History
            </h1>

            <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-8">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0 md:flex md:gap-4">
                    <div className="flex-1">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                            Enter your phone number to view past orders
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-base"
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isSearching}
                        className="w-full md:w-auto md:self-end bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSearching ? 'Searching...' : 'Search Orders'}
                    </button>
                </form>
            </div>

            {status === 'loading' && (
                <div className="flex justify-center items-center h-64">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 border-t-4 border-purple-600 rounded-full animate-spin"></div>
                    </div>
                </div>
            )}

            {status === 'failed' && (
                <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
                    Error: {error}
                </div>
            )}

            {status === 'succeeded' && orderHistory.length === 0 && (
                <div className="text-center text-gray-600 p-8 bg-gray-50 rounded-lg">
                    No orders found for this phone number.
                </div>
            )}

            {status === 'succeeded' && orderHistory.length > 0 && (
                <div className="space-y-4">
                    {orderHistory.map((order) => (
                        <div key={order.id} className="bg-white rounded-xl shadow-md p-4 md:p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Order #{order.id}
                                    </h3>
                                    <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                                </div>
                                <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium self-start
                                    ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'}`}
                                >
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <h4 className="font-medium text-gray-800 mb-2">Order Items:</h4>
                                <ul className="space-y-2">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="flex justify-between text-sm md:text-base text-gray-600">
                                            <span className="flex-1">{item.quantity}x {item.name}</span>
                                            <span className="ml-4">₹{(item.price * item.quantity)}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-100 mt-4 pt-4">
                                <div className="flex justify-between font-medium text-base md:text-lg">
                                    <span>Total Amount:</span>
                                    <span className="text-purple-600">₹{order.totalAmount}</span>
                                </div>
                            </div>

                            {order.notes && (
                                <div className="border-t border-gray-100 mt-4 pt-4">
                                    <h4 className="font-medium text-gray-800 mb-2">Special Instructions:</h4>
                                    <p className="text-sm text-gray-600 break-words">{order.notes}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory; 