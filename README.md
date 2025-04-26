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

### Backend (Spring Boot) - The Server Part

This part makes the website's brain work. You need Java 21 installed first!

1.  **Get the Code:**
   *   Make sure you have the project code downloaded (cloned).

2.  **Set Up Secrets (Important!):**
   *   Find the main project folder (the one with `build.gradle` in it).
   *   You need a file named `.env` in this folder. Ask your friend for the content, or copy it from the "Environment Variables" -> "Backend (Spring Boot)" section above and fill in the secrets (like database passwords, Google keys, etc.). **The backend won't work without this!**

3.  **Open Your Terminal:**
   *   Navigate into the main project folder using your terminal (e.g., `cd path/to/cuakstore`).

4.  **Run the Magic Command:**
   *   Type this command and press Enter:
       ```bash
       ./gradlew bootRun
       ```
   *   This tells Gradle (the build tool) to start the Spring Boot application.
   *   It might download some things the first time. Be patient!

5.  **Check if it Worked:**
   *   You'll see a lot of text in the terminal. Look for lines near the end that say something like `Tomcat started on port(s): 8080` or `Started CuakstoreApplication`.
   *   If you see that, the backend is running! It's usually accessible at `http://localhost:8080`, but the frontend part (the website you see) needs to be running too to interact with it fully.

**To Stop the Backend:**

*   Go back to the terminal where it's running and press `Ctrl + C`.

### Frontend (React TypeScript) - The Website Part

This is the actual website you see and click on in your browser. You need Node.js and npm installed first!

1.  **Get the Code:**
   *   Make sure you have the project code downloaded (cloned).

2.  **Set Up Secrets (If needed):**
   *   Go into the `frontend` folder inside the main project.
   *   Look for a file named `.env`. If it's not there, you might need to create it.
   *   Copy the content from the "Environment Variables" -> "Frontend (React)" section above into this file. You'll need the `REACT_APP_GOOGLE_CLIENT_ID` from your friend or your own setup.

3.  **Open Your Terminal:**
   *   Navigate *into the `frontend` folder* using your terminal (e.g., `cd path/to/cuakstore/frontend`).

4.  **Install Necessary Stuff (First time only):**
   *   Type this command and press Enter:
       ```bash
       npm install --legacy-peer-deps
       ```
   *   This downloads all the code bits the frontend needs to work. It might take a few minutes. The `--legacy-peer-deps` flag helps avoid potential conflicts between different package versions.

5.  **Run the Magic Command:**
   *   Type this command and press Enter:
       ```bash
       npm start
       ```
   *   This starts a local web server just for development.

6.  **Check if it Worked:**
   *   Your web browser should automatically open a new tab showing the CuakStore website (usually at `http://localhost:3000`).
   *   You'll see messages in your terminal. If it says something like `Compiled successfully!` and `You can now view frontend in the browser`, it's working!
   *   Keep this terminal open while you're working on the frontend.

**To Stop the Frontend:**

*   Go back to the terminal where it's running (the one you used `npm start` in) and press `Ctrl + C`.


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
