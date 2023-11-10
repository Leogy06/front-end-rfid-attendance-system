// Select the <tbody> element inside the <table> element in your HTML
const tableBody = document.querySelector("table tbody");

// Fetch data from the API (assuming the API returns the student data)
fetch("http://localhost:3002/students")

  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {

    // Check if 'students' array exists in the response data
    if (data.students && Array.isArray(data.students)) {

      // Loop through each student in the 'students' array and provide the index
      data.students.forEach((student, index) => {
        
        // Create a new <tr> (table row) element for each student
        const row = document.createElement("tr");
        
        // Populate the row with data, including the student's index
        row.innerHTML = `
          <td>${index + 1}</td> <!-- Display the index (position) of the student -->
          <td>${student.firstName}</td> <!-- Display the first name -->
          <td>${student.middleName}</td> <!-- Display the middle name -->
          <td>${student.lastName}</td> <!-- Display the last name -->
          <td>${student.year}</td> <!-- Display the year -->
          <td>${student.course}</td> <!-- Display the course -->
          <td>${student.department}</td> <!-- Display the department -->
          <td>${student.rfid}</td> <!-- Display the RFID -->
        `;
        
        // Append the row to the <tbody> element to display it in the table
        tableBody.appendChild(row);
      });
    } else {
      console.error("No student data found");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  function capitalizeFirstLetter(input) {

    // Get the current value of the input
    let inputValue = input.value;

    // Capitalize the first letter and concatenate with the rest of the string
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);

    // Set the modified value back to the input
    input.value = inputValue;
}

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the HTML elements
  const userForm = document.getElementById('studentForm'); // Reference to the user input form
  const messageDiv = document.getElementById('feedback-message'); // Reference to the div for displaying messages to the user

  // Add a submit event listener to the user input form
  userForm.addEventListener('submit', async (event) => {
      // Prevent the default form submission behavior to handle it with JavaScript
      event.preventDefault();

      // Get form data using FormData API
      const formData = new FormData(userForm);
      
      // Convert FormData to a plain JavaScript object
      const userData = Object.fromEntries(formData.entries());

      try {
          // Send data to the server (assuming the server has an endpoint for user creation)
          const response = await fetch('http://localhost:3002/students/register', {
              method: 'POST', // Use the HTTP POST method to send data to the server
              headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
              body: JSON.stringify(userData), // Convert the user data to JSON format and send it in the request body
          });

          // Parse the server response as JSON
          const data = await response.json();

          // Display success or error message to the user
          if (data.success) {
              messageDiv.innerText = 'User created successfully!'; // Display success message
              userForm.reset(); // Reset the form fields after successful submission
          } else {
              messageDiv.innerText = `Error: ${data.message}`; // Display error message from the server
              
            }
      } catch (error) {
          // Log error to the console
          console.error('Error creating user:', error);
          
          // Display a generic error message to the user
          messageDiv.innerText = 'An error occurred while creating the user.';
      }
  });
});

