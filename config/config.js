// Configuration file for RIC Gaming Club FAQ
const CONFIG = {
  // API Configuration
  API: {
    GOOGLE_AI_KEY: 'AIzaSyAXh3IXSHSPcFTklnwwmPkwfkTq4F00Su8', // Move to .env in production
    MODEL_NAME: 'gemini-1.5-flash'
  },
  
  // App Settings
  APP: {
    NAME: 'RIC Gaming Club FAQ',
    VERSION: '1.0.0',
    DESCRIPTION: 'Interactive FAQ system for RIC Gaming Club'
  },
  
  // Contact Information
  CONTACT: {
    EMAIL: 'np.thukhaminthwin@gmail.com',
    FACEBOOK: 'https://www.facebook.com/profile.php?id=100014915112605&mibextid=LQQJ4d',
    LINE: 'https://line.me/ti/p/aq6ANcv3au'
  },
  
  // Club Information
  CLUB: {
    NAME: 'RIC Gaming Club',
    LOCATION: "Building 11's fifth floor",
    MEETING_TIME: 'Every Friday evening',
    PRESIDENT: 'Thukha Minthwin',
    VICE_PRESIDENT: 'TunBhone PyaeMoe'
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}