# CuakStore - E-commerce Platform

CuakStore is a modern e-commerce platform built with Spring Boot and React TypeScript. It features a responsive UI, secure authentication with JWT and Google SSO, product browsing, shopping cart, checkout with Mercado Pago integration, and admin dashboards.

## Features

- **Modern UI/UX** with Material-UI, responsive design, and animations
- **Secure Authentication** with JWT and Google SSO
- **Role-based Access Control** for users, admins, and owners
- **Product Browsing** with filtering and search
- **Shopping Cart** and checkout functionality
- **Payment Processing** with Mercado Pago integration
- **Admin Dashboard** for managing products, categories, and orders
- **TypeScript** for type safety and better developer experience
- **Optimized Performance** with code splitting and lazy loading

## Prerequisites

- Java 21 or higher
- Node.js 18 or higher
- npm or yarn
- PostgreSQL (for production)

## Environment Variables

### Backend (Spring Boot)

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/cuakstoredb
SPRING_DATASOURCE_USERNAME=your_db_username
SPRING_DATASOURCE_PASSWORD=your_db_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=86400000

# Admin User Configuration
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong_admin_password

# Owner User Configuration
OWNER_USERNAME=owner
OWNER_EMAIL=owner@example.com
OWNER_PASSWORD=strong_owner_password

# Google OAuth2 Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Mercado Pago Configuration
MERCADOPAGO_ACCESS_TOKEN=your_mercadopago_access_token
```

### Frontend (React)

Create a `.env` file in the `frontend` directory with the following variables:

```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Setup and Installation

### Backend (Spring Boot)

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cuakstore.git
   cd cuakstore
   ```

2. Build the project:
   ```
   ./gradlew build
   ```

3. Run the application:
   ```
   ./gradlew bootRun
   ```

The backend server will start on http://localhost:8080.

### Frontend (React TypeScript)

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The frontend development server will start on http://localhost:3000.

## Production Deployment

### Backend

1. Build the production JAR:
   ```
   ./gradlew bootJar
   ```

2. Run the JAR file:
   ```
   java -jar build/libs/cuakstore-0.0.1-SNAPSHOT.jar
   ```

### Frontend

1. Build the production bundle:
   ```
   cd frontend
   npm run build
   ```

2. Serve the static files from a web server of your choice (Nginx, Apache, etc.)

## Security Considerations

- All sensitive configuration is externalized to environment variables
- Passwords are securely hashed using BCrypt
- JWT tokens are used for stateless authentication
- Google SSO provides an additional secure authentication method
- H2 console is disabled by default in production
- Admin and owner accounts use strong, randomly generated passwords if not provided

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Spring Boot for the backend framework
- React and TypeScript for the frontend
- Material-UI for the component library
- Mercado Pago for payment processing
- Google for OAuth2 authentication
