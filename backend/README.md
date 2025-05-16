# E-commerce Backend

This is the backend for the E-commerce Follow Along project, built with Node.js, Express, and MongoDB.

## Local Development

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   MONGO_PASSWORD=your_mongo_password
   JWT_PASSWORD=your_jwt_secret
   PORT=8080
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Deployment on Render

### Prerequisites

1. Create a [Render](https://render.com/) account
2. Create a new Web Service

### Deployment Steps

1. Connect your GitHub repository to Render
2. Configure the Web Service:
   - **Name**: Your service name (e.g., ecommerce-backend)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend` (if your backend is in a subdirectory)

3. Add the following environment variables in Render:
   - `MONGO_PASSWORD`: Your MongoDB password
   - `JWT_PASSWORD`: Your JWT secret
   - `NODE_ENV`: Set to `production`
   - `FRONTEND_URL`: Your frontend URL (e.g., https://your-frontend.vercel.app)

4. Click "Create Web Service"

### Important Notes

- Render will automatically set the `PORT` and `RENDER_EXTERNAL_URL` environment variables
- Make sure your MongoDB Atlas cluster allows connections from all IP addresses (0.0.0.0/0) or specifically from Render's IP ranges
- If you're using file uploads, note that files uploaded to Render are ephemeral and will be lost when the service restarts. Consider using a cloud storage service like AWS S3 for production deployments.

## API Endpoints

### Authentication
- `POST /user/signup` - Register a new user
- `POST /user/login` - Login a user

### Products
- `GET /allproducts` - Get all products
- `GET /allproducts/:id` - Get a specific product
- `POST /product/addproduct` - Add a new product (requires authentication)
- `PUT /product/update/:id` - Update a product (requires authentication)
- `DELETE /product/delete/:id` - Delete a product (requires authentication)

### Cart
- `GET /cart` - Get user's cart (requires authentication)
- `GET /cart/cartproduct/:id` - Add product to cart (requires authentication)
- `PUT /cart/:cartproductid` - Update cart item quantity (requires authentication)

### Address
- `GET /address` - Get user's addresses (requires authentication)
- `POST /address` - Add a new address (requires authentication)

### Orders
- `GET /order` - Get user's orders (requires authentication)
- `POST /order` - Create a new order (requires authentication)
- `PUT /order/cancel/:orderId` - Cancel an order (requires authentication)
