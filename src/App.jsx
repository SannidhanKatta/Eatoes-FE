import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="min-h-screen bg-gray-100">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Menu />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/order-history" element={<OrderHistory />} />
                            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                        </Routes>
                    </main>
                    <Toaster />
                </div>
            </Router>
        </Provider>
    );
}

export default App; 