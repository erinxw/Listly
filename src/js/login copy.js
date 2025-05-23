

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzwtwvgElWsBDOIc6lI2j9UW4kvm8c-WY",
    authDomain: "listly-to-do-list-app.firebaseapp.com",
    projectId: "listly-to-do-list-app",
    storageBucket: "listly-to-do-list-app.appspot.com",
    messagingSenderId: "192347943720",
    appId: "1:192347943720:web:b03a428c127953c6d1561d",
    measurementId: "G-GQY4BHWR2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Initialize Firebase Variables
const auth = getAuth(app);
const database = getDatabase(app);

function hello(){
    alert("Hello");
}

function register() {
    // Get all our input fields
    firstName = document.getElementById('firstName').value
    lastName = document.getElementById('lastName').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    confirmPassword = document.getElementById('confirmPassword').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    if (validate_field(firstName) == false || validate_field(lastName) == false) {
        alert('One or More Extra Fields is Outta Line!!')
        return
    }
    if (password != confirmPassword) {
        alert('Passwords are not matching!')
        return
    }

    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('usersCredentials/' + user.uid).set(user_data)

            // DOne
            alert('User Created!!')
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('User Logged In!!')

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            alert(error_message)
        })
}



// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}