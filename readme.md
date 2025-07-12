# Blog Application

A full-stack blog application with user authentication, post management, comments, and likes functionality.

## 🚀 Live Deployment
NOTE : This is free deployment backend might down due to inactivity 
[deployment link here](https://aradhana-labs-assignment.vercel.app/)

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)


##  Tech Stack

### Frontend
- **React.js** - Component-based UI library for building interactive interfaces
- **React Router** - Client-side routing for single-page application navigation
- **Axios** - HTTP client for API requests
- **CSS/Tailwind CSS** - Styling and responsive design
- **Zustand** - State management for user authentication and global state
- **tenStackQuery** - State management for user authentication and global state
- **ShadCn** - UI library

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web framework for building RESTful APIs
- **MongoDB** - Database for storing users, posts, comments, and likes
- **Mongoose** - ODM/ORM for database operations
- **JWT (JSON Web Tokens)** - Secure authentication and authorization
- **Argon2** - Password hashing for security
- **Multer** - File upload handling for blog post images
- **Cloudinary** - Image cloud storage

### DevOps & Tools
- **Git** - Version control
- **Vercel** - Frontend deployment
- **Render** - Backend deployment

##  Features

### Core Features (Implemented)

#### Authentication System
- ✅ User registration with email validation
- ✅ Secure user login/logout
- ✅ Password hashing using argon2
- ✅ JWT-based authentication with protected routes

#### Blog Post Management
- ✅ Create blog posts with title, content, and optional image upload
- ✅ View list of all blog posts 
- ✅ View detailed individual blog post
- ✅ Edit own blog posts (author only)
- ✅ Delete own blog posts (author only)

#### Comments System
- ✅ Add comments on any blog post (authenticated users)
- ✅ View all comments on a post
- ✅ Delete own comments

#### Likes System
- ✅ Like/unlike blog posts (authenticated users)
- ✅ Display like count on each post
- ✅ Visual feedback for liked posts
- ✅ Prevent duplicate likes from same user

### Bonus Features (Implemented)
- ✅ **Image Upload** - Support for blog post images with file validation
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Loading States** - Enhanced UX with loading skeletons
- ✅ **Error Handling** - Comprehensive error toast messages 
- ✅ **Dark Mode** - Toggle between light and dark themes

##  Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-application
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   Create a `.env` file in the backend root:
   ```env
    PORT=3000
    DB_URI="mongodb+srv://abc-xyz"
    JWT_SECRET="assdsfgdsgdgdfgdsgwqv"
    CLOUDINARY_API_KEY=543253532
    CLOUDINARY_API_SECRET=safsdafasffsaf
    CLOUDINARY_CLOUD_NAME=sadsasa
   ```

5. **Database Setup**
   ```bash
   cd ./server
   npm install
   ```

6. **Start the backend server**
   ```bash
   npm run dev 
   or
   npm start
   ```
   Backend will run on `http://localhost:5000` or `3000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend root:

   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Start the frontend server**
   ```bash
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Full Stack Development
To run both frontend and backend simultaneously:
```bash
# From root directory
npm run dev
```

##  API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register User
- **POST** `/api/v1/auth/signup`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
- **Response:** User object with JWT token

#### Login User
- **POST** `/api/v1/auth/signin`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123",
    "token":"bjBCzvRF7PbHFviOeJfrbfQ3FYjkrHXg0WcT5xQuvSm74J9weiAuW5t1rTHSucKg"
  }
  ```
- **Response:** User object with JWT token

### Blog Posts Endpoints

#### Get All Posts
- **GET** `/api/v1/posts`
- **Query Parameters:** `page`, `limit`, `search`
- **Response:** Array of blog posts with pagination

#### Get Single Post
- **GET** `/api/v1/posts/:postId`
- **Response:** Single blog post with comments and likes

#### Create Post
- **POST** `/api/v1/posts`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Form-data with title, content, and optional image
- **Response:** Created blog post

#### Update Post
- **PUT** `/api/v1/posts/:postId`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Updated post data
- **Response:** Updated blog post

#### Delete Post
- **DELETE** `/api/v1/posts/:postId`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Success message

### Likes Endpoints

#### Add Like
- **POST** `/api/v1/likes/:postId`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Updated like count

#### Remove Like
- **DELETE** `/api/v1/likes/:postId/:likeId`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Updated like count

#### Get Likes
- **GET** `/api/v1/likes/:postId`
- **Response:** Array of likes for the post

### Comments Endpoints

#### Add Comment
- **POST** `/api/v1/comments/:postId`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "content": "Great post!"
  }
  ```
- **Response:** Created comment

#### Get Comments
- **GET** `/api/v1/comments/:postId`
- **Response:** Array of comments for the post

#### Delete Comment
- **DELETE** `/api/v1/comments/:postId/:commentId`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** Success message



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Aditya](https://github.com/AdityaBhojane)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/aditya-bhojane-2b0412257/)
- Website : [Portfolio](https://www.adityadev.site)

*This project was built as a demonstration of full-stack development skills including React.js, Node.js, Express.js, MongoDB, JWT authentication, and RESTful API design.*