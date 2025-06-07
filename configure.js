// configure.js - Updated with better error handling
try {
  const firebaseConfig = {
    apiKey: "AIzaSyCBwLd-E4cHXK3b9i7eiCvO3P0pQTNkx9A",
    authDomain: "dschool-7fa92.firebaseapp.com",
    databaseURL: "https://dschool-7fa92-default-rtdb.firebaseio.com",
    projectId: "dschool-7fa92",
    storageBucket: "dschool-7fa92.firebasestorage.app",
    messagingSenderId: "476775386338",
    appId: "1:476775386338:web:e0d30bbf442007e70122bb"
  };

  // Initialize only if not already initialized
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
  }
  
  // Set ready flag
  window.firebaseReady = true;
} catch (error) {
  console.error("Firebase initialization error:", error);
  window.firebaseReady = false;
}



