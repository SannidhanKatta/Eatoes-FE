# Digital Diner Frontend

A modern React-based frontend for the Digital Diner restaurant ordering system, deployed on Netlify.

## Live Demo

[https://digitaldiner-xi.netlify.app](https://digitaldiner-xi.netlify.app)

## Features

- **Interactive Menu Display**

  - Categorized menu items (Appetizers, Main Courses, Desserts, etc.)
  - Item details with prices and descriptions
  - Smooth animations and transitions

- **Shopping Cart**

  - Add/remove items
  - Update quantities
  - Real-time total calculation
  - Persistent cart state using Redux

- **Order Management**

  - Simple order placement with name and phone number
  - Special instructions for orders
  - Order confirmation with details
  - Order history lookup by phone number

- **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Touch-friendly interactions

## Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router 6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - API client
- **React Hot Toast** - Notifications
- **Vite** - Build tool
- **Heroicons** - Icons

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Cart/      # Shopping cart components
│   ├── Menu/      # Menu display components
│   └── Order/     # Order-related components
├── store/         # Redux store configuration
│   ├── cartSlice  # Cart state management
│   ├── menuSlice  # Menu state management
│   └── orderSlice # Order state management
├── assets/        # Static assets
└── App.jsx        # Main application component
```

## State Management

- **Cart State**: Managed with Redux Toolkit

  - Add/remove items
  - Update quantities
  - Calculate totals
  - Persist state in localStorage

- **Menu State**: Redux Toolkit with async thunks

  - Fetch menu categories
  - Cache menu items
  - Loading states

- **Order State**: Redux Toolkit
  - Order placement
  - Order history
  - Confirmation handling

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/SannidhanKatta/Eatoes-FE.git
   cd digital-diner/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:

   ```
   VITE_API_URL=http://localhost:3000/api  # Local development
   # or
   VITE_API_URL=https://your-backend-url/api  # Production
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
```

This will create a `dist` directory with optimized production build.

## Deployment

The application is configured for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables in Netlify dashboard
4. Enable automatic deployments

## Development Workflow

1. Create feature branches from `main`
2. Make changes and test locally
3. Commit with meaningful messages
4. Push and create pull requests
5. Automated deployment on merge to main

## Best Practices Implemented

- Component-based architecture
- Proper state management
- Error handling and loading states
- Responsive design principles
- Code splitting and lazy loading
- Performance optimizations
- Consistent error handling
- Accessibility considerations


## Known Issues

- Cart state persists after order placement (intentional, can be changed)
