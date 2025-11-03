

---

# 🎯 Task 3 – ReactTS Job Application Tracker


---

##  Objective

The goal of this project is to demonstrate your understanding of:

* **React routing and navigation**
* **URL queries and parameters**
* **CRUD operations using JSON Server**
* **React state, props, and hooks**
* **Responsive UI design**
* **User authentication and authorization**

This project serves as a **Job Application Tracker MVP**, where users can log, view, update, delete, and filter job applications.

---

##  Scenario

You are building a **web app** for job applicants to track their job applications.
The tracker helps users monitor the number of jobs they’ve applied for and track their application **status** (Applied, Interviewed, Rejected).

Users can:

* Register and log in
* Add new job applications
* Edit or delete existing entries
* Filter, search, and sort applications
* View details of each job
* Use a clean and responsive UI accessible across all devices

---

##  Pages Overview

| Page                  | Description                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Landing Page**      | Introduces the app and explains its purpose                                                 |
| **Login Page**        | Users log in with credentials                                                               |
| **Registration Page** | Users create accounts (username + password)                                                 |
| **Home Page**         | Displays a list of job applications with CRUD and filtering                                 |
| **Job Details Page**  | Shows extra information about a selected job (e.g., company, contact, duties, requirements) |
| **404 Page**          | Handles all non-existent routes                                                             |

---

##  Functionality

###  Core Features

* **CRUD Operations**

  * Add, edit, and delete job applications.
* **Search**

  * Search jobs by company name or role (reflected in URL).
* **Filter**

  * Filter jobs by status (Applied, Interviewed, Rejected) — changes reflected in the URL.
* **Sort**

  * Sort jobs by date (ascending or descending) — changes reflected in the URL.
* **Status Colors**

  * Applied → 🟡 Yellow
  * Interviewed → 🟢 Green
  * Rejected → 🔴 Red
* **Authentication**

  * Registration and Login pages with protected routes.
* **Local Storage**

  * Persists login session and some user preferences.
* **Responsive Design**

  * Optimized for mobile, tablet, and desktop.

---

##  Technologies Used

| Category               | Tools / Libraries                          |
| ---------------------- | ------------------------------------------ |
| **Frontend Framework** | React (with TypeScript)                    |
| **Routing**            | React Router DOM v7                        |
| **State Management**   | React Hooks (useState, useEffect)          |
| **API Communication**  | Axios                                      |
| **Backend (Mock)**     | JSON Server                                |
| **Development Tools**  | Vite, ESLint, TypeScript                   |
| **Icons**              | Lucide React                               |
| **Styling**            | Custom CSS / Optional: Tailwind, Bootstrap |

---

## 🛠️ Installation & Setup

### Prerequisites

* Node.js (v18+)
* npm or yarn
* JSON Server installed globally or locally

### Steps

```bash
# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/task3-react-job-application-tracker.git

# 2️⃣ Navigate into the project directory
cd task3-react-job-application-tracker

# 3️⃣ Install dependencies
npm install

# 4️⃣ Run JSON Server
npx json-server --watch db.json --port 5000

# 5️⃣ Start the development server
npm run dev
```

### JSON Server Data Structure Example (`db.json`)

```json
{
  "users": [
    { "id": 1, "username": "admin", "password": "1234" }
  ],
  "jobs": [
    {
      "id": 1,
      "company": "OpenAI",
      "role": "Frontend Developer",
      "status": "Applied",
      "dateApplied": "2025-08-01",
      "details": "Building user interfaces with React and TypeScript."
    }
  ]
}
```

---

##  Protected Routing

* Certain routes (Home, Job Details, Edit pages) are protected.
* Users must log in to access these pages.
* Unauthorized users are redirected to the Login page.

---

##  URL Query & Parameters Usage

* **Search:** `/home?search=developer`
* **Filter:** `/home?status=applied`
* **Sort:** `/home?sort=desc`
* **Job Details:** `/jobs/:id`

---

##  UI & UX Features

* Intuitive and consistent layout
* Hover effects for interactive elements
* Clean color palette and typography
* Fully responsive design (breakpoints for 320px, 480px, 768px, 1024px, 1200px)
* Visual feedback for CRUD actions (add, update, delete)

---

##  Persistence

* Uses **JSON Server** for job and user data.
* Uses **localStorage** for:

  * Login session persistence
  * URL state (filters, sort, search)

---

##  Reusable Components

* `Navbar.tsx` – Navigation bar across pages
* `JobCard.tsx` – Displays individual job details
* `JobForm.tsx` – Add/Edit job form
* `ProtectedRoute.tsx` – Route wrapper for auth
* `Footer.tsx` – App footer

---

##  Validation

* Input fields validated for empty values
* Passwords must meet minimum criteria
* Alerts or messages displayed for invalid inputs

---


---




