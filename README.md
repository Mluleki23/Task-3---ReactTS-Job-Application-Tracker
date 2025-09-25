<img src="https://socialify.git.ci/Mluleki23/Task-3---ReactTS-Job-Application-Tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="Task-3---ReactTS-Job-Application-Tracker" width="640" height="320" />
React + TypeScript Job Application Tracker

A simple React + TypeScript web app to help job seekers track applications and outcomes (Applied, Interviewed, Rejected).
Built for Task 3 – ReactTS Job Application Tracker (Lesson 3).

✨ Features

User Authentication

Register and log in with username & password (stored in JSON Server).

Protected routes to keep data private.

Job CRUD

Add, edit, and delete job applications.

Store company name, role, status, date applied, and extra notes.

Search / Filter / Sort

Search by company or role.

Filter by status (Applied / Interviewed / Rejected).

Sort by date (ascending or descending).

URL query parameters update automatically.

Color-coded Status

🟡 Applied 🟢 Interviewed 🔴 Rejected.

Responsive UI

Works on mobile, tablet, and desktop (common breakpoints: 320 px – 1200 px).

Persistence

User session stored in localStorage.

Data served by JSON Server for easy testing.

🖼️ Pages
Page	Description
Landing	Overview of the app’s purpose.
Register	Create a new account.
Login	Authenticate to access job data.
Home	View, search, filter, sort, and manage all job applications.
Job Details	View extended info (address, duties, requirements, etc.).
404	Catch-all for unknown routes.
🛠️ Tech Stack

React 18 + TypeScript

React Router v6 (navigation, query params, protected routes)

JSON Server (mock REST API)

Tailwind CSS (responsive styling) – or replace with your own CSS

LocalStorage for session persistence

📦 Installation & Setup

Clone the repo

git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>


Install dependencies

npm install


Start JSON Server (mock backend)

npx json-server --watch db.json --port 5000


Ensure db.json exists with { "users": [], "jobs": [] } as a starting point.

Run the React app

npm run dev


Visit: http://localhost:5173
