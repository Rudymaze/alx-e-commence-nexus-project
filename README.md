# Male Fashion Store

A modern, responsive e-commerce website built for men's fashion, featuring a sleek user interface, seamless shopping experience, and robust functionality.

## Description

Male Fashion Store is a React-based e-commerce platform designed specifically for men's clothing and accessories. It provides users with an intuitive browsing experience, secure authentication, cart management, and a streamlined checkout process. The application emphasizes performance, accessibility, and maintainability.

## Features

- **Product Browsing**: Explore a curated collection of men's fashion items with detailed product pages.
- **User Authentication**: Secure login and registration system.
- **Shopping Cart**: Add, remove, and update items in the cart with persistent storage.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.
- **Form Validation**: Robust form handling with error validation for user inputs.
- **State Management**: Efficient state handling for cart, authentication, and products.
- **Modern UI**: Clean, modern interface built with utility-first CSS.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **State Management**: Zustand (with persist middleware)
- **Forms**: Formik (with Yup for validation)
- **Linting**: ESLint
- **CSS Processing**: PostCSS with Autoprefixer
- **Development**: Hot Module Replacement (HMR) via Vite

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd male-fashion-store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (default Vite port).

## Usage

- **Development**: Run `npm run dev` to start the development server with hot reloading.
- **Build**: Run `npm run build` to create a production build.
- **Preview**: Run `npm run preview` to preview the production build locally.
- **Linting**: Run `npm run lint` to check for code quality issues.

## Project Structure

```
male-fashion-store/
├── public/
│   ├── Images/          # Static images
│   └── vite.svg         # Vite logo
├── src/
│   ├── assets/          # Static assets
│   ├── components/
│   │   ├── common/      # Reusable UI components (Button, Card, FormElement)
│   │   ├── layout/      # Layout components (Header, Footer, Navbar)
│   │   └── product/     # Product-specific components (ProductCard, ProductGrid)
│   ├── hooks/           # Custom React hooks (e.g., useMediaQuery)
│   ├── pages/           # Page components (Home, Shop, Cart, Login, etc.)
│   ├── store/           # Zustand stores (authStore, cartStore, ProductStore)
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component with routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .gitignore
├── eslint.config.js     # ESLint configuration
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── README.md            # This file
```

## Best Practices

This project follows modern React and web development best practices:

- **Component-Based Architecture**: Modular, reusable components for maintainability.
- **Hooks and Functional Components**: Leveraging React hooks for state and lifecycle management.
- **State Management**: Using Zustand for predictable, scalable state handling with persistence.
- **Form Handling**: Formik with Yup for declarative form validation and error handling.
- **Styling**: Utility-first approach with Tailwind CSS for consistent, responsive design.
- **Performance**: Optimized with Vite's fast build times and HMR for development.
- **Code Quality**: ESLint for consistent code style and error prevention.
- **Accessibility**: Semantic HTML and ARIA attributes where applicable.
- **Responsive Design**: Mobile-first approach ensuring usability across devices.
- **Separation of Concerns**: Clear organization of components, pages, and logic.
- **Version Control**: Proper .gitignore and commit practices.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check code quality.
- `npm run preview`: Preview the production build locally.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

Ensure all changes pass linting and follow the established code style.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
