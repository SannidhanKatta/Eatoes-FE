# Digital Diner Frontend

A modern React-based frontend for the Digital Diner restaurant ordering system.

## Features

- Interactive menu with categories and item details
- Shopping cart functionality
- Order placement and history
- Responsive design for all devices
- Modern UI with animations and transitions
- Real-time order status updates

## Tech Stack

- React 18
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Vite for build tooling
- Heroicons for icons
- React Hot Toast for notifications

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd digital-diner-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add:

```
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Environment Variables

- `VITE_API_URL`: Backend API URL (required)

## Project Structure

```
src/
├── components/     # React components
├── store/         # Redux store and slices
├── assets/        # Static assets
└── App.jsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
