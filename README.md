Orizon+ – Job Platform

🌐 [www.orizonplus.site](http://www.orizonplus.site)

Orizon+ is a modern job platform that connects job seekers and job providers for short-term, part-time, and freelance opportunities. The platform uses geolocation-based job discovery, a first-come-first-serve model, and an AI-ready design for a seamless user experience.

---
<img width="1903" height="864" alt="image" src="https://github.com/user-attachments/assets/7be1592f-637b-4fc4-9578-f98e16824e87" />


## 🚀 Features

### For Job Seekers

* 🔑 Secure signup & login
* 📍 Geolocation-based job discovery
* 📋 Apply to jobs instantly (first-come-first-serve model)
* 👤 Profile management (skills, preferences, address, phone)
* 📲 Responsive dashboard for mobile and desktop

### For Job Providers

* 🔑 Secure signup & login
* 📝 Post jobs with details & requirements
* 📍 Location-based targeting of job seekers
* 👤 Profile management with company details
* 📊 Manage applicants via provider dashboard

### Common Features

* Modern and responsive UI/UX
* Dynamic job listings inspired by **Freelancer, Naukri, Internshala**
* Notification system for job postings & applications
* Role selection (Job Provider or Job Seeker) after login
* AI-ready system for **future recommendation features**

---

## 🛠️ Tech Stack

### Frontend (React – `client/`)

* React.js (with .js components)
* Tailwind CSS for styling
* React Router for navigation
* LocalStorage for token & user details
* Responsive layouts for desktop & mobile

### Backend (Node.js/Express – `server/`)

* Node.js with Express.js
* MongoDB with Mongoose for user & job data
* JWT authentication for signup/login
* REST API endpoints for jobs, users, and authentication

### Database

* **MongoDB Atlas** (cloud-hosted)
* Unified **users collection** for seekers & providers

### Hosting

* Frontend: Vercel / Netlify (or current domain hosting)
* Backend: Node.js server hosted on cloud (e.g., Render, AWS, or custom server)
* Database: MongoDB Atlas

---

## 📂 Folder Structure

orizonplus/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # Pages (Login, Signup, BrowseJobs, Dashboard, etc.)
│   │   ├── components/   # UI components
│   │   ├── services/     # API calls
│   │   └── App.js
│   └── package.json
│
├── server/               # Express + MongoDB backend
│   ├── routes/           # Auth, User, Job routes
│   ├── models/           # Mongoose models (User, Job)
│   ├── middleware/       # Auth middlewares
│   └── server.js
│
└── README.md


---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (>= 16)
* MongoDB Atlas account (or local MongoDB)

### Backend Setup (`server/`)

```bash
cd server
npm install
npm start
```

### Frontend Setup (`client/`)

```bash
cd client
npm install
npm start
```

The app will run on:

* Frontend → `http://localhost:3000`
* Backend → `http://localhost:5000`

---

## 🔐 Authentication Workflow

1. User signs up (Job Seeker / Job Provider).
2. JWT Token & user details are stored in **localStorage**.
3. After login, user chooses **role** (seeker/provider).
4. Role-specific dashboard is displayed.

---

## 🌟 Future Enhancements

* AI/ML job recommendations based on seeker profile
* Multi-language voice assistance for illiterate users
* Video resume/job application support
* Blockchain for secure work contracts & payments
* Integration with WhatsApp/SMS notifications

---

## 👥 Contributors

* Ruthvej Giduturi (Project Lead)
* Orizon+ Team

---

## 📜 License

This project is licensed under the **MIT License** – free to use, modify, and distribute.
