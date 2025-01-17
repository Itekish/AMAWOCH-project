
const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("email");
const successMessage = document.getElementById("success-message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const email = emailInput.value.trim();
  
    if (validateEmail(email)) {
      successMessage.classList.remove("hidden");
      localStorage.setItem("premiumUser", "true"); // Save the premium user status
      window.location.href = '../otherHtmlFiles/home.html'; // Redirect to the home page
    } else {
      alert("Please enter a valid email address.");
    }
  });
  
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  

// function validateEmail(email) {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);

// }
