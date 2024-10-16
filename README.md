# Shoppy Globe

Welcome to **Shoppy Globe**, your one-stop eCommerce website for exploring and purchasing a variety of products online. 

## Features

- **Product Listing**: Browse through a diverse range of products with detailed descriptions and images.
- **Shopping Cart**: Add items to your cart and manage quantities.
- **Checkout Process**: Complete your purchase with a simple and secure checkout process.
- **Search Functionality**: Search for products quickly using the search bar.
- **Responsive Design**: Optimized for both desktop and mobile devices.
Backend

User Registration:
Users can create a new account by providing a username, email, and password.
The application securely stores user information in a MongoDB database, ensuring sensitive data is protected.

User Login:
Registered users can log in using their email and password.
The application utilizes JWT for secure authentication, allowing users to access protected routes without needing to log in repeatedly.
Tokens are generated with an expiration time to enhance security.

Protected Routes:
Certain routes, such as those for managing the shopping cart, are protected and require users to be authenticated.
Users must include their JWT in the Authorization header when making requests to these routes.
Cart Management:

Users can add items to their cart, view their cart, update item quantities, and remove items.
Only authenticated users can perform these actions, ensuring that cart management is secure.

Thank you for using ShoppyGlobe, Hope you liked the website.




