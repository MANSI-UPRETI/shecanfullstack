// Import Firebase modules (npm-installed) - TEMPORARILY DISABLED
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get, child, set, push, update } from "firebase/database";

// Firebase config from your project - TEMPORARILY DISABLED
// const firebaseConfig = {
//   apiKey: "AIzaSyCpJw92RpygGyWB8ufuPAZHQRgsB2n2CJ4",
//   authDomain: "she-foundation-login.firebaseapp.com",
//   databaseURL: "https://she-foundation-login-default-rtdb.firebaseio.com",
//   projectId: "she-foundation-login",
//   storageBucket: "she-foundation-login.appspot.com",
//   messagingSenderId: "123456789012",
//   appId: "1:123456789012:web:abcdefghijklmnop"
// };

// Initialize Firebase - TEMPORARILY DISABLED
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// Enhanced mock data for development (fallback)
const mockInterns = {
  "intern1": {
    name: "Alice Johnson",
    email: "alice.johnson@shefoundation.org",
    donations: 2500,
    goal: 3000,
    progress: 83,
    rank: 1,
    avatar: "👩‍💼",
    department: "Marketing",
    joinDate: "2024-01-15",
    achievements: ["Top Fundraiser", "Community Leader", "Innovation Award"],
    recentActivity: [
      { type: "donation", amount: 500, date: "2024-01-28" },
      { type: "event", description: "Community Outreach", date: "2024-01-25" }
    ],
    skills: ["Social Media", "Event Planning", "Public Speaking"],
    bio: "Passionate about making a difference in the community through innovative fundraising strategies."
  },
  "intern2": {
    name: "Bob Smith",
    email: "bob.smith@shefoundation.org",
    donations: 2200,
    goal: 2500,
    progress: 88,
    rank: 2,
    avatar: "👨‍💼",
    department: "Technology",
    joinDate: "2024-01-10",
    achievements: ["Tech Innovator", "Digital Marketing Expert"],
    recentActivity: [
      { type: "donation", amount: 300, date: "2024-01-27" },
      { type: "project", description: "Website Redesign", date: "2024-01-24" }
    ],
    skills: ["Web Development", "Data Analysis", "UI/UX Design"],
    bio: "Tech enthusiast focused on leveraging digital solutions for social impact."
  },
  "intern3": {
    name: "Carol Davis",
    email: "carol.davis@shefoundation.org",
    donations: 1800,
    goal: 2000,
    progress: 90,
    rank: 3,
    avatar: "👩‍💻",
    department: "Finance",
    joinDate: "2024-01-20",
    achievements: ["Financial Excellence", "Budget Master"],
    recentActivity: [
      { type: "donation", amount: 200, date: "2024-01-26" },
      { type: "analysis", description: "Financial Report", date: "2024-01-23" }
    ],
    skills: ["Financial Planning", "Excel", "Budget Management"],
    bio: "Finance professional dedicated to transparent and effective resource management."
  },
  "intern4": {
    name: "David Wilson",
    email: "david.wilson@shefoundation.org",
    donations: 1500,
    goal: 1800,
    progress: 83,
    rank: 4,
    avatar: "👨‍💻",
    department: "Operations",
    joinDate: "2024-01-12",
    achievements: ["Operational Excellence", "Team Player"],
    recentActivity: [
      { type: "donation", amount: 150, date: "2024-01-25" },
      { type: "training", description: "Volunteer Training", date: "2024-01-22" }
    ],
    skills: ["Project Management", "Logistics", "Team Leadership"],
    bio: "Operations specialist committed to streamlining processes for maximum impact."
  },
  "intern5": {
    name: "Eva Brown",
    email: "eva.brown@shefoundation.org",
    donations: 1200,
    goal: 1500,
    progress: 80,
    rank: 5,
    avatar: "👩‍🎓",
    department: "Education",
    joinDate: "2024-01-18",
    achievements: ["Educational Leader", "Youth Mentor"],
    recentActivity: [
      { type: "donation", amount: 100, date: "2024-01-24" },
      { type: "workshop", description: "Youth Workshop", date: "2024-01-21" }
    ],
    skills: ["Teaching", "Curriculum Development", "Youth Engagement"],
    bio: "Education advocate passionate about empowering the next generation."
  },
  "intern6": {
    name: "Frank Miller",
    email: "frank.miller@shefoundation.org",
    donations: 950,
    goal: 1200,
    progress: 79,
    rank: 6,
    avatar: "👨‍🎓",
    department: "Communications",
    joinDate: "2024-01-25",
    achievements: ["Communication Expert"],
    recentActivity: [
      { type: "donation", amount: 75, date: "2024-01-23" },
      { type: "content", description: "Social Media Campaign", date: "2024-01-20" }
    ],
    skills: ["Content Creation", "Social Media", "Public Relations"],
    bio: "Creative communicator focused on amplifying our mission through compelling storytelling."
  }
};

// Enhanced mock events data
const mockEvents = [
  {
    id: "event1",
    title: "Community Fundraising Gala",
    date: "2024-02-15",
    time: "18:00",
    location: "Grand Hotel Ballroom",
    description: "Join us for an evening of inspiration and fundraising for our community programs.",
    attendees: 150,
    targetAmount: 50000,
    currentAmount: 35000,
    status: "upcoming"
  },
  {
    id: "event2",
    title: "Youth Leadership Workshop",
    date: "2024-02-10",
    time: "14:00",
    location: "Community Center",
    description: "Empowering young leaders with skills for tomorrow's challenges.",
    attendees: 45,
    targetAmount: 5000,
    currentAmount: 4200,
    status: "upcoming"
  },
  {
    id: "event3",
    title: "Digital Marketing Bootcamp",
    date: "2024-01-28",
    time: "10:00",
    location: "Tech Hub",
    description: "Learn modern digital marketing strategies for social impact.",
    attendees: 30,
    targetAmount: 3000,
    currentAmount: 3000,
    status: "completed"
  }
];

// Get intern by ID
export const getInternById = async (id) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockInterns[id] || null;
  } catch (error) {
    console.error("Error fetching intern:", error);
    return mockInterns[id] || null;
  }
};

// Get top 5 interns by donations
export const getTopInterns = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const sorted = Object.entries(mockInterns)
      .sort((a, b) => b[1].donations - a[1].donations)
      .slice(0, 5)
      .map(([id, data]) => ({ id, ...data }));
    return sorted;
  } catch (error) {
    console.error("Error fetching top interns:", error);
    return Object.entries(mockInterns)
      .sort((a, b) => b[1].donations - a[1].donations)
      .slice(0, 5)
      .map(([id, data]) => ({ id, ...data }));
  }
};

// Get all interns
export const getAllInterns = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 150));
    return Object.entries(mockInterns).map(([id, data]) => ({ id, ...data }));
  } catch (error) {
    console.error("Error fetching all interns:", error);
    return Object.entries(mockInterns).map(([id, data]) => ({ id, ...data }));
  }
};

// Get events
export const getEvents = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return mockEvents;
  }
};

// Add new donation
export const addDonation = async (internId, amount, description = "") => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (mockInterns[internId]) {
      const currentData = mockInterns[internId];
      const newDonations = currentData.donations + amount;
      const newProgress = Math.min(100, Math.round((newDonations / currentData.goal) * 100));
      
      // Update mock data
      mockInterns[internId] = {
        ...currentData,
        donations: newDonations,
        progress: newProgress,
        recentActivity: [
          {
            type: "donation",
            amount: amount,
            description: description,
            date: new Date().toISOString().split('T')[0]
          },
          ...(currentData.recentActivity || []).slice(0, 4)
        ]
      };
      
      return { success: true, newTotal: newDonations, newProgress };
    } else {
      throw new Error("Intern not found");
    }
  } catch (error) {
    console.error("Error adding donation:", error);
    return { success: false, error: error.message };
  }
};

// Add new event
export const addEvent = async (eventData) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newEvent = {
      ...eventData,
      id: `event${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    mockEvents.push(newEvent);
    return { success: true, eventId: newEvent.id };
  } catch (error) {
    console.error("Error adding event:", error);
    return { success: false, error: error.message };
  }
};

// Update intern profile
export const updateInternProfile = async (internId, updates) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    if (mockInterns[internId]) {
      mockInterns[internId] = {
        ...mockInterns[internId],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return { success: true };
    } else {
      throw new Error("Intern not found");
    }
  } catch (error) {
    console.error("Error updating intern profile:", error);
    return { success: false, error: error.message };
  }
};

// Get statistics
export const getStatistics = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const totalDonations = Object.values(mockInterns).reduce((sum, intern) => sum + intern.donations, 0);
    const totalGoal = Object.values(mockInterns).reduce((sum, intern) => sum + intern.goal, 0);
    const averageProgress = Object.values(mockInterns).reduce((sum, intern) => sum + intern.progress, 0) / Object.keys(mockInterns).length;
    
    return {
      totalInterns: Object.keys(mockInterns).length,
      totalDonations,
      totalGoal,
      averageProgress: Math.round(averageProgress),
      completionRate: Math.round((totalDonations / totalGoal) * 100)
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return null;
  }
};

export default mockInterns; 