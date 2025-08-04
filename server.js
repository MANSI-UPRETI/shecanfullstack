const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Configuration
const dbConfig = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'mansi',
  database: 'shecnfoundation'
};

// JWT Secret
const JWT_SECRET = 'your-secret-key-change-in-production';

// Create MySQL connection pool
let pool;

async function initializeDatabase() {
  try {
    // Create connection pool
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release();
    
    // Create tables if they don't exist
    await createTables();
    
    // Insert dummy data
    await insertDummyData();
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

async function createTables() {
  try {
    // Users table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        department VARCHAR(100) DEFAULT 'Management',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Interns table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS interns (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        donations DECIMAL(10,2) DEFAULT 0,
        goal DECIMAL(10,2) DEFAULT 0,
        progress INT DEFAULT 0,
        intern_rank INT DEFAULT 0,
        avatar VARCHAR(50),
        department VARCHAR(100),
        join_date DATE,
        achievements JSON,
        recent_activity JSON,
        skills JSON,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Events table
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        time TIME,
        location VARCHAR(255),
        description TEXT,
        attendees INT DEFAULT 0,
        target_amount DECIMAL(10,2) DEFAULT 0,
        current_amount DECIMAL(10,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'upcoming',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

async function insertDummyData() {
  try {
    // Check if data already exists
    const [users] = await pool.execute('SELECT COUNT(*) as count FROM users');
    if (users[0].count > 0) {
      console.log('✅ Dummy data already exists');
      return;
    }

    // Insert dummy user
    const hashedPassword = await bcrypt.hash('mansi', 10);
    await pool.execute(`
      INSERT INTO users (name, email, password, role, department) 
      VALUES (?, ?, ?, ?, ?)
    `, ['Admin User', 'admin@shefoundation.org', hashedPassword, 'admin', 'Management']);

    // Insert dummy interns
    const interns = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@shefoundation.org',
        donations: 2500,
        goal: 3000,
        progress: 83,
        rank: 1,
        avatar: '👩‍💼',
        department: 'Marketing',
        join_date: '2024-01-15',
        achievements: JSON.stringify(['Top Fundraiser', 'Community Leader', 'Innovation Award']),
        recent_activity: JSON.stringify([
          { type: 'donation', amount: 500, date: '2024-01-28' },
          { type: 'event', description: 'Community Outreach', date: '2024-01-25' }
        ]),
        skills: JSON.stringify(['Social Media', 'Event Planning', 'Public Speaking']),
        bio: 'Passionate about making a difference in the community through innovative fundraising strategies.'
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@shefoundation.org',
        donations: 2200,
        goal: 2500,
        progress: 88,
        rank: 2,
        avatar: '👨‍💼',
        department: 'Technology',
        join_date: '2024-01-10',
        achievements: JSON.stringify(['Tech Innovator', 'Digital Marketing Expert']),
        recent_activity: JSON.stringify([
          { type: 'donation', amount: 300, date: '2024-01-27' },
          { type: 'project', description: 'Website Redesign', date: '2024-01-24' }
        ]),
        skills: JSON.stringify(['Web Development', 'Data Analysis', 'UI/UX Design']),
        bio: 'Tech enthusiast focused on leveraging digital solutions for social impact.'
      },
      {
        name: 'Carol Davis',
        email: 'carol.davis@shefoundation.org',
        donations: 1800,
        goal: 2000,
        progress: 90,
        rank: 3,
        avatar: '👩‍💻',
        department: 'Finance',
        join_date: '2024-01-20',
        achievements: JSON.stringify(['Financial Excellence', 'Budget Master']),
        recent_activity: JSON.stringify([
          { type: 'donation', amount: 200, date: '2024-01-26' },
          { type: 'analysis', description: 'Financial Report', date: '2024-01-23' }
        ]),
        skills: JSON.stringify(['Financial Planning', 'Excel', 'Budget Management']),
        bio: 'Finance professional dedicated to transparent and effective resource management.'
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@shefoundation.org',
        donations: 1500,
        goal: 1800,
        progress: 83,
        rank: 4,
        avatar: '👨‍💻',
        department: 'Operations',
        join_date: '2024-01-12',
        achievements: JSON.stringify(['Operational Excellence', 'Team Player']),
        recent_activity: JSON.stringify([
          { type: 'donation', amount: 150, date: '2024-01-25' },
          { type: 'training', description: 'Volunteer Training', date: '2024-01-22' }
        ]),
        skills: JSON.stringify(['Project Management', 'Logistics', 'Team Leadership']),
        bio: 'Operations specialist committed to streamlining processes for maximum impact.'
      },
      {
        name: 'Eva Brown',
        email: 'eva.brown@shefoundation.org',
        donations: 1200,
        goal: 1500,
        progress: 80,
        rank: 5,
        avatar: '👩‍🎓',
        department: 'Education',
        join_date: '2024-01-18',
        achievements: JSON.stringify(['Educational Leader', 'Youth Mentor']),
        recent_activity: JSON.stringify([
          { type: 'donation', amount: 100, date: '2024-01-24' },
          { type: 'workshop', description: 'Youth Workshop', date: '2024-01-21' }
        ]),
        skills: JSON.stringify(['Teaching', 'Curriculum Development', 'Youth Engagement']),
        bio: 'Education advocate passionate about empowering the next generation.'
      },
      {
        name: 'Frank Miller',
        email: 'frank.miller@shefoundation.org',
        donations: 950,
        goal: 1200,
        progress: 79,
        rank: 6,
        avatar: '👨‍🎓',
        department: 'Communications',
        join_date: '2024-01-25',
        achievements: JSON.stringify(['Communication Expert']),
        recent_activity: JSON.stringify([
          { type: 'donation', amount: 75, date: '2024-01-23' },
          { type: 'content', description: 'Social Media Campaign', date: '2024-01-20' }
        ]),
        skills: JSON.stringify(['Content Creation', 'Social Media', 'Public Relations']),
        bio: 'Creative communicator focused on amplifying our mission through compelling storytelling.'
      }
    ];

    for (const intern of interns) {
      await pool.execute(`
        INSERT INTO interns (name, email, donations, goal, progress, intern_rank, avatar, department, join_date, achievements, recent_activity, skills, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        intern.name, intern.email, intern.donations, intern.goal, intern.progress, intern.rank,
        intern.avatar, intern.department, intern.join_date, intern.achievements,
        intern.recent_activity, intern.skills, intern.bio
      ]);
    }

    // Insert dummy events
    const events = [
      {
        title: 'Community Fundraising Gala',
        date: '2024-02-15',
        time: '18:00:00',
        location: 'Grand Hotel Ballroom',
        description: 'Join us for an evening of inspiration and fundraising for our community programs.',
        attendees: 150,
        target_amount: 50000,
        current_amount: 35000,
        status: 'upcoming'
      },
      {
        title: 'Youth Leadership Workshop',
        date: '2024-02-10',
        time: '14:00:00',
        location: 'Community Center',
        description: 'Empowering young leaders with skills for tomorrow\'s challenges.',
        attendees: 45,
        target_amount: 5000,
        current_amount: 4200,
        status: 'upcoming'
      },
      {
        title: 'Digital Marketing Bootcamp',
        date: '2024-01-28',
        time: '10:00:00',
        location: 'Tech Hub',
        description: 'Learn modern digital marketing strategies for social impact.',
        attendees: 30,
        target_amount: 3000,
        current_amount: 3000,
        status: 'completed'
      }
    ];

    for (const event of events) {
      await pool.execute(`
        INSERT INTO events (title, date, time, location, description, attendees, target_amount, current_amount, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        event.title, event.date, event.time, event.location, event.description,
        event.attendees, event.target_amount, event.current_amount, event.status
      ]);
    }

    console.log('✅ Dummy data inserted successfully');
  } catch (error) {
    console.error('❌ Error inserting dummy data:', error);
  }
}

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Routes

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required' });
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(`
      INSERT INTO users (name, email, password, role, department)
      VALUES (?, ?, ?, ?, ?)
    `, [name, email, hashedPassword, 'admin', 'Management']);

    const token = jwt.sign(
      { id: result.insertId, email, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        name,
        email,
        role: 'admin',
        department: 'Management'
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all interns
app.get('/api/interns', authenticateToken, async (req, res) => {
  try {
    const [interns] = await pool.execute('SELECT * FROM interns ORDER BY donations DESC');
    
    const formattedInterns = interns.map(intern => ({
      id: intern.id,
      name: intern.name,
      email: intern.email,
      donations: parseFloat(intern.donations),
      goal: parseFloat(intern.goal),
      progress: intern.progress,
      rank: intern.intern_rank,
      avatar: intern.avatar,
      department: intern.department,
      joinDate: intern.join_date,
      achievements: JSON.parse(intern.achievements || '[]'),
      recentActivity: JSON.parse(intern.recent_activity || '[]'),
      skills: JSON.parse(intern.skills || '[]'),
      bio: intern.bio
    }));

    res.json(formattedInterns);
  } catch (error) {
    console.error('Error fetching interns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get top interns
app.get('/api/interns/top', authenticateToken, async (req, res) => {
  try {
    const [interns] = await pool.execute('SELECT * FROM interns ORDER BY donations DESC LIMIT 5');
    
    const formattedInterns = interns.map(intern => ({
      id: intern.id,
      name: intern.name,
      email: intern.email,
      donations: parseFloat(intern.donations),
      goal: parseFloat(intern.goal),
      progress: intern.progress,
      rank: intern.intern_rank,
      avatar: intern.avatar,
      department: intern.department,
      joinDate: intern.join_date,
      achievements: JSON.parse(intern.achievements || '[]'),
      recentActivity: JSON.parse(intern.recent_activity || '[]'),
      skills: JSON.parse(intern.skills || '[]'),
      bio: intern.bio
    }));

    res.json(formattedInterns);
  } catch (error) {
    console.error('Error fetching top interns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get intern by ID
app.get('/api/interns/:id', authenticateToken, async (req, res) => {
  try {
    const [interns] = await pool.execute('SELECT * FROM interns WHERE id = ?', [req.params.id]);
    
    if (interns.length === 0) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    const intern = interns[0];
    const formattedIntern = {
      id: intern.id,
      name: intern.name,
      email: intern.email,
      donations: parseFloat(intern.donations),
      goal: parseFloat(intern.goal),
      progress: intern.progress,
      rank: intern.intern_rank,
      avatar: intern.avatar,
      department: intern.department,
      joinDate: intern.join_date,
      achievements: JSON.parse(intern.achievements || '[]'),
      recentActivity: JSON.parse(intern.recent_activity || '[]'),
      skills: JSON.parse(intern.skills || '[]'),
      bio: intern.bio
    };

    res.json(formattedIntern);
  } catch (error) {
    console.error('Error fetching intern:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get events
app.get('/api/events', authenticateToken, async (req, res) => {
  try {
    const [events] = await pool.execute('SELECT * FROM events ORDER BY date DESC');
    
    const formattedEvents = events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      attendees: event.attendees,
      targetAmount: parseFloat(event.target_amount),
      currentAmount: parseFloat(event.current_amount),
      status: event.status
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get statistics
app.get('/api/statistics', authenticateToken, async (req, res) => {
  try {
    const [interns] = await pool.execute('SELECT * FROM interns');
    const [events] = await pool.execute('SELECT * FROM events');
    
    const totalDonations = interns.reduce((sum, intern) => sum + parseFloat(intern.donations), 0);
    const totalGoal = interns.reduce((sum, intern) => sum + parseFloat(intern.goal), 0);
    const averageProgress = interns.reduce((sum, intern) => sum + intern.progress, 0) / interns.length;
    
    const statistics = {
      totalInterns: interns.length,
      totalDonations,
      totalGoal,
      averageProgress: Math.round(averageProgress),
      completionRate: Math.round((totalDonations / totalGoal) * 100),
      totalEvents: events.length
    };

    res.json(statistics);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add donation
app.post('/api/interns/:id/donations', authenticateToken, async (req, res) => {
  try {
    const { amount, description } = req.body;
    const internId = req.params.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }

    const [interns] = await pool.execute('SELECT * FROM interns WHERE id = ?', [internId]);
    if (interns.length === 0) {
      return res.status(404).json({ error: 'Intern not found' });
    }

    const intern = interns[0];
    const newDonations = parseFloat(intern.donations) + parseFloat(amount);
    const newProgress = Math.min(100, Math.round((newDonations / parseFloat(intern.goal)) * 100));

    // Update recent activity
    const recentActivity = JSON.parse(intern.recent_activity || '[]');
    recentActivity.unshift({
      type: 'donation',
      amount: parseFloat(amount),
      description: description || '',
      date: new Date().toISOString().split('T')[0]
    });

    await pool.execute(`
      UPDATE interns 
      SET donations = ?, progress = ?, recent_activity = ?
      WHERE id = ?
    `, [newDonations, newProgress, JSON.stringify(recentActivity.slice(0, 5)), internId]);

    res.json({
      success: true,
      newTotal: newDonations,
      newProgress
    });
  } catch (error) {
    console.error('Error adding donation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Initialize database when server starts
initializeDatabase(); 