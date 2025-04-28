import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from '../store/cartSlice';
import { placeOrder } from '../store/orderSlice';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function Cart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items, total } = useSelector((state) => state.cart);
    const [formData, setFormData] = useState({
        customerName: '',
        phoneNumber: '',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const handleQuantityChange = (item, newQuantity) => {
        dispatch(updateQuantity({ _id: item._id, quantity: newQuantity }));
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const validatePhoneNumber = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.length !== 10) {
            return 'Phone number must be exactly 10 digits';
        }
        if (/^(\d)\1{9}$/.test(cleaned)) {
            return 'Invalid phone number pattern';
        }
        return null;
    };

    const validateForm = () => {
        const errors = {};

        // Validate name
        if (formData.customerName.trim().length < 2) {
            errors.customerName = 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(formData.customerName)) {
            errors.customerName = 'Name can only contain letters and spaces';
        }

        // Validate phone number
        const phoneError = validatePhoneNumber(formData.phoneNumber);
        if (phoneError) {
            errors.phoneNumber = phoneError;
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear validation error when user starts typing
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                ...formData,
                phoneNumber: formData.phoneNumber.replace(/\D/g, ''), // Clean phone number before sending
                items: items.map(item => ({
                    _id: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount: total
            };

            const result = await dispatch(placeOrder(orderData)).unwrap();
            dispatch(clearCart());
            toast.success('Order placed successfully!');
            navigate(`/order-confirmation/${result.data.id}`);
        } catch (err) {
            const errorMessage = err.response?.data?.errors?.[0]?.message || err.message || 'Failed to place order. Please try again.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="py-12 text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-indigo-600 hover:text-indigo-800"
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-3xl font-bold text-gray-800">Shopping Cart</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center p-4 mb-4 bg-white rounded-lg shadow"
                        >
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-600">₹{item.price}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <MinusIcon className="w-5 h-5" />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-gray-100"
                                    >
                                        <PlusIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="mb-4 text-xl font-bold text-gray-800">Order Summary</h2>
                        <div className="mb-4">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>
                            <div className="pt-2 border-t border-gray-200">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    required
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${validationErrors.customerName ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {validationErrors.customerName && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.customerName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="10-digit phone number"
                                    required
                                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${validationErrors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {validationErrors.phoneNumber && (
                                    <p className="mt-1 text-sm text-red-600">{validationErrors.phoneNumber}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                                    Special Instructions
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-600">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 w-full text-white bg-indigo-600 rounded-md transition-colors hover:bg-indigo-700 disabled:bg-indigo-400"
                            >
                                {isSubmitting ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart; 