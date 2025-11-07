# 🕓 SchedX – Full Stack Slot Swapper Application

SchedX (also known as **SlotSwapper**) is a peer-to-peer scheduling and time-slot swapping web application.  
It allows users to manage their calendar, mark events as *swappable*, and exchange those time slots with other users in real time.

---

## 🚀 Live Demo
👉 *(Optional: add your deployed link if you host it later)*  
Example: [https://schedx.vercel.app](https://schedx.vercel.app)

---

## 🧩 Project Overview
SchedX helps users coordinate schedules efficiently by letting them:
1. **Create & manage personal events** (like “Team Meeting”, “Focus Block” etc.)
2. **Mark busy slots as swappable**
3. **View other users’ swappable slots in a marketplace**
4. **Send swap requests** offering one of their own slots
5. **Accept or reject** incoming swap requests
6. Automatically update both users’ calendars when a swap is accepted

This project was built as part of the **Full Stack Internship Technical Challenge (ServiceHive)**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React.js (Vite), Axios, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT (JSON Web Token) |
| **State Management** | React Hooks |
| **Version Control** | Git & GitHub |

---

## 📁 Folder Structure

SchedX/
├── schedx-frontend/ # React frontend
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Login.jsx
│ │ │ ├── Signup.jsx
│ │ │ ├── Marketplace.jsx
│ │ │ └── Request.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
│
├── schedx-backend/ # Node.js backend
│ ├── models/
│ │ ├── User.js
│ │ ├── Event.js
│ │ └── SwapRequest.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── eventRoutes.js
│ │ └── swapRoutes.js
│ ├── middleware/
│ │ └── auth.js
│ ├── server.js
│ └── .env
│
└── README.md

---

## ⚙️ Setup Instructions (Local Installation)

### 🧭 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Git

### 🔹 Step 1 – Clone Repository
```bash
git clone https://github.com/Nehal381/SchedX.git
cd SchedX
Then start backend:

node server.js


Output:

✅ MongoDB connected
🚀 Server running on port 5000

🔹 Step 3 – Frontend Setup

Open a new terminal:

cd schedx-frontend
npm install
npm run dev


Open: http://localhost:5173

🔐 Authentication Flow

Signup/Login → Generates a JWT token stored in localStorage.

Token sent in every API request:

Authorization: Bearer <token>


Protected routes (Dashboard, Marketplace, Requests) require valid tokens.

🧠 API Endpoints Overview
🔹 Auth Routes
Method	Endpoint	Description
POST	/api/auth/signup	Register new user
POST	/api/auth/login	Login existing user
🔹 Event Routes
Method	Endpoint	Description
POST	/api/events	Create new event
GET	/api/events	Get logged-in user’s events
PUT	/api/events/:id	Update event (make swappable)
GET	/api/events/marketplace	Get other users’ swappable events
🔹 Swap Routes
Method	Endpoint	Description
POST	/api/swap/request	Create a swap request
POST	/api/swap/response/:id	Accept or reject a swap
GET	/api/swap	View incoming & outgoing swap requests
🧩 Core Features

✅ User Authentication (JWT)
✅ Event CRUD
✅ Swappable Slot Logic
✅ Marketplace for Viewing Slots
✅ Swap Request System (Accept/Reject)
✅ Protected Routes
✅ MongoDB Data Modeling

🌟 Bonus Ideas (Future Enhancements)

Real-time notifications using WebSockets

Calendar grid UI using FullCalendar.js

Email alerts on swap requests

Docker setup for deployment

Integration tests with Jest

Author
Saksham Singh
Full Stack Developer (Internship Project)
📧 sakshamsingh381@gmail.com