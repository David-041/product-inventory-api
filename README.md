# 🚀 Secure Full-Stack Product Inventory API

A professional-grade, secure full-stack web application built from scratch to demonstrate end-to-end development principles, database integration, API security, and modern version control.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6), Fetch API
* **Backend:** Node.js, Express.js (MVC Architecture)
* **Database & ODM:** MongoDB Atlas, Mongoose
* **Security & Auth:** `bcrypt` (Password Hashing), `jsonwebtoken` (JWT Session Management), `cors`, `dotenv`
* **Testing & Version Control:** Postman, Git & GitHub

---

## 📂 Project Architecture

```text
my-backend/
├── models/
│   ├── Product.js       # Product schema definition
│   └── User.js          # User schema (email & hashed password)
├── routes/
│   ├── products.js      # Public inventory GET / Protected POST routes
│   └── auth.js          # Signup & Login endpoints
├── middleware/
│   └── auth.js          # JWT verification security guard
├── .env                 # Environment variables (Port, Mongo URI, JWT Secret)
├── .gitignore           # Protecting node_modules and credentials
├── server.js            # Main Express application entry point
└── index.html           # Frontend interface with auth integration