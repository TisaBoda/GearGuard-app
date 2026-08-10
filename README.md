# GearGuard - Maintenance Management System

**A Modern Web Application for Equipment Maintenance Tracking**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## Project Overview

**GearGuard** is a full-stack web application that helps organizations manage equipment maintenance efficiently. Built for **Advanced Web Technology** course project.

**Core Concept**: Connect Equipment (what needs fixing) → Teams (who fixes it) → Requests (the work to be done)

**Use Case**: Universities, offices, manufacturing units - anywhere that needs to track assets and manage repairs.

---

## Key Features

### 1. Equipment Management
- Register all company assets (machines, computers, vehicles)
- Track by department, location, and status
- Record warranty and purchase information
- Auto-assign maintenance teams based on equipment type

### 2. Team Management
- Create specialized teams (IT, Electrical, Mechanical, HVAC, General)
- Assign technicians to teams
- View team members and manage membership

### 3. Maintenance Request System
**Two Request Types:**
- **Corrective**: Emergency breakdown repairs
- **Preventive**: Scheduled routine maintenance

**Workflow:**
1. User selects equipment
2. System auto-fills team from equipment
3. Request moves through stages: New → Assigned → In Progress → Repaired → Scrapped
4. Technician records repair duration and costs

### 4. Interactive Views
- **Kanban Board**: Native HTML5 drag-and-drop request cards between stages with overdue indicators — accessible from Dashboard Quick Actions (Admin/Manager only)
- **Calendar View**: Monthly grid calendar showing scheduled requests by date, with navigation and clickable events
- **Dashboard**: Real-time statistics, recent requests, status overview, Quick Actions panel (role-filtered)
- **Reports**: Analytics on requests by status, priority, type, and team

### 5. Smart Features
- Auto-fill team when equipment is selected on request form
- Overdue request detection and red pulse animation
- Image upload for damage photos on requests (stored via Multer, displayed in request details)
- Two-layer Role-based access control — frontend route guards + backend API authorization
- Admin/Manager can create user accounts directly

---

## Technology Stack

### Frontend
- **Framework**: React.js 19
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: Custom inline CSS (no UI library)
- **State**: useState / useEffect hooks + localStorage

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **File Upload**: Multer

### Database
- **Database**: MongoDB Atlas (cloud)
- **ODM**: Mongoose

### Additional Tools
- **Version Control**: Git & GitHub
- **API Testing**: Postman

---

## Project Structure

```
GearGuard-APP/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       │   └── ProtectedRoute.js        # Auth guard + RoleProtectedRoute
│       ├── pages/
│       │   ├── Landing.jsx              # Public landing page
│       │   ├── Login.js
│       │   ├── Register.js
│       │   ├── Dashboard.jsx            # Stats, Quick Actions, Recent Requests
│       │   ├── Unauthorized.jsx
│       │   ├── Equipment/
│       │   │   ├── EquipmentList.js
│       │   │   ├── EquipmentForm.js
│       │   │   └── EquipmentDetails.js
│       │   ├── Teams/
│       │   │   ├── TeamList.jsx
│       │   │   ├── TeamForm.jsx
│       │   │   └── TeamDetails.jsx
│       │   ├── Requests/
│       │   │   ├── RequestList.jsx
│       │   │   ├── RequestForm.jsx
│       │   │   ├── RequestDetails.jsx
│       │   │   ├── KanbanBoard.jsx      # Native HTML5 drag-and-drop
│       │   │   └── CalendarView.jsx     # Monthly grid calendar
│       │   ├── Reports/
│       │   │   └── ReportsPage.jsx
│       │   └── user/
│       │       └── createUser.jsx       # Admin/Manager creates users
│       ├── services/
│       │   ├── authService.js
│       │   ├── equipmentService.js
│       │   ├── teamService.js
│       │   └── requestService.js
│       ├── App.js
│       └── index.js
│
├── backend/
│   ├── config/
│   │   └── db.js                        # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── equipmentController.js
│   │   ├── teamController.js
│   │   └── requestController.js
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT protect
│   │   ├── roleMiddleware.js            # Role-based authorize
│   │   └── upload.js                   # Multer image upload
│   ├── models/
│   │   ├── User.js
│   │   ├── Equipment.js
│   │   ├── Team.js
│   │   └── MaintenanceRequest.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── equipmentRoutes.js
│   │   ├── teamRoutes.js
│   │   └── requestRoutes.js
│   ├── uploads/                         # Uploaded damage images
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Database Schema (MongoDB)

### users
```javascript
{
  _id: ObjectId,
  fullName: String (required),
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed with bcryptjs),
  role: String (enum: ['Admin', 'Manager', 'Technician', 'Viewer'], default: 'Viewer'),
  department: String,
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### teams
```javascript
{
  _id: ObjectId,
  teamName: String (required),
  specialization: String (enum: ['Mechanical', 'Electrical', 'IT', 'HVAC', 'General']),
  description: String,
  members: [ObjectId] (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### equipment
```javascript
{
  _id: ObjectId,
  equipmentName: String (required),
  serialNumber: String (required, unique),
  category: String (enum: ['Computer', 'Vehicle', 'Machine', 'Office Equipment', 'Other']),
  department: String (required),
  location: String,
  purchaseDate: Date,
  warrantyExpiryDate: Date,
  description: String,
  status: String (enum: ['Active', 'Under Maintenance', 'Scrapped'], default: 'Active'),
  teamId: ObjectId (ref: 'Team'),
  createdAt: Date,
  updatedAt: Date
}
```

### maintenanceRequests
```javascript
{
  _id: ObjectId,
  subject: String (required),
  description: String,
  requestType: String (enum: ['Corrective', 'Preventive'], required),
  equipmentId: ObjectId (ref: 'Equipment', required),
  teamId: ObjectId (ref: 'Team'),
  assignedTechnicianId: ObjectId (ref: 'User'),
  priority: String (enum: ['Critical', 'High', 'Medium', 'Low'], default: 'Medium'),
  status: String (enum: ['New', 'Assigned', 'In Progress', 'Repaired', 'Scrapped'], default: 'New'),
  scheduledDate: Date,
  completedDate: Date,
  durationHours: Number,
  partsCost: Number (default: 0),
  laborCost: Number (default: 0),
  totalCost: Number (default: 0),
  imageUrl: String,
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login, returns JWT |
| GET | `/api/auth/me` | Protected | Get current user |
| GET | `/api/auth/users` | Admin, Manager | List all users |
| POST | `/api/auth/create-user` | Admin, Manager | Create a user account |

### Equipment
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/equipment` | All logged-in | Get all equipment (filter: category, status) |
| GET | `/api/equipment/:id` | All logged-in | Get single equipment |
| POST | `/api/equipment` | Admin, Manager | Create equipment |
| PUT | `/api/equipment/:id` | Admin, Manager | Update equipment |
| DELETE | `/api/equipment/:id` | Admin only | Delete equipment |

### Teams
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/teams` | All logged-in | Get all teams |
| GET | `/api/teams/:id` | All logged-in | Get single team with members |
| POST | `/api/teams` | Admin, Manager | Create team |
| PUT | `/api/teams/:id` | Admin, Manager | Update team |
| DELETE | `/api/teams/:id` | Admin, Manager | Delete team |
| POST | `/api/teams/:id/members` | Admin, Manager | Add member to team |
| DELETE | `/api/teams/:id/members/:userId` | Admin, Manager | Remove member from team |

### Maintenance Requests
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/requests` | All logged-in | Get all requests (filter: equipmentId, openOnly) |
| GET | `/api/requests/calendar` | All logged-in | Get requests with scheduledDate |
| GET | `/api/requests/:id` | All logged-in | Get single request |
| POST | `/api/requests` | Admin, Manager, Technician | Create request (multipart/form-data, supports image) |
| PUT | `/api/requests/:id` | Admin, Manager, Technician | Update request |
| DELETE | `/api/requests/:id` | Admin, Manager | Delete request |
| PATCH | `/api/requests/:id/status` | Admin, Manager, Technician | Update status only |

---

## Routes & Access Control

| Route | Page | Allowed Roles |
|-------|------|---------------|
| `/` | Landing | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/unauthorized` | Unauthorized | Public |
| `/dashboard` | Dashboard | All logged-in users |
| `/equipment` | Equipment List | Admin, Manager |
| `/equipment/new` | Add Equipment | Admin, Manager |
| `/equipment/edit/:id` | Edit Equipment | Admin, Manager |
| `/equipment/:id` | Equipment Details | Admin, Manager |
| `/teams` | Team List | Admin, Manager |
| `/teams/new` | Create Team | Admin, Manager |
| `/teams/edit/:id` | Edit Team | Admin, Manager |
| `/teams/:id` | Team Details | Admin, Manager |
| `/requests` | Request List | All logged-in users |
| `/requests/kanban` | Kanban Board | Admin, Manager |
| `/requests/new` | New Request | Admin, Manager, Technician |
| `/requests/edit/:id` | Edit Request | Admin, Manager, Technician |
| `/requests/:id` | Request Details | All logged-in users |
| `/calendar` | Calendar View | All logged-in users |
| `/reports` | Reports | Admin only |
| `/users/new` | Create User | Admin, Manager |

---

## User Roles & Permissions

| Feature | Admin | Manager | Technician | Viewer |
|---------|-------|---------|------------|--------|
| View Equipment & Teams | ✅ | ✅ | ❌ | ❌ |
| Create / Edit Equipment | ✅ | ✅ | ❌ | ❌ |
| Delete Equipment | ✅ | ❌ | ❌ | ❌ |
| Create / Edit / Delete Teams | ✅ | ✅ | ❌ | ❌ |
| View Requests | ✅ | ✅ | ✅ | ✅ |
| Create / Edit Requests | ✅ | ✅ | ✅ | ❌ |
| Delete Requests | ✅ | ✅ | ❌ | ❌ |
| Update Request Status | ✅ | ✅ | ✅ | ❌ |
| View Kanban Board | ✅ | ✅ | ❌ | ❌ |
| View Calendar | ✅ | ✅ | ✅ | ✅ |
| View Reports | ✅ | ❌ | ❌ | ❌ |
| Create Users | ✅ | ✅ | ❌ | ❌ |

> RBAC is enforced at two layers: frontend route guards (`RoleProtectedRoute`) redirect unauthorized users to `/unauthorized`, and backend API middleware (`authorize`) returns `403 Forbidden` even if the UI is bypassed.

---

## Installation & Setup

### Prerequisites
```bash
node --version   # 16+
npm --version
```

### Step 1: Clone Repository
```bash
git clone https://github.com/TisaBoda/GearGuard.git
cd GearGuard-APP
```

### Step 2: Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gearguard
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

```bash
npm run dev    # starts on http://localhost:5000
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
npm start      # starts on http://localhost:3000
```

---

## Development Phases

### Phase 1: Project Setup
- [x] Git repository initialized
- [x] React frontend created
- [x] Node.js backend created
- [x] MongoDB Atlas connected
- [x] Folder structure created

### Phase 2: Authentication
- [x] User model with bcrypt password hashing
- [x] Register & Login API with JWT
- [x] Login page
- [x] Register page
- [x] Protected routes with role guard
- [x] 4 user roles (Admin, Manager, Technician, Viewer)

### Phase 3: Equipment Module
- [x] Equipment model & CRUD API
- [x] Equipment List with search & filters
- [x] Add/Edit Equipment form
- [x] Equipment Details page

### Phase 4: Team Module
- [x] Team model & CRUD API
- [x] Add/Remove members endpoint
- [x] Team List, Form, Details pages

### Phase 5: Maintenance Request System
- [x] MaintenanceRequest model & CRUD API
- [x] Auto-fill team from equipment
- [x] Status update endpoint
- [x] Request List, Form, Details pages
- [x] Image upload for damage photos (Multer + static serving)

### Phase 6: Kanban Board
- [x] Kanban Board with native HTML5 drag-and-drop
- [x] Columns: New | Assigned | In Progress | Repaired | Scrapped
- [x] Drag-and-drop updates status via API instantly
- [x] Overdue pulse animation
- [x] Search filter
- [x] Accessible via Dashboard Quick Actions (Admin/Manager)

### Phase 7: Calendar View & Dashboard
- [x] Monthly grid Calendar View with navigation
- [x] Clickable request events on calendar
- [x] Dashboard with stat cards
- [x] Recent requests feed
- [x] Request status overview with progress bars
- [x] Quick Actions panel (role-filtered)

### Phase 8: Smart Features
- [x] Auto-fill team on request form
- [x] Overdue detection logic
- [x] Red overdue indicator on Kanban cards and Request List
- [x] Role-based sidebar navigation
- [x] Admin/Manager user creation page
- [x] Damage photo display in Request Details

### Phase 9: Reports
- [x] Reports page with bar charts
- [x] Requests by status, priority, type, and team

### Phase 10: RBAC & Bug Fixes
- [x] Backend API authorization on all routes (equipment, teams, requests)
- [x] Frontend action buttons hidden based on role (Edit/Delete)
- [x] Fixed damage image not displaying (imageUrl field mapping)
- [x] Fixed EquipmentList using window.location.href → useNavigate
- [x] Fixed CalendarView rebuilt as proper monthly grid
- [x] Fixed TeamList button spacing
- [x] Fixed RequestDetails response unwrapping

---

## Team

| Name | Roll Number |
|------|-------------|
| Tisa Boda | 23BCP041 |
| Krisha Patel | 23BCP045 |

---

## License

This project is for educational purposes — Advanced Web Technology course project.

---

## Contact & Repository

- **GitHub**: https://github.com/TisaBoda/GearGuard

---

**Status**: Completed
