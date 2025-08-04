
// Sample data structure for the intern dashboard
const sampleData = {
  "interns": {
    "mansi": {
      "name": "Mansi Upreti",
      "referral": "mansi2025",
      "donations": 7500
    },
    "rohan": {
      "name": "Rohan Sharma", 
      "referral": "rohan2025",
      "donations": 6200
    },
    "priya": {
      "name": "Priya Patel",
      "referral": "priya2025", 
      "donations": 5800
    },
    "arjun": {
      "name": "Arjun Singh",
      "referral": "arjun2025",
      "donations": 5200
    },
    "neha": {
      "name": "Neha Gupta",
      "referral": "neha2025",
      "donations": 4800
    },
    "kavya": {
      "name": "Kavya Reddy",
      "referral": "kavya2025",
      "donations": 4200
    },
    "vikram": {
      "name": "Vikram Malhotra",
      "referral": "vikram2025", 
      "donations": 3800
    },
    "ananya": {
      "name": "Ananya Das",
      "referral": "ananya2025",
      "donations": 3200
    }
  }
};

// Instructions for setting up Firebase:
console.log("🔥 Firebase Setup Instructions:");
console.log("==================================");
console.log("");
console.log("1. Go to Firebase Console: https://console.firebase.google.com/");
console.log("2. Create a new project or select existing one");
console.log("3. Enable Realtime Database");
console.log("4. Set database rules to test mode for development");
console.log("5. Copy the sample data below into your database:");
console.log("");
console.log(JSON.stringify(sampleData, null, 2));
console.log("");
console.log("6. Update src/services/firebase.js with your Firebase config");
console.log("7. Test the application with different usernames:");
console.log("   - mansi (₹7,500 - 2 rewards unlocked)");
console.log("   - rohan (₹6,200 - 1 reward unlocked)");
console.log("   - priya (₹5,800 - 1 reward unlocked)");
console.log("   - arjun (₹5,200 - 1 reward unlocked)");
console.log("   - neha (₹4,800 - 0 rewards unlocked)");
console.log("");
console.log("🎯 Reward Levels:");
console.log("   - ₹5,000: T-Shirt");
console.log("   - ₹10,000: Certificate");
console.log("   - ₹15,000: Special Badge");
console.log("");
console.log("✅ Setup complete! Your intern dashboard is ready to use.");

module.exports = sampleData; 
