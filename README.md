# Highway Delite Task - Backend

A Node.js Express backend application for a task management system with user authentication via OTP.

## 🚀 Features

- User registration and login with OTP verification
- JWT-based authentication with HTTP-only cookies
- Task CRUD operations
- Email OTP delivery via Gmail SMTP
- MongoDB database integration
- CORS enabled for frontend communication

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── taskControllers.js    # Task-related business logic
│   └── userControllers.js    # User authentication and OTP logic
├── middleware/
│   ├── errorHandler.js       # Global error handling middleware
│   └── jwt.js               # JWT token generation and verification
├── models/
│   ├── taskSchema.js        # Task MongoDB schema
│   └── userSchema.js        # User MongoDB schema
├── routes/
│   ├── commonRoute.js       # Main route aggregator
│   ├── taskRoute.js         # Task-related routes
│   └── userRoute.js         # User authentication routes
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── server.js               # Main application entry point
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend root:
   ```env
   PORT=4001
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   JWT_SECRET_TOKEN=your-jwt-secret
   ```

4. **Start MongoDB**
   Ensure MongoDB is running on `mongodb://localhost:27017/highway`

5. **Run the application**
   ```bash
   npm start
   ```

## 📋 API Endpoints

### User Authentication
- `POST /api/user/sendotp` - Send OTP to email
- `POST /api/user/register` - Register new user with OTP verification
- `POST /api/user/login` - Login user with OTP verification
- `GET /api/user/islogged` - Check if user is authenticated

### Task Management
- `POST /api/task/addtask` - Create new task (requires authentication)
- `GET /api/task/alltask` - Get all user tasks (requires authentication)
- `DELETE /api/task/deletetask` - Delete task (requires authentication)

## 🗂️ File Descriptions

### Core Files

**`server.js`**
- Main application entry point
- Express server configuration
- Middleware setup (CORS, JSON parsing, cookies)
- Database connection initialization
- Route mounting and error handling

**`config/db.js`**
- MongoDB connection configuration
- Database connection function using Mongoose

### Models

**`models/userSchema.js`**
- User data structure definition
- Fields: name, email, birthday
- Mongoose schema with timestamps

**`models/taskSchema.js`**
- Task data structure definition
- Fields: task content, userId reference
- Population support for user details

### Controllers

**`controllers/userControllers.js`**
- User authentication business logic
- OTP generation and email sending
- User registration and login handlers
- JWT token management
- Email service configuration (Gmail SMTP)

**`controllers/taskControllers.js`**
- Task CRUD operations
- User-specific task filtering
- Task creation, retrieval, and deletion

### Routes

**`routes/commonRoute.js`**
- Central route aggregator
- Mounts user and task routes under `/api`

**`routes/userRoute.js`**
- User authentication endpoints
- OTP sending, registration, and login routes

**`routes/taskRoute.js`**
- Task management endpoints
- CRUD operations for tasks

### Middleware

**`middleware/jwt.js`**
- JWT token generation and verification
- Authentication middleware for protected routes
- Cookie-based token extraction

**`middleware/errorHandler.js`**
- Global error handling middleware
- Centralized error response formatting

## 🔧 Dependencies

### Production Dependencies
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT implementation
- `nodemailer` - Email sending
- `otp-generator` - OTP generation
- `cookie-parser` - Cookie parsing middleware
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-only Cookies**: Prevents XSS attacks
- **CORS Configuration**: Controlled cross-origin access
- **OTP Verification**: Two-factor authentication via email
- **Input Validation**: Server-side validation for all inputs

## 🌐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `4001` |
| `EMAIL_USER` | Gmail address for OTP sending | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app password | `your-app-password` |
| `JWT_SECRET_TOKEN` | Secret key for JWT signing | `your-secret-key` |

## 📝 Usage Flow

1. **User Registration**:
   - Send OTP to email → Verify OTP → Create account → Auto-login

2. **User Login**:
   - Send OTP to email → Verify OTP → Login → JWT cookie set

3. **Task Operations**:
   - All task operations require valid JWT token
   - Tasks are user-specific and filtered by userId

## 🚨 Error Handling

- Global error middleware catches all errors
- Structured error responses with status codes
- Authentication errors redirect to login
- Validation errors with descriptive messages

## 🔄 Database Schema

### User Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  birthday: Date (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  task: String (required, min: 3 chars),
  userId: ObjectId (ref: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Key Features Implementation

- **OTP System**: 6-digit numeric OTP with 5-minute expiry
- **Email Service**: Gmail SMTP with app-specific passwords
- **Token Management**: 10-minute JWT expiry with HTTP-only cookies
- **Data Population**: User details populated in task responses
- **Session Management**: Automatic logout on token expiry