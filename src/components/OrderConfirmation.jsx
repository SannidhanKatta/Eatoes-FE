import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function OrderConfirmation() {
    const { orderId } = useParams();
    const { currentOrder } = useSelector((state) => state.order);

    if (!currentOrder) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Information Not Available</h2>
                <p className="text-gray-600 mb-6">
                    The order information is no longer available. Please check your order history for details.
                </p>
                <div className="space-x-4">
                    <Link
                        to="/"
                        className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Return to Menu
                    </Link>
                    <Link
                        to="/order-history"
                        className="inline-block text-indigo-600 hover:text-indigo-800"
                    >
                        View Order History
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto text-center py-12">
            <div className="mb-8">
                <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Thank You for Your Order!
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="text-left">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Details</h3>
                        <p className="text-gray-600">Order #{orderId}</p>
                        <p className="text-gray-600">Name: {currentOrder.customerName}</p>
                        <p className="text-gray-600">Phone: {currentOrder.phoneNumber}</p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-4">
                        <h4 className="font-medium text-gray-800 mb-2">Order Items:</h4>
                        <ul className="space-y-2">
                            {currentOrder.items.map((item, index) => (
                                <li key={index} className="flex justify-between text-gray-600">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>₹{(item.price * item.quantity)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between font-medium">
                            <span>Total Amount:</span>
                            <span>₹{currentOrder.totalAmount}</span>
                        </div>
                    </div>

                    {currentOrder.notes && (
                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Special Instructions:</h4>
                            <p className="text-gray-600">{currentOrder.notes}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-x-4">
                <Link
                    to="/"
                    className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Place Another Order
                </Link>
                <Link
                    to="/order-history"
                    className="inline-block text-indigo-600 hover:text-indigo-800"
                >
                    View Order History
                </Link>
            </div>
        </div>
    );
}

export default OrderConfirmation; 