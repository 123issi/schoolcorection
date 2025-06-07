// Mobile Navigation
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Modal Functions
function openApplicationForm() {
    document.getElementById('applicationModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function openChat() {
    document.getElementById('chatModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Course Data (keep your existing course data)

// Load Courses (keep your existing loadCourses function)

// Show Course Details (keep your existing showCourseDetails function)

// Form Submission with Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Wait for Firebase to be ready
    const checkFirebase = setInterval(() => {
        if (typeof firebase !== 'undefined' && firebase.apps.length) {
            clearInterval(checkFirebase);
            initForms();
        }
    }, 100);
});

function initForms() {
    // Application Form Submission
    document.getElementById('applicationForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const country = document.getElementById('country').value;
        const course = document.getElementById('course').value;
        const education = document.getElementById('education').value;
        const message = document.getElementById('message').value;
        
        // Create application object
        const application = {
            firstName,
            lastName,
            email,
            phone,
            country,
            course,
            education,
            message,
            timestamp: new Date().toISOString()
        };
        
        // Save to Firebase
        saveApplication(application);
    });

    // Contact Form Submission
    document.getElementById('contactForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Create contact object
        const contact = {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString()
        };
        
        // Save to Firebase
        saveContact(contact);
    });

    // Load courses
    loadCourses();
}

// Firebase Functions
function saveApplication(application) {
    // Reference to the applications collection in Firebase
    const applicationsRef = firebase.database().ref('applications');
    
    // Push the new application to the database
    applicationsRef.push(application)
        .then(() => {
            // Show success message
            document.getElementById('successMessage').innerHTML = `
                Thank you, ${application.firstName}! Your application for <strong>${application.course}</strong> has been submitted successfully. 
                We've received your application and will contact you at <strong>${application.email}</strong> shortly.
            `;
            
            // Close application modal and open success modal
            document.getElementById('applicationModal').style.display = 'none';
            document.getElementById('successModal').style.display = 'block';
            
            // Reset form
            document.getElementById('applicationForm').reset();
        })
        .catch((error) => {
            console.error("Error submitting application:", error);
            alert('Error submitting application. Please try again later.');
        });
}

function saveContact(contact) {
    // Reference to the contacts collection in Firebase
    const contactsRef = firebase.database().ref('contacts');
    
    // Push the new contact to the database
    contactsRef.push(contact)
        .then(() => {
            // Show success message
            document.getElementById('successMessage').innerHTML = `
                Thank you for contacting us, ${contact.name}! Your message has been received and we'll respond to 
                <strong>${contact.email}</strong> as soon as possible.
            `;
            
            // Open success modal
            document.getElementById('successModal').style.display = 'block';
            
            // Reset form
            document.getElementById('contactForm').reset();
        })
        .catch((error) => {
            console.error("Error sending message:", error);
            alert('Error sending message. Please try again later.');
        });
}

// Form Submission - Debugged Version
function initForms() {
    // Application Form
    const appForm = document.getElementById('applicationForm');
    if (appForm) {
        appForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = getApplicationFormData();
                await saveApplication(formData);
                showSuccess('application');
                resetForm(appForm);
            } catch (error) {
                console.error('Application error:', error);
                showError('application');
            }
        });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = getContactFormData();
                await saveContact(formData);
                showSuccess('contact');
                resetForm(contactForm);
            } catch (error) {
                console.error('Contact error:', error);
                showError('contact');
            }
        });
    }
}

// Helper functions
function getApplicationFormData() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        country: document.getElementById('country').value,
        course: document.getElementById('course').value,
        education: document.getElementById('education').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
}

function getContactFormData() {
    return {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toISOString()
    };
}

function resetForm(form) {
    if (form && form.reset) form.reset();
}

function showSuccess(type) {
    const successModal = document.getElementById('successModal');
    const messageElement = document.getElementById('successMessage');
    
    if (!successModal || !messageElement) return;
    
    if (type === 'application') {
        const firstName = document.getElementById('firstName').value;
        const course = document.getElementById('course').value;
        const email = document.getElementById('email').value;
        
        messageElement.innerHTML = `
            Thank you, ${firstName}! Your application for <strong>${course}</strong> 
            has been submitted successfully. We'll contact you at <strong>${email}</strong> shortly.
        `;
    } else {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        
        messageElement.innerHTML = `
            Thank you for contacting us, ${name}! Your message has been received 
            and we'll respond to <strong>${email}</strong> as soon as possible.
        `;
    }
    
    document.getElementById('applicationModal').style.display = 'none';
    successModal.style.display = 'block';
}

function showError(type) {
    alert(`Error submitting ${type} form. Please try again later.`);
}


// Enhanced Firebase save functions
async function saveApplication(application) {
  try {
    console.log("Attempting to save application:", application);
    
    // Check Firebase readiness
    if (!window.firebaseReady) {
      throw new Error("Firebase not ready");
    }

    const db = firebase.database();
    const applicationsRef = db.ref('applications');
    
    // Push data to Firebase
    const newRef = await applicationsRef.push(application);
    console.log("Application saved with key:", newRef.key);
    
    // Show success UI
    showSuccessUI(application, 'application');
    return true;
  } catch (error) {
    console.error("Save application error:", error);
    showErrorUI('application');
    return false;
  }
}

async function saveContact(contact) {
  try {
    console.log("Attempting to save contact:", contact);
    
    if (!window.firebaseReady) {
      throw new Error("Firebase not ready");
    }

    const db = firebase.database();
    const contactsRef = db.ref('contacts');
    
    const newRef = await contactsRef.push(contact);
    console.log("Contact saved with key:", newRef.key);
    
    // Show success UI
    showSuccessUI(contact, 'contact');
    return true;
  } catch (error) {
    console.error("Save contact error:", error);
    showErrorUI('contact');
    return false;
  }
}

// UI Feedback Functions
function showSuccessUI(data, type) {
  const successModal = document.getElementById('successModal');
  const messageElement = document.getElementById('successMessage');
  
  if (!successModal || !messageElement) {
    console.error("Success modal elements not found!");
    return;
  }

  if (type === 'application') {
    messageElement.innerHTML = `
      Thank you, ${data.firstName}! Your application for <strong>${data.course}</strong> 
      has been submitted successfully. We'll contact you at <strong>${data.email}</strong> shortly.
    `;
  } else {
    messageElement.innerHTML = `
      Thank you for contacting us, ${data.name}! Your message has been received 
      and we'll respond to <strong>${data.email}</strong> as soon as possible.
    `;
  }
  
  // Close the form modal if it's application
  if (type === 'application') {
    document.getElementById('applicationModal').style.display = 'none';
  }
  
  // Show success modal
  successModal.style.display = 'block';
  
  // Auto-close after 5 seconds
  setTimeout(() => {
    successModal.style.display = 'none';
  }, 5000);
}

function showErrorUI(type) {
  alert(`Error submitting ${type} form. Please check console for details and try again.`);
}


// Improved initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM fully loaded");
  
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize forms with Firebase check
  initFirebaseAndForms();
  
  // Load courses
  if (typeof loadCourses === 'function') {
    loadCourses();
  }
});

function initMobileNav() {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      burger.classList.toggle('active');
    });

    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
      });
    });
  }
}

function initFirebaseAndForms() {
  // Check Firebase ready state
  const firebaseCheck = setInterval(() => {
    if (window.firebaseReady) {
      clearInterval(firebaseCheck);
      console.log("Firebase is ready, initializing forms");
      initForms();
    } else if (typeof firebase === 'undefined') {
      console.error("Firebase SDK not loaded");
      clearInterval(firebaseCheck);
    }
  }, 100);
  
  // Timeout after 5 seconds
  setTimeout(() => {
    if (!window.firebaseReady) {
      clearInterval(firebaseCheck);
      console.error("Firebase initialization timeout");
      alert("System is still loading. Please refresh the page.");
    }
  }, 5000);
}



// Chat Module - Debugged Version
let chatInitialized = false;

function initializeChat() {
  if (chatInitialized) return;
  
  console.log("Initializing chat...");
  
  const sendChatBtn = document.getElementById('sendChatBtn');
  const chatInput = document.getElementById('chatInput');
  
  if (!sendChatBtn || !chatInput) {
    console.error("Chat elements not found");
    return;
  }

  // Event listeners
  sendChatBtn.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChatMessage();
    }
  });

  // Load chat history
  loadChatHistory();
  
  chatInitialized = true;
}

async function sendChatMessage() {
  const messageInput = document.getElementById('chatInput');
  const message = messageInput.value.trim();
  const country = document.getElementById('chatCountry').value;

  if (!message) return;

  try {
    // Add message to UI immediately
    addMessageToChat(message, 'user', country);
    messageInput.value = '';
    
    // Save to Firebase
    await saveChatMessage(message, country);
    
    // Simulate admin response (in real app, this would come from Firebase)
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Our team will respond shortly.",
        "We've received your query from " + country + "!",
        "One of our advisors will be with you soon.",
        "Thanks for reaching out! How can we help?",
        "We appreciate your message! Please hold."
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      addMessageToChat(response, 'admin', 'Support Team');
      saveChatMessage(response, 'Support Team', 'admin');
    }, 1000 + Math.random() * 2000);
    
  } catch (error) {
    console.error("Failed to send message:", error);
    addMessageToChat("Message failed to send. Please try again.", 'system');
  }
}

function addMessageToChat(message, sender, country = 'System') {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  const messageDiv = document.createElement('div');
  
  if (sender === 'user') {
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${message}</p><small>${country}</small>`;
  } 
  else if (sender === 'admin') {
    messageDiv.className = 'message admin-message';
    messageDiv.innerHTML = `<strong>${country}:</strong><p>${message}</p>`;
  }
  else {
    messageDiv.className = 'message system-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
  }

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function saveChatMessage(message, country, sender = 'user') {
  if (!window.firebaseReady) {
    throw new Error("Firebase not ready");
  }

  const chatRef = firebase.database().ref('chatMessages');
  await chatRef.push({
    message,
    country,
    sender,
    timestamp: new Date().toISOString()
  });
}

function loadChatHistory() {
  if (!window.firebaseReady) {
    console.log("Firebase not ready, skipping chat history");
    return;
  }

  const chatRef = firebase.database().ref('chatMessages').limitToLast(20);
  chatRef.on('value', (snapshot) => {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // Clear existing messages but keep welcome message
    chatMessages.innerHTML = `
      <div class="system-message">
        <p>Welcome to East African Girls in Tech live chat! How can we help you today?</p>
      </div>
    `;

    snapshot.forEach((childSnapshot) => {
      const msg = childSnapshot.val();
      addMessageToChat(msg.message, msg.sender, msg.country);
    });
  });
}

// Update your openChat function
function openChat() {
  document.getElementById('chatModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
  initializeChat();
}













  
  // Focus input on mobile
  if (window.innerWidth <= 768) {
    setTimeout(() => {
      document.getElementById('chatInput').focus();
    }, 300);
  }







// Burger menu toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
    
    // Close if already open
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close menu when clicking on nav items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Mobile chat button
if (mobileChatBtn) {
    mobileChatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        openChat();
    });
}


























