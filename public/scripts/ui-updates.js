// ui-updates.js

// Function to clear any existing error messages
function clearError() {
    const errorContainer = $(".new-tweet .error-message");
    errorContainer.text('').slideUp();
  }
  
  // Function to display an error message
  function displayError(message) {
    const errorContainer = $(".new-tweet .error-message");
    errorContainer.text(message).slideDown();
  }
  
  // Function to display a success message
  function displaySuccess(message) {
    const successContainer = $("#success-message");
    successContainer.text(message).slideDown();
  }
  
  // Function to update counter color based on characters remaining
  function updateCounterColor(counter, remaining) {
    if (remaining < 0) {
      counter.addClass('exceeded');
    } else {
      counter.removeClass('exceeded');
    }
  }
  