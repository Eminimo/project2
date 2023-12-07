console.log("Composer char counter script loaded!");

$(document).ready(function () {
    const MAX_CHARACTERS = 140;

    // Find the textarea element inside .new-tweet and attach an event listener
    $(".new-tweet textarea").on('input', function () {
        // Get the length of the input value
        const inputLength = $(this).val().length;

        // Calculate characters remaining
        const charactersRemaining = MAX_CHARACTERS - inputLength;

        // Find the counter using this and traverse up to .new-tweet and then find .counter
        const counter = $(this).closest('.new-tweet').find('.counter');

        // Update the counter text
        counter.text(charactersRemaining);

        // Update counter color to red if characters exceed the limit
        if (charactersRemaining < 0) {
            counter.css('color', 'red');
        } else {
            // Reset color to default if within the limit
            counter.css('color', ''); // Set to empty string to remove inline style
        }
    });

    // Find the form inside .new-tweet and attach a submit event listener
    $(".new-tweet form").on('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get the tweet content from the textarea
        const tweetContent = $(this).find('textarea').val();

        // Check if the tweet content is valid
        if (tweetContent.trim() === '' || tweetContent.length > MAX_CHARACTERS) {
            // Display an error message
            const errorMessage = "Tweet must be between 1 and 140 characters.";
            displayError(errorMessage);
        } else {
            // Clear any existing error messages
            clearError();

            // Your existing logic for submitting the tweet goes here
            // ...
        }
    });

    // Function to display an error message
    function displayError(message) {
        // Find the error message container and set the message
        const errorContainer = $(".new-tweet .error-message");
        errorContainer.text(message);
    }

    // Function to clear any existing error messages
    function clearError() {
        // Find the error message container and clear the text
        const errorContainer = $(".new-tweet .error-message");
        errorContainer.text('');
    }
});
