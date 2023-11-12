//GET
const tableBody = document.querySelector("table tbody");

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3002/students");
    const data = await response.json();

    if (data.students && Array.isArray(data.students)) {
      renderTableRows(data.students.slice(0, 10));
    } else {
      console.error("No student data found");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const renderTableRows = (students) => {
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    
    <td style="display: none;">${student._id}</td>
      <td>${index + 1}</td>
      <td>${getFullName(student)}</td>
      <td>${student.year}</td>
      <td>${student.course}</td>
      <td>${student.department}</td>
      <td>${student.rfid}</td>
      <td><button>Edit</button><button class="btn-delete">Delete</button></td>
    `;
    tableBody.appendChild(row);
  });
};

const getFullName = (student) => {
  const { firstName, middleName, lastName, suffix } = student;
  return `${firstName} ${middleName} ${lastName} ${suffix || ""}`.trim();
};

//DELETE
// Event delegation for delete buttons
tableBody.addEventListener("click", async(event) => {
  if (event.target.classList.contains("btn-delete")) {
   const row = event.target.closest("tr");

   if(row){
    const studentId = row.querySelector("td:first-child").innerText;
    const studentName = row.querySelector("td:nth-child(3)").innerText;

    const isConfirmed = window.confirm(`Delete Student ${studentName}?`);
    if (isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3002/students/delete/${studentId}`,{method: "DELETE"});
        if (response.ok) {
          alert(`${studentName} was deleted.`);
          row.remove();
        } else {
          alert(`Cannot Delete student with id ${studentId}`);
        }
      } catch (error) {
        console.error("Error", error);
        alert(error);
      }
    }
    
   }

  }
});
// Fetch data when the script runs
fetchData();

//POST
// Function to open create student form
function createStudent() {
  document.getElementById('overlay').style.display = "flex";
}

// Function to close create student form
function closeForm() {
  document.getElementById('overlay').style.display = "none";
}

// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the HTML elements
  const studentForm = document.getElementById('create-form'); // Reference to the user input form
  const password = document.getElementById('password');
  const passwordMatch = document.getElementById('password-match');

  // Add a submit event listener to the user input form
  studentForm.addEventListener('submit', async (event) => {
    // Prevent the default form submission behavior to handle it with JavaScript
    event.preventDefault();

    if (password.value === passwordMatch.value) {
      alert("Password match!");
    } else {
      password.classList.add("password-mismatch");
      return; // Stop further execution if passwords do not match
    }

    // Get form data using FormData API
    const formData = new FormData(studentForm);

    // Convert FormData to a plain JavaScript object
    const userData = Object.fromEntries(formData.entries());

    try {
      // Send data to the server
      const response = await fetch('http://localhost:3002/students/register', {
        method: 'POST', // Use the HTTP POST method to send data to the server
        headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON
        body: JSON.stringify(userData), // Convert the user data to JSON format and send it in the request body
      });

      // Parse the server response as JSON
      const data = await response.json();

      // Display success or error message to the user
      if (data.success) {
        alert("Student added!");
        studentForm.reset(); // Reset the form fields after successful submission
      } else {
        alert(`Error: ${data.message}`); // Display error message from the server
      }
    } catch (error) {
      // Log error to the console
      console.error('Error creating user:', error);
      alert("Error creating user");
    }
  });
});


