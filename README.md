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

### 1️. Equipment Management
- Register all company assets (machines, computers, vehicles)
- Track by department or employee
- Record warranty and purchase information
- Auto-assign maintenance teams based on equipment type
- Smart button showing all maintenance requests for each equipment

### 2️. Team Management
- Create specialized teams (IT Support, Electricians, Mechanics, HVAC)
- Assign technicians to teams
- View team workload and active requests

### 3️. Maintenance Request System
**Two Request Types:**
- **Corrective**: Emergency breakdown repairs
- **Preventive**: Scheduled routine maintenance

**Workflow:**
1. User selects equipment
2. System auto-fills team and category
3. Request moves through stages: New → Assigned → In Progress → Repaired → Closed/Scrapped
4. Technician records repair duration and costs

### 4️. Interactive Views
- **Kanban Board**: Drag-and-drop request cards between stages
- **Calendar View**: Visual scheduling for preventive maintenance
- **Dashboard**: Real-time statistics and alerts
- **Reports**: Analytics on requests by team/equipment category

### 5️. Smart Automation
- Auto-fill forms based on equipment selection
- Overdue request alerts (red indicators)
- Equipment scrap status tracking
- Activity logging for all changes

---

## Technology Stack

### **Frontend**
- **Framework**: React.js
- **UI Library**: Material-UI / Tailwind CSS
- **State Management**: Redux / Context API
- **Drag & Drop**: react-beautiful-dnd (for Kanban)
- **Calendar**: FullCalendar.io
- **Charts**: Chart.js / Recharts

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi / express-validator

### **Database**
- **Database**: MongoDB
- **ODM**: Mongoose

### **Additional Tools**
- **Version Control**: Git & GitHub
- **API Testing**: Postman
- **Deployment**: Vercel (frontend) + Render/Railway (backend)

---

## Development Phases

### **Phase 1: Project Setup & Foundation**
**Tasks:**
- [ ] Initialize Git repository
- [ ] Set up React frontend project (`npx create-react-app`)
- [ ] Set up Node.js backend project
- [ ] Install dependencies (Express, Mongoose, etc.)
- [ ] Create folder structure
- [ ] Design database schema (MongoDB collections)
- [ ] Create wireframes/mockups for main screens
- [ ] Set up MongoDB Atlas (cloud database)

**Deliverable**: Project structure ready, database connected

---

### **Phase 2: Authentication & User Management**
**Tasks:**
- [ ] Create User model (MongoDB schema)
- [ ] Build registration API endpoint
- [ ] Build login API endpoint (JWT authentication)
- [ ] Create login page (React)
- [ ] Create registration page
- [ ] Implement protected routes
- [ ] Add user roles (Admin, Manager, Technician)

**Deliverable**: Users can register, login, and logout

---

### **Phase 3: Equipment Module**
**Backend Tasks:**
- [ ] Create Equipment model/schema
- [ ] Build API endpoints (GET, POST, PUT, DELETE)
- [ ] Add search and filter functionality
- [ ] Test APIs in Postman

**Frontend Tasks:**
- [ ] Create Equipment List page (table view)
- [ ] Create Add/Edit Equipment form
- [ ] Add search bar and filters (by department, status)
- [ ] Connect frontend to backend APIs
- [ ] Add form validation
- [ ] Create Equipment Details page

**Deliverable**: Complete equipment management working

---

### **Phase 4: Team Module**
**Backend Tasks:**
- [ ] Create Team model
- [ ] Build Team APIs (CRUD operations)
- [ ] Create endpoint to add/remove team members

**Frontend Tasks:**
- [ ] Create Team List page
- [ ] Create Add/Edit Team form
- [ ] Show team members
- [ ] Add technicians to teams

**Deliverable**: Team management functional

---

### **Phase 5: Maintenance Request System**
**Backend Tasks:**
- [ ] Create MaintenanceRequest model
- [ ] Build Request APIs (CRUD)
- [ ] Implement auto-fill logic (get team from equipment)
- [ ] Create status update endpoint
- [ ] Add filtering by status, team, equipment

**Frontend Tasks:**
- [ ] Create Request List page
- [ ] Create Add/Edit Request form
- [ ] Implement auto-fill when equipment is selected
- [ ] Add request type selection (Corrective/Preventive)
- [ ] Create Request Details page
- [ ] Add status update buttons
- [ ] Record repair duration and cost

**Deliverable**: Basic request management working

---

### **Phase 6: Kanban Board View**
**Tasks:**
- [ ] Install react-beautiful-dnd library
- [ ] Create Kanban Board component
- [ ] Create columns: New | Assigned | In Progress | Repaired | Scrapped
- [ ] Implement drag-and-drop functionality
- [ ] Update request status on drop
- [ ] Add visual indicators (technician name, priority colors, overdue alerts)
- [ ] Add filters (by team, priority)

**Deliverable**: Drag-and-drop Kanban board working

---

### **Phase 7: Calendar View & Dashboard**
**Calendar Tasks:**
- [ ] Install FullCalendar.io
- [ ] Create Calendar component
- [ ] Display preventive maintenance requests on dates
- [ ] Click date to create new scheduled request
- [ ] Color code: Corrective (red), Preventive (blue)

**Dashboard Tasks:**
- [ ] Create statistics cards (total equipment, active requests, etc.)
- [ ] Add quick action buttons
- [ ] Show overdue requests alert section
- [ ] Display recent activities
- [ ] Add charts (requests by status, team workload)

**Deliverable**: Calendar and dashboard functional

---

### **Phase 8: Smart Features & Automation**
**Tasks:**
- [ ] Add smart button on Equipment Details page with badge count
- [ ] Implement overdue detection logic
- [ ] Add red indicators for overdue requests
- [ ] Create activity log for all request changes
- [ ] Implement scrap logic (mark equipment as scrapped)
- [ ] Add notifications for status changes

**Deliverable**: All automation features working

---

### **Phase 9: Reports, Testing & Deployment**
**Tasks:**
- [ ] Create Reports page
- [ ] Generate report: Requests per Team
- [ ] Generate report: Requests per Equipment Category
- [ ] Add charts/graphs for reports
- [ ] Export reports to PDF/CSV (optional)
- [ ] Bug testing and fixes
- [ ] UI/UX improvements
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render/Railway
- [ ] Create user documentation

**Deliverable**: Production-ready application

---

##  Project Structure

```
GearGuard/
├── frontend/                    # React application
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/              # Main pages
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Equipment/
│   │   │   │   ├── EquipmentList.jsx
│   │   │   │   ├── EquipmentForm.jsx
│   │   │   │   └── EquipmentDetails.jsx
│   │   │   ├── Teams/
│   │   │   │   ├── TeamList.jsx
│   │   │   │   └── TeamForm.jsx
│   │   │   ├── Requests/
│   │   │   │   ├── RequestList.jsx
│   │   │   │   ├── RequestForm.jsx
│   │   │   │   ├── KanbanBoard.jsx
│   │   │   │   └── CalendarView.jsx
│   │   │   └── Reports/
│   │   │       └── ReportsPage.jsx
│   │   ├── services/           # API calls
│   │   │   ├── authService.js
│   │   │   ├── equipmentService.js
│   │   │   ├── teamService.js
│   │   │   └── requestService.js
│   │   ├── utils/              # Helper functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/                     # Node.js + Express API
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js
│   │   ├── Equipment.js
│   │   ├── Team.js
│   │   ├── MaintenanceRequest.js
│   │   └── Activity.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── equipmentRoutes.js
│   │   ├── teamRoutes.js
│   │   └── requestRoutes.js
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── equipmentController.js
│   │   ├── teamController.js
│   │   └── requestController.js
│   ├── middleware/             # Auth, validation
│   │   ├── authMiddleware.js
│   │   └── validateMiddleware.js
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── server.js              # Entry point
│   └── package.json
│
└── README.md
```

---

##  Database Schema (MongoDB)

### **users** Collection
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  fullName: String,
  email: String (unique),
  role: String (enum: ['Admin', 'Manager', 'Technician', 'Viewer']),
  department: String,
  teamId: ObjectId (ref: 'Team'),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### **teams** Collection
```javascript
{
  _id: ObjectId,
  teamName: String,
  specialization: String (enum: ['Mechanical', 'Electrical', 'IT', 'HVAC', 'General']),
  description: String,
  members: [ObjectId] (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### **equipment** Collection
```javascript
{
  _id: ObjectId,
  equipmentName: String,
  serialNumber: String (unique),
  category: String (enum: ['Computer', 'Vehicle', 'Machine', 'Office Equipment', 'Other']),
  department: String,
  assignedEmployeeId: ObjectId (ref: 'User'),
  purchaseDate: Date,
  warrantyExpiryDate: Date,
  location: String,
  teamId: ObjectId (ref: 'Team'),
  assignedTechnicianId: ObjectId (ref: 'User'),
  description: String,
  status: String (enum: ['Active', 'Under Maintenance', 'Scrapped']),
  createdAt: Date,
  updatedAt: Date
}
```

### **maintenanceRequests** Collection
```javascript
{
  _id: ObjectId,
  subject: String,
  description: String,
  requestType: String (enum: ['Corrective', 'Preventive']),
  equipmentId: ObjectId (ref: 'Equipment'),
  teamId: ObjectId (ref: 'Team'),
  assignedTechnicianId: ObjectId (ref: 'User'),
  priority: String (enum: ['Critical', 'High', 'Medium', 'Low']),
  status: String (enum: ['New', 'Assigned', 'In Progress', 'Repaired', 'Scrapped']),
  scheduledDate: Date,
  completedDate: Date,
  durationHours: Number,
  partsCost: Number,
  laborCost: Number,
  totalCost: Number,
  createdBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### **activities** Collection
```javascript
{
  _id: ObjectId,
  requestId: ObjectId (ref: 'MaintenanceRequest'),
  userId: ObjectId (ref: 'User'),
  activityType: String (enum: ['Created', 'Assigned', 'Status Changed', 'Completed']),
  oldValue: String,
  newValue: String,
  notes: String,
  createdAt: Date
}
```

---

##  Key Web Pages

### 1. **Login Page** (`/login`)
- Username/email field
- Password field
- Login button
- Remember me checkbox
- Forgot password link

### 2. **Dashboard** (`/dashboard`)
- Statistics cards:
  - Total Equipment
  - Active Requests
  - Pending Maintenance
  - Overdue Requests
- Quick action buttons
- Recent activities feed
- Overdue alerts section
- Charts (Pie chart for request status, bar chart for team workload)

### 3. **Equipment Pages**
- **Equipment List** (`/equipment`)
  - Table with search and filters
  - Columns: Name, Serial Number, Category, Department, Status, Location
  - Add Equipment button
  - Actions: View, Edit, Delete

- **Add/Edit Equipment** (`/equipment/new` or `/equipment/edit/:id`)
  - Form with all fields
  - Auto-assign team based on category
  - Save/Cancel buttons

- **Equipment Details** (`/equipment/:id`)
  - Display all equipment info
  - Smart Button: "Maintenance Requests (3)" ← Badge count
  - List of maintenance history
  - Edit/Delete buttons

### 4. **Team Pages**
- **Team List** (`/teams`)
  - Card/grid view of teams
  - Each card shows: Team name, specialization, member count
  - Add Team button

- **Team Details** (`/teams/:id`)
  - Team info
  - List of technicians
  - Add/Remove members
  - Active requests assigned to team

### 5. **Maintenance Request Pages**
- **Kanban Board** (`/requests/kanban`)
  - Columns: New | Assigned | In Progress | Repaired | Scrapped
  - Drag-and-drop cards
  - Color-coded priorities
  - Red indicator for overdue
  - Filter by team, priority, type

- **Calendar View** (`/requests/calendar`)
  - Monthly calendar grid
  - Preventive requests shown on scheduled dates
  - Click date to create request
  - Color coding: Corrective=red, Preventive=blue

- **Request List** (`/requests`)
  - Table view with all requests
  - Search and filters
  - Sortable columns

- **Add/Edit Request** (`/requests/new` or `/requests/edit/:id`)
  - Request type selection
  - Equipment dropdown (triggers auto-fill)
  - Auto-filled: Team, Category
  - Technician dropdown (from selected team)
  - Priority, scheduled date
  - Status dropdown

- **Request Details** (`/requests/:id`)
  - Full request information
  - Timeline of activities
  - Change status buttons
  - Record duration and cost section
  - Close/Scrap request

### 6. **Reports Page** (`/reports`)
- Report type selector:
  - Requests per Team
  - Requests per Equipment Category
  - Cost Analysis
  - Maintenance History
- Date range filter
- Generate button
- Charts and tables
- Export to PDF/CSV (optional)

---

##  Installation & Setup

### Prerequisites
```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version
```

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/gearguard.git
cd gearguard
```

### Step 2: Backend Setup
```bash
cd backend
npm install

# Create .env file
touch .env
```

**Add to .env file:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gearguard
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

```bash
# Start backend server
npm run dev
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install

# Start React app
npm start
```

**Frontend will run on**: http://localhost:3000  
**Backend will run on**: http://localhost:5000

---

##  API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### **Equipment**
- `GET /api/equipment` - Get all equipment
- `GET /api/equipment/:id` - Get single equipment
- `POST /api/equipment` - Create equipment
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment
- `GET /api/equipment/:id/requests` - Get all requests for equipment

### **Teams**
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get single team
- `POST /api/teams` - Create team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team
- `POST /api/teams/:id/members` - Add member to team
- `DELETE /api/teams/:id/members/:userId` - Remove member

### **Maintenance Requests**
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get single request
- `POST /api/requests` - Create request
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Delete request
- `PATCH /api/requests/:id/status` - Update request status
- `GET /api/requests/calendar` - Get requests for calendar view

### **Reports**
- `GET /api/reports/by-team` - Requests grouped by team
- `GET /api/reports/by-category` - Requests grouped by equipment category
- `GET /api/reports/costs` - Cost analysis

---

##  User Roles & Access

| Feature               | Admin | Manager | Technician | Viewer |
|-----------------------|-------|---------|------------|--------|
| Create Equipment      |  YES  |  YES    |     NO     |   NO   |
| Edit Equipment        |  YES  |  YES    |     NO     |   NO   |
| Delete Equipment      |  YES  |  NO     |     NO     |   NO   |
| Create Teams          |  YES  |  YES    |     NO     |   NO   |
| Create Requests       |  YES  |  YES    |     YES    |   NO   |
| Assign Requests       |  YES  |  YES    |     YES    |   NO   |
| Update Request Status |  YES  |  YES    |  YES (own) |   NO   |
| View Reports          |  YES  |  YES    |     YES    |   YES  |
| Manage Users          |  YES  |  NO     |     NO     |   NO   |

---

## UI Features to Implement

### Visual Indicators
- **Priority Colors**:
  - Critical: Red
  - High: Orange
  - Medium: Yellow
  - Low: Green

- **Request Type Colors**:
  - Corrective: Red background
  - Preventive: Blue background

- **Overdue Indicator**: Red border + "OVERDUE" badge

### Interactive Elements
- Drag-and-drop on Kanban board
- Click calendar dates to create requests
- Smart buttons with badge counts
- Hover tooltips
- Loading spinners
- Toast notifications for actions

### Responsive Design
- Mobile-friendly navigation
- Collapsible sidebar
- Responsive tables
- Touch-friendly controls

---

## Development Guidelines

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/equipment-module

# Commit changes
git add .
git commit -m "feat: add equipment list page"

# Push to GitHub
git push origin feature/equipment-module
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code refactoring
- `test:` Tests

### Code Standards
- Use ES6+ JavaScript
- Use functional React components (hooks)
- Use async/await for API calls
- Add error handling
- Validate user inputs
- Comment complex logic

---

## Testing Checklist

### Functionality Testing
- [ ] User can register and login
- [ ] User can create, edit, delete equipment
- [ ] User can create teams and add members
- [ ] User can create requests with auto-fill
- [ ] Kanban drag-and-drop works
- [ ] Calendar shows scheduled requests
- [ ] Reports generate correctly
- [ ] Smart buttons show correct counts
- [ ] Overdue requests highlighted in red

### User Experience
- [ ] Forms validate inputs
- [ ] Error messages display properly
- [ ] Success notifications appear
- [ ] Pages load quickly
- [ ] Mobile responsive
- [ ] No console errors

---

## Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy to Vercel via GitHub integration
```

### Backend (Render/Railway)
```bash
# Push to GitHub
# Connect Render/Railway to repository
# Add environment variables
# Deploy
```

---

## Team

| Name         | Roll number | 
|--------------|-------------|
| Tisa Boda    | 23bcp041    | 
| Krisha Patel | 23bcp045    | 

---

##  License

This project is for educational purposes (Advanced Web Technology course project).

---

## Contact

- **GitHub**: https://github.com/TisaBoda/GearGuard

---

**Status**: In Development 
