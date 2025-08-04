# SHE Foundation Intern Dashboard

A comprehensive intern management dashboard built with React and MySQL backend.

## Features

- 🔐 **Secure Authentication** - Login/Register with JWT tokens
- 📊 **Dashboard Overview** - Real-time statistics and charts
- 👥 **Intern Management** - View and manage intern profiles
- 🏆 **Leaderboard** - Track top performing interns
- 🎯 **Rewards System** - Manage achievements and rewards
- 📅 **Event Management** - Schedule and track events
- 📈 **Reports & Analytics** - Detailed performance reports

## Prerequisites

Before running this project, make sure you have:

1. **Node.js** (v14 or higher)
2. **MySQL Server** (v8.0 or higher)
3. **MySQL Workbench** (optional, for database management)

## Database Setup

1. **Start MySQL Server**
   - Make sure MySQL is running on your system
   - Default port: 3306

2. **Create Database**
   ```sql
   CREATE DATABASE shecnfoundation;
   ```

3. **Database Configuration**
   - Host: 127.0.0.1
   - Port: 3306
   - User: root
   - Password: mansi
   - Database: shecnfoundation

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd she-foundation-dashboard-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and the React app (port 3000).

## Login Credentials

Use these credentials to log in:

- **Email:** admin@shefoundation.org
- **Password:** mansi

## Project Structure

```
she-foundation-dashboard-final/
├── server.js                 # Express backend server
├── src/
│   ├── services/
│   │   ├── api.js           # API service (replaces Firebase)
│   │   └── firebase.js      # Legacy Firebase service
│   ├── pages/               # React page components
│   ├── components/          # Reusable React components
│   └── App.js              # Main React app
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Interns
- `GET /api/interns` - Get all interns
- `GET /api/interns/top` - Get top 5 interns
- `GET /api/interns/:id` - Get intern by ID
- `POST /api/interns/:id/donations` - Add donation

### Events
- `GET /api/events` - Get all events

### Statistics
- `GET /api/statistics` - Get dashboard statistics

## Database Schema

### Users Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(255))
- `email` (VARCHAR(255), UNIQUE)
- `password` (VARCHAR(255), HASHED)
- `role` (VARCHAR(50))
- `department` (VARCHAR(100))

### Interns Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(255))
- `email` (VARCHAR(255))
- `donations` (DECIMAL(10,2))
- `goal` (DECIMAL(10,2))
- `progress` (INT)
- `rank` (INT)
- `avatar` (VARCHAR(50))
- `department` (VARCHAR(100))
- `join_date` (DATE)
- `achievements` (JSON)
- `recent_activity` (JSON)
- `skills` (JSON)
- `bio` (TEXT)

### Events Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `title` (VARCHAR(255))
- `date` (DATE)
- `time` (TIME)
- `location` (VARCHAR(255))
- `description` (TEXT)
- `attendees` (INT)
- `target_amount` (DECIMAL(10,2))
- `current_amount` (DECIMAL(10,2))
- `status` (VARCHAR(50))

## Features

### Dashboard
- Real-time statistics overview
- Top performing interns
- Recent events
- Interactive charts

### Intern Management
- View all interns
- Search and filter
- Edit intern profiles
- Track donations and progress

### Leaderboard
- Rank interns by donations
- Achievement tracking
- Reward system

### Events
- Create and manage events
- Track attendance
- Fundraising goals

### Reports
- Detailed analytics
- Performance metrics
- Export capabilities

## Technology Stack

### Frontend
- React 19
- React Router DOM
- Chart.js
- Bootstrap 5

### Backend
- Node.js
- Express.js
- MySQL2
- JWT Authentication
- bcryptjs

### Database
- MySQL 8.0+

## Development

### Running in Development Mode
```bash
npm run dev
```

### Running Backend Only
```bash
npm run server
```

### Running Frontend Only
```bash
npm start
```

### Building for Production
```bash
npm run build
```

## Troubleshooting

### Database Connection Issues
1. Ensure MySQL server is running
2. Verify database credentials in `server.js`
3. Check if database `shecnfoundation` exists

### Port Conflicts
- Backend runs on port 5000
- Frontend runs on port 3000
- Change ports in `server.js` and `src/services/api.js` if needed

### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration
- Verify login credentials

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
